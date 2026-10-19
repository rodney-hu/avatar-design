/**
 * 260px full-height app rail on the base surface.
 * @startingPoint section="Navigation" subtitle="260px app rail with element sections" viewport="700x320"
 */
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Landmark element. Default 'aside'. Use 'nav' (with aria-label) for a navigation rail, or when it sits inside <main>. */
  as?: 'aside' | 'nav' | 'div';
  /** Top slot, usually the brand. */
  header?: React.ReactNode;
  /** Bottom slot, pinned to the foot of the rail (account, settings). */
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function Sidebar(props: SidebarProps): JSX.Element;
