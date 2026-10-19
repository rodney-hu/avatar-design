export interface BreadcrumbItem { label: string; href?: string }

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Trail from root to the current page. Items with href render as links; the last item never does. */
  items?: BreadcrumbItem[];
  /** Default '/'. */
  separator?: React.ReactNode;
}

export declare function Breadcrumb(props: BreadcrumbProps): JSX.Element;
