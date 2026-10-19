import type { ElementProp } from '../elements';

/** Surface style only. Color comes from `element`. */
export type CardVariant = 'base' | 'raised' | 'glass';

/**
 * Surface container: 8px radius, 1px subtle border, 24px padding.
 * Materials: elevation 0–4, glass tier with lit gradient edge, grain, cursor spotlight, orbiting edge light.
 * @startingPoint section="Core" subtitle="Surface depth, elemental borders and glass" viewport="700x260"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Default 'base'. 'glass' = .glass (16px blur) + .border-gradient. A color here still works as `element` but is deprecated and warns once. */
  variant?: CardVariant | ElementProp;
  /** Default 1. 0 flat · 1 resting · 2 raised · 3 popover · 4 modal. */
  elevation?: 0 | 1 | 2 | 3 | 4;
  /** Hover lifts to elevation 3 and rises 2px. Default false. */
  lift?: boolean;
  /** Cursor spotlight (needs assets/motion.js). Ignored with edgeLight or variant 'glass'. Default false. */
  spotlight?: boolean;
  /** Orbiting element-colored border comet. One per view. Default false. */
  edgeLight?: boolean;
  /** Film-grain overlay. Default false. */
  grain?: boolean;
  /** Colored border and hover glow, and scopes the edge light, spotlight and motion personality to that element. Accepts status names. Glass cards keep their glass edge and take only the scope. Default: none (neutral). */
  element?: ElementProp;
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): JSX.Element;
