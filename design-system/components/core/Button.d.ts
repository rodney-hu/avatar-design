export type ButtonVariant = 'fire' | 'water' | 'earth' | 'air' | 'avatar' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Primary action control. Fire is the brand CTA; water/earth/air carry
 * element-scoped actions; outline and ghost are the quiet variants.
 * @startingPoint section="Core" subtitle="Elemental buttons, sizes and states" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Default 'fire'. */
  variant?: ButtonVariant;
  /** Default 'md'. */
  size?: ButtonSize;
  /** Square padding for a lone glyph. The system ships no icons; kept for consumers who bring their own. */
  iconOnly?: boolean;
  /** Stretch to the container width. */
  fullWidth?: boolean;
  /** Diagonal light sweep on hover. Default true. */
  sheen?: boolean;
  /** Element particle burst from the press point (fire embers, water ripple, earth chunks, air motes, avatar rings). Needs assets/motion.js. Outline and ghost never burst. Default true. */
  burst?: boolean;
  /** Render as another tag, e.g. 'a'. Default 'button'. */
  as?: 'button' | 'a';
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
