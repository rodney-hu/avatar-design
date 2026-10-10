/**
 * 260px full-height app rail on the base surface.
 * @startingPoint section="Navigation" subtitle="260px app rail with element sections" viewport="700x320"
 */
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function Sidebar(props: SidebarProps): JSX.Element;
