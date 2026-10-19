import type { ElementProp } from '../elements';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Uppercase label above the field. Tints to the element on focus. */
  label?: string;
  /** Element or status name for the focus bloom and label tint. Default 'fire'. */
  element?: ElementProp;
  /** Default 3. */
  rows?: number;
}

export declare function Textarea(props: TextareaProps): JSX.Element;
