export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  /** Optional leading node. The system ships no icon set. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function SidebarItem(props: SidebarItemProps): JSX.Element;
