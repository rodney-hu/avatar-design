export type AlertVariant = 'fire' | 'water' | 'earth' | 'air';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** fire = warning, water = info, earth = success, air = notice. Default 'fire'. */
  variant?: AlertVariant;
  /** Optional leading node. The system ships no icon set. */
  icon?: React.ReactNode;
  /** Bold 14px headline. */
  title?: React.ReactNode;
  /** Default 'status' (announced politely). Use 'alert' for urgent errors that must interrupt. */
  role?: 'status' | 'alert' | string;
  children?: React.ReactNode;
}

export declare function Alert(props: AlertProps): JSX.Element;
