import type { Element } from '../elements';

export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Small tier Badge above the name. */
  tier?: React.ReactNode;
  /** Plan name, Inter 700 at 24px. */
  name?: React.ReactNode;
  /** Headline figure, e.g. "$49". */
  price?: React.ReactNode;
  /** Default '/mo'. */
  period?: React.ReactNode;
  /** One muted line under the price. */
  description?: React.ReactNode;
  /** Feature lines, rendered as a list. */
  features?: React.ReactNode[];
  /** Full-width Button. */
  action?: React.ReactNode;
  /** Orbiting edge light, elevation 3, 3% scale-up and a glowing price, all in the card's element. */
  featured?: boolean;
  /** Cursor spotlight on non-featured tiers (needs assets/motion.js). Wrap the row in [data-spotlight-group] so the light spans tiers. Default true. */
  spotlight?: boolean;
  /** Badge pinned to the top-right edge. */
  ribbon?: React.ReactNode;
  /** Tints the edge light, spotlight and, on a featured card, the price color and glow. Accepts success, warning and info; danger falls back to fire. Default 'fire'. */
  element?: Element | 'success' | 'warning' | 'info';
}

export declare function PricingCard(props: PricingCardProps): JSX.Element;
