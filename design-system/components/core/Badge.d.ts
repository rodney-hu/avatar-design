import type { ElementProp } from '../elements';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color: an element or a status name (success, warning, info, danger). Default 'fire'. */
  element?: ElementProp;
  /** Deprecated: the old name for `element`. Still works and warns once. */
  variant?: ElementProp;
  children?: React.ReactNode;
}

export declare function Badge(props: BadgeProps): JSX.Element;
