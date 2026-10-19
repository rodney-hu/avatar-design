import type { ElementProp } from '../elements';

export interface SelectOption { value: string; label: string }

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Uppercase label above the field. Tints to the element on focus. */
  label?: string;
  /** Element or status name for the focus bloom and label tint. Default 'fire'. */
  element?: ElementProp;
  /** Strings, or {value,label} pairs. Ignored if children are passed. */
  options?: (string | SelectOption)[];
  children?: React.ReactNode;
}

export declare function Select(props: SelectProps): JSX.Element;
