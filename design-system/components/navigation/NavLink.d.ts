export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Near-white --fire-text, 12%-alpha fire fill and a 2px fire underline. Sets aria-current="page". */
  active?: boolean;
  children?: React.ReactNode;
}

export declare function NavLink(props: NavLinkProps): JSX.Element;
