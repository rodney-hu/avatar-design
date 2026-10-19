import type { ElementProp } from '../elements';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Uppercase label rendered above the field. Tints to the element on focus. */
  label?: string;
  /** Element or status name for the focus bloom, underline and label tint. Default 'fire'. */
  element?: ElementProp;
  /** Glowing underline that sweeps in from the left on focus. Default true. */
  underline?: boolean;
  /** Muted help text under the field, linked with aria-describedby. */
  hint?: React.ReactNode;
  /** Error message. Sets aria-invalid, turns the field danger red and is linked with aria-describedby. */
  error?: React.ReactNode;
  /** Native required. The label gets a visual * that screen readers skip. */
  required?: boolean;
}

export declare function Input(props: InputProps): JSX.Element;
