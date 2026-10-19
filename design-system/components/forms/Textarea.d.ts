import type { ElementProp } from '../elements';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Uppercase label above the field. Tints to the element on focus. */
  label?: string;
  /** Element or status name for the focus bloom and label tint. Default 'fire'. */
  element?: ElementProp;
  /** Glowing underline that sweeps in from the left on focus. Default true. */
  underline?: boolean;
  /** Muted help text under the field, linked with aria-describedby. */
  hint?: React.ReactNode;
  /** Error message. Sets aria-invalid, turns the field danger red and is linked with aria-describedby. */
  error?: React.ReactNode;
  /** Native required. The label gets a visual * that screen readers skip. */
  required?: boolean;
  /** Visible lines. Default 3. */
  rows?: number;
}

export declare function Textarea(props: TextareaProps): JSX.Element;
