/**
 * Gallery assets under /public/assets/images.
 * Many paths are intentionally reused in two places; see per-key comments where relevant.
 */
export const SITE_IMAGES = {
  /** Brand mark: SiteFooter; Speaking / Reflections hero backgrounds */
  siteLogo: "/assets/images/logo.webp",
  /** Circular favicon + Apple touch icon (see app/layout.tsx metadata.icons); regenerate via `node scripts/generate-favicons.mjs` */
  favicon: "/assets/images/favicon.png",
  appleTouchIcon: "/assets/images/apple-touch-icon.png",
  img1: "/assets/images/1.webp",
  img2: "/assets/images/2.webp",
  img3: "/assets/images/3.webp",
  img4: "/assets/images/4.webp",
  img5: "/assets/images/5.webp",
  /** Home hero background — LandingView */
  img6: "/assets/images/6.webp",
  gson8453: "/assets/images/GSON8453.webp",
} as const;
