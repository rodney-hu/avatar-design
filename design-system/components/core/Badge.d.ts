export type BadgeVariant = 'fire' | 'water' | 'earth' | 'air' | 'avatar';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Default 'fire'. */
  variant?: BadgeVariant;
  children?: React.ReactNode;
}

export declare function Badge(props: BadgeProps): JSX.Element;
