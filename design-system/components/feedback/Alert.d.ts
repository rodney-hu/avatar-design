import type { ElementProp } from '../elements';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Color: an element or a status name. success = earth, warning = air, info = water, danger = its own tokens (fire by default). Default 'fire'. */
  element?: ElementProp;
  /** Deprecated: the old name for `element`. Still works and warns once. */
  variant?: ElementProp;
  /** Optional leading node. The system ships no icon set. */
  icon?: React.ReactNode;
  /** Bold 14px headline. */
  title?: React.ReactNode;
  /** Shows a close button (aria-label "Dismiss") that calls this. The caller removes the alert. */
  onDismiss?: () => void;
  /** Default 'status' (announced politely). Use 'alert' for urgent errors that must interrupt. */
  role?: 'status' | 'alert' | string;
  children?: React.ReactNode;
}

export declare function Alert(props: AlertProps): JSX.Element;
