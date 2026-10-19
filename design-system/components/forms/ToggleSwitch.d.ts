import type { ElementProp } from '../elements';

export interface ToggleSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Visible caption before the switch. It is also the switch's accessible name. */
  label?: string;
  /** Track color when on. Element or status name. Default 'fire'. */
  element?: ElementProp;
  /** Optional. A stable id is generated when omitted. */
  id?: string;
}

export declare function ToggleSwitch(props: ToggleSwitchProps): JSX.Element;
