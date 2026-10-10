export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Uppercase label rendered above the field. Tints to the element on focus. */
  label?: string;
  /** Element for the focus bloom, underline and label tint. Default 'fire'. */
  element?: 'fire' | 'water' | 'earth' | 'air';
  /** Glowing underline that sweeps in from the left on focus. Default true. */
  underline?: boolean;
}

export declare function Input(props: InputProps): JSX.Element;
