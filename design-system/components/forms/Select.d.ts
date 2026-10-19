import type { ElementProp } from '../elements';

export interface SelectOption { value: string; label: string }

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
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
  /** Strings, or {value,label} pairs. Ignored if children are passed. */
  options?: (string | SelectOption)[];
  /** Your own <option> elements, used instead of options. */
  children?: React.ReactNode;
}

export declare function Select(props: SelectProps): JSX.Element;
