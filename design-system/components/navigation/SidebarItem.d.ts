export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Current page: raised background, fire left border and aria-current="page". */
  active?: boolean;
  /** Optional leading node. The system ships no icon set. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function SidebarItem(props: SidebarItemProps): JSX.Element;
