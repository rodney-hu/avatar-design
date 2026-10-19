import type { ElementProp } from '../elements';

/** Style only. Color comes from `element`. */
export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Primary action control. A solid fire button is the brand CTA; outline and
 * ghost are the quiet styles. `element` picks the color, `variant` the style.
 * @startingPoint section="Core" subtitle="Elemental buttons, sizes and states" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color: an element or a status name (success, warning, info, danger). Solid buttons fill with it; outline buttons take it on hover; ghost buttons keep it for motion only. Default 'fire'. */
  element?: ElementProp;
  /** Style. Default 'solid'. A color here (e.g. 'water') still works as `element` but is deprecated and warns once. */
  variant?: ButtonVariant | ElementProp;
  /** Default 'md'. */
  size?: ButtonSize;
  /** Square padding for a lone glyph. The system ships no icons; kept for consumers who bring their own. */
  iconOnly?: boolean;
  /** Stretch to the container width. */
  fullWidth?: boolean;
  /** Diagonal light sweep on hover. Default true. */
  sheen?: boolean;
  /** Element particle burst from the press point (fire embers, water ripple, earth chunks, air motes, avatar rings; danger uses embers). Needs assets/motion.js. Outline and ghost never burst. Default true. */
  burst?: boolean;
  /** Render as another tag, e.g. 'a'. Default 'button'. */
  as?: 'button' | 'a';
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
