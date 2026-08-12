import { revalidatePath, updateTag } from 'next/cache';

/**
 * Single source of truth for cache tags. Read paths tag their `unstable_cache`
 * entries with these values; write paths invalidate the same tag, so public
 * pages pick up admin edits on the next request without a redeploy.
 */
export const CACHE_TAGS = {
  services: 'services',
  portfolio: 'portfolio',
  blog: 'blog',
  testimonials: 'testimonials',
  faqs: 'faqs',
  careers: 'careers',
  industries: 'industries',
  settings: 'settings',
  media: 'media',
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

/** Cached content is served for 5 minutes before a background refresh. */
export const CONTENT_REVALIDATE_SECONDS = 300;

const TAG_PATHS: Record<CacheTag, string[]> = {
  services: ['/', '/services'],
  portfolio: ['/', '/portfolio'],
  blog: ['/', '/blog'],
  testimonials: ['/', '/testimonials'],
  faqs: ['/', '/faqs'],
  careers: ['/careers'],
  industries: ['/', '/industries'],
  settings: ['/'],
  media: [],
};

/**
 * Invalidates the tag plus the public routes that render it.
 * `updateTag` gives read-your-own-writes semantics, so an editor sees their
 * change immediately after the Server Action completes.
 */
export function revalidateContent(tag: CacheTag) {
  updateTag(tag);
  for (const path of TAG_PATHS[tag]) {
    revalidatePath(path);
  }
}
