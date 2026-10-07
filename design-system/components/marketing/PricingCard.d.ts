export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Small tier Badge above the name. */
  tier?: React.ReactNode;
  name?: React.ReactNode;
  /** Headline figure, e.g. "$49". */
  price?: React.ReactNode;
  /** Default '/mo'. */
  period?: React.ReactNode;
  description?: React.ReactNode;
  features?: React.ReactNode[];
  /** Full-width Button. */
  action?: React.ReactNode;
  /** Orbiting edge light, elevation 3, 3% scale-up and a fire-glow price. */
  featured?: boolean;
  /** Cursor spotlight on non-featured tiers (needs assets/motion.js). Wrap the row in [data-spotlight-group] so the light spans tiers. Default true. */
  spotlight?: boolean;
  /** Badge pinned to the top-right edge. */
  ribbon?: React.ReactNode;
  /** Tints edge light + spotlight. Default 'fire'. */
  element?: 'fire' | 'water' | 'earth' | 'air';
}

export declare function PricingCard(props: PricingCardProps): JSX.Element;
