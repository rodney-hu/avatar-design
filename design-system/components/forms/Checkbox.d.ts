import type { ElementProp } from '../elements';

/** Custom checkbox: element fill pops with a spring and the tick draws itself in. */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Text beside the box. Clicking it toggles the box. */
  label?: React.ReactNode;
  /** Fill + glow color when checked. Element or status name. Default 'fire'. */
  element?: ElementProp;
}

export declare function Checkbox(props: CheckboxProps): JSX.Element;
