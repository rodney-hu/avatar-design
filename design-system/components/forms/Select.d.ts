export interface SelectOption { value: string; label: string }

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  /** Strings, or {value,label} pairs. Ignored if children are passed. */
  options?: (string | SelectOption)[];
  children?: React.ReactNode;
}

export declare function Select(props: SelectProps): JSX.Element;
