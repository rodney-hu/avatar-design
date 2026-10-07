/** Custom checkbox: element fill pops with a spring and the tick draws itself in. */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  /** Fill + glow color when checked. Default 'fire'. */
  element?: 'fire' | 'water' | 'earth' | 'air';
}

export declare function Checkbox(props: CheckboxProps): JSX.Element;
