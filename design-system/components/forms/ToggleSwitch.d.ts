export interface ToggleSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Visible caption before the switch. It is also the switch's accessible name. */
  label?: string;
  /** Optional. A stable id is generated when omitted. */
  id?: string;
}

export declare function ToggleSwitch(props: ToggleSwitchProps): JSX.Element;
