export interface BreadcrumbItem { label: string; href?: string }

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items?: BreadcrumbItem[];
  /** Default '/'. */
  separator?: React.ReactNode;
}

export declare function Breadcrumb(props: BreadcrumbProps): JSX.Element;
