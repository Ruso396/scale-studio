/**
 * Bump NEXT_PUBLIC_LOGO_VERSION in .env.local when replacing public/scalestudio.jpeg
 * so browsers and dev servers pick up the new file without a stale cache.
 */
export const LOGO_SRC = `/scalestudio.jpeg?v=${process.env.NEXT_PUBLIC_LOGO_VERSION ?? "1"}`;
