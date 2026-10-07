export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Single-line label shown on hover or focus after a 120ms intent delay. Leaves immediately. */
  text: React.ReactNode;
  /** Default 'top'. The label slides 4px toward the trigger as it enters. */
  side?: 'top' | 'bottom';
  children?: React.ReactNode;
}

export declare function Tooltip(props: TooltipProps): JSX.Element;
