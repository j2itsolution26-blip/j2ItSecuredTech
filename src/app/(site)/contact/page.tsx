import { Clock, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { JsonLd } from '@/components/shared/JsonLd';
import { ContactForm } from '@/components/forms/ContactForm';
import { COMPANY_INFO } from '@/lib/constants';
import { getSettings } from '@/lib/data/settings';
import { breadcrumbSchema, buildMetadata, localBusinessSchema } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Contact J2 SecureTech for enterprise software, CCTV installation, structured cabling, networking and IT support. Offices in Metro Manila with nationwide field coverage.',
  path: '/contact',
});

export default async function ContactPage() {
  const settings = await getSettings();

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    settings['contact.mapQuery'],
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const channels: {
    icon: typeof Phone;
    title: string;
    lines: { label: string; href?: string }[];
  }[] = [
    {
      icon: Phone,
      title: 'Call us',
      lines: [
        { label: settings['contact.phone'], href: `tel:${settings['contact.phone'].replace(/[^+\d]/g, '')}` },
        { label: settings['contact.phoneAlt'], href: `tel:${settings['contact.phoneAlt'].replace(/[^+\d]/g, '')}` },
      ],
    },
    {
      icon: Mail,
      title: 'Email us',
      lines: [
        { label: settings['contact.salesEmail'], href: `mailto:${settings['contact.salesEmail']}` },
        { label: settings['contact.supportEmail'], href: `mailto:${settings['contact.supportEmail']}` },
      ],
    },
    {
      icon: MapPin,
      title: 'Visit us',
      lines: [{ label: settings['contact.address'] }],
    },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: 'Contact', path: '/contact' }]), localBusinessSchema()]} />

      <PageHero
        eyebrow="Contact"
        title="Talk to an engineer, not a call queue"
        description="Technical and commercial enquiries are answered by the people who will actually deliver the work."
        breadcrumbs={[{ name: 'Contact', path: '/contact' }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="rounded-2xl border border-border bg-card/70 p-7 lg:p-9">
            <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
              <MessageSquare className="size-5 text-secondary" aria-hidden="true" />
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-muted">
              For detailed project requirements, use the{' '}
              <a href="/request-quote" className="text-secondary hover:underline">
                quote request form
              </a>{' '}
              instead — it captures budget and timeline so we can respond with a proposal.
            </p>

            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            {channels.map((channel, index) => (
              <Reveal key={channel.title} delay={index * 0.06}>
                <div className="rounded-2xl border border-border bg-card/70 p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-secondary">
                      <channel.icon className="size-5" aria-hidden="true" />
                    </span>
                    <h2 className="font-heading text-base font-semibold text-foreground">{channel.title}</h2>
                  </div>

                  <ul className="mt-4 flex flex-col gap-2">
                    {channel.lines.map((line) => (
                      <li key={line.label} className="text-sm text-muted">
                        {line.href ? (
                          <a href={line.href} className="transition-colors hover:text-secondary">
                            {line.label}
                          </a>
                        ) : (
                          line.label
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.18}>
              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-secondary">
                    <Clock className="size-5" aria-hidden="true" />
                  </span>
                  <h2 className="font-heading text-base font-semibold text-foreground">Business hours</h2>
                </div>

                <dl className="mt-4 flex flex-col gap-2.5">
                  {COMPANY_INFO.hoursDetailed.map((entry) => (
                    <div key={entry.days} className="flex items-center justify-between gap-4 text-sm">
                      <dt className="text-muted">{entry.days}</dt>
                      <dd className="text-slate-200">{entry.time}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-5 border-t border-border pt-4 text-xs text-subtle">
                  {COMPANY_INFO.emergencyNote}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <section className="border-t border-border" aria-label="Office location map">
        <h2 className="sr-only">Our office location on Google Maps</h2>
        <div className="relative h-[420px] w-full">
          <iframe
            src={mapSrc}
            title={`Map showing ${COMPANY_INFO.name} office location`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full grayscale-[0.4] contrast-125"
          />
        </div>
      </section>
    </>
  );
}
