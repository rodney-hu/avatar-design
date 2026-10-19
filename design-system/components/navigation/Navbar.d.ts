/**
 * Sticky top bar: blurred 85% surface, subtle bottom border, 16px/32px padding.
 * Below 900px the links and actions fold into a panel behind a Menu toggle.
 * @startingPoint section="Navigation" subtitle="Sticky blurred top bar with brand and actions" viewport="700x150"
 */
export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand lockup — plain wordmark (no logo or glyph exists). */
  brand?: React.ReactNode;
  /** Where the brand links. Default '/'. */
  brandHref?: string;
  /** Nav links (center group). Below 900px they stack in the menu panel; clicking one closes it. */
  children?: React.ReactNode;
  /** Right-hand buttons. Below 900px they sit under the links in the menu panel. */
  actions?: React.ReactNode;
  /** Default true: .glass-thick (28px blur, 180% saturate). false = 85% surface + 12px blur. */
  glass?: boolean;
  /** Set once the page scrolls: drops an elevation-2 shadow under the bar. Default false (top-edge highlight only). */
  scrolled?: boolean;
}

export declare function Navbar(props: NavbarProps): JSX.Element;
