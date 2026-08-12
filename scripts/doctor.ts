/**
 * Deployment doctor.
 *
 * Answers, in one command, why the site is returning "Something went wrong":
 * is the connection string reachable, does the schema exist, and has the seed
 * run? Prints the exact remedy for whichever check fails first.
 *
 *   npm run doctor
 *   DATABASE_URL="postgresql://..." npm run doctor
 */
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const ok = (message: string) => console.log(`  [32mPASS[0m  ${message}`);
const bad = (message: string) => console.log(`  [31mFAIL[0m  ${message}`);
const info = (message: string) => console.log(`        ${message}`);

/** Prints a connection string with the password replaced. */
function redact(url: string): string {
  return url.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:••••••@');
}

async function main() {
  console.log('\nJ2 SecureTech — deployment doctor\n');

  // 1. Is the connection string present and well-formed?
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    bad('DATABASE_URL is not set');
    info('Set it in .env locally, or in Vercel under Settings -> Environment Variables.');
    process.exitCode = 1;
    return;
  }

  ok(`DATABASE_URL is set  (${redact(connectionString)})`);

  if (!/^postgres(ql)?:\/\//.test(connectionString)) {
    bad('DATABASE_URL is not a PostgreSQL connection string');
    process.exitCode = 1;
    return;
  }

  const isPooled = connectionString.includes('-pooler');
  info(
    isPooled
      ? 'Pooled endpoint detected — correct for the running app.'
      : 'Direct (non-pooled) endpoint — correct for migrations, but use the -pooler host for the app on Vercel.',
  );

  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

  try {
    // 2. Can we actually reach the database?
    await prisma.$queryRaw`SELECT 1`;
    ok('Database is reachable');

    // 3. Has the schema been created?
    const tables = await prisma.$queryRaw<{ table_name: string }[]>`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `;

    const expected = [
      'users', 'services', 'portfolio_projects', 'blog_posts', 'testimonials',
      'faqs', 'careers', 'industries', 'quote_requests', 'contact_messages',
      'media', 'site_settings', 'audit_logs',
    ];

    const present = new Set(tables.map((row) => row.table_name));
    const missing = expected.filter((name) => !present.has(name));

    if (missing.length === expected.length) {
      bad('Schema has not been created — the database is empty');
      info('Run:  npm run db:deploy       (use the NON-pooled connection string)');
      info('Then: npm run db:seed');
      process.exitCode = 1;
      return;
    }

    if (missing.length > 0) {
      bad(`Schema is incomplete — missing: ${missing.join(', ')}`);
      info('Run:  npm run db:deploy       (use the NON-pooled connection string)');
      process.exitCode = 1;
      return;
    }

    ok(`Schema is complete (${expected.length} tables)`);

    // 4. Has the seed run? Empty tables render an empty but working site.
    const [services, industries, projects, posts, testimonials, faqs, users] = await Promise.all([
      prisma.service.count(),
      prisma.industry.count(),
      prisma.portfolio.count(),
      prisma.blogPost.count(),
      prisma.testimonial.count(),
      prisma.faq.count(),
      prisma.user.count(),
    ]);

    const total = services + industries + projects + posts + testimonials + faqs;

    if (total === 0) {
      bad('Schema exists but contains no content');
      info('Run:  npm run db:seed');
    } else {
      ok(
        `Content present — ${services} services, ${industries} industries, ${projects} projects, ` +
          `${posts} articles, ${testimonials} testimonials, ${faqs} FAQs`,
      );
    }

    if (users === 0) {
      bad('No administrator account exists — you will not be able to sign in');
      info('Run:  npm run db:seed');
    } else {
      const admins = await prisma.user.findMany({
        where: { isActive: true },
        select: { email: true, role: true },
      });
      ok(`${users} user account(s): ${admins.map((u) => `${u.email} (${u.role})`).join(', ')}`);
    }

    // 5. Auth secret — the other cause of a hard failure in production.
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
      bad('NEXTAUTH_SECRET is not set — the build will fail');
      info('Generate one with:  npx auth secret');
    } else if (secret.length < 16) {
      bad(`NEXTAUTH_SECRET is too short (${secret.length} chars, minimum 16)`);
    } else {
      ok('NEXTAUTH_SECRET is set and long enough');
    }

    console.log(
      total > 0 && users > 0
        ? '\nDatabase looks healthy. If the site still errors, the cause is not the database —\n' +
            'check Vercel -> Logs (Runtime) for the actual exception.\n'
        : '\nRun the commands above, then reload the site.\n',
    );
  } catch (error) {
    // Prisma wraps driver failures, so the useful code (ECONNREFUSED, ENOTFOUND)
    // sits on a nested `cause` rather than the top-level message.
    const chain: string[] = [];
    let current: unknown = error;
    while (current instanceof Error && chain.length < 6) {
      chain.push(current.message);
      current = (current as { cause?: unknown }).cause;
    }
    const message = chain.join(' | ') || String(error);

    bad('Could not query the database');
    console.log(`\n${chain[0] ?? message}\n`);
    if (chain.length > 1) info(`cause: ${chain[chain.length - 1]}`);

    // Prisma normalises driver errors into its own phrasing, so match on that
    // rather than on raw codes like ECONNREFUSED, which it does not surface.
    if (/Can't reach database server|ENOTFOUND|ECONNREFUSED|ETIMEDOUT|EAI_AGAIN/i.test(message)) {
      info('The database server could not be reached. Check that:');
      info('  • the host in DATABASE_URL has no typo');
      info('  • the database is running and accepting connections');
      info('  • for Neon, the project is not suspended, and ?sslmode=require is present');
    } else if (/authentication failed|password|SASL/i.test(message)) {
      info('Credentials were rejected — re-copy the connection string from your provider.');
    } else if (/database .* does not exist/i.test(message)) {
      info('That database name does not exist on the server — check the path segment of the URL.');
    } else if (/SSL|self.signed|certificate/i.test(message)) {
      info('TLS problem — append ?sslmode=require to the connection string.');
    } else if (/relation .* does not exist|table/i.test(message)) {
      info('The schema is missing. Run:  npm run db:deploy   (non-pooled URL)');
    } else {
      info('Unrecognised failure. Most often this means the connection string is');
      info('wrong or the database is unreachable from this machine. Verify the URL');
      info('by pasting it into your provider\'s SQL console.');
    }

    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
