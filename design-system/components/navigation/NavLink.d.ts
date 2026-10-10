export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Fire text, 12%-alpha fill and a 2px fire underline. */
  active?: boolean;
  children?: React.ReactNode;
}

export declare function NavLink(props: NavLinkProps): JSX.Element;
