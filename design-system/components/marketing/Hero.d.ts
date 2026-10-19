import type { Element } from '../elements';

/**
 * Centered landing hero with a top-anchored elemental radial halo.
 * @startingPoint section="Marketing" subtitle="Centered hero with elemental halo" viewport="700x340"
 */
export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  /** Which halo and title glow to use. Accepts success, warning and info; danger falls back to fire. Default 'fire'. */
  element?: Element | 'success' | 'warning' | 'info';
  /** Badge row above the headline. */
  eyebrow?: React.ReactNode;
  /** Inter 800 headline, clamp(2.75rem, 6.5vw, 5rem). No brush spans. */
  title?: React.ReactNode;
  /** Supporting line under the title, max 680px wide. */
  subtitle?: React.ReactNode;
  /** Button row below the copy. */
  actions?: React.ReactNode;
  /** Apply the element's text glow to the headline. Default true. */
  glowTitle?: boolean;
  /** Split the halo onto its own parallax layer so it drifts against the
   *  content as the page scrolls. Requires assets/motion.js. Default false. */
  parallaxHalo?: boolean;
  children?: React.ReactNode;
}

export declare function Hero(props: HeroProps): JSX.Element;
