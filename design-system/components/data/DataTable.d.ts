/**
 * Bordered 8px-radius table; header row sits on the raised surface in uppercase.
 * @startingPoint section="Data" subtitle="Elemental table and KPI tiles" viewport="700x300"
 */
export interface DataTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Header labels, or {header} objects. */
  columns?: (string | { header: React.ReactNode })[];
  /** Row-major cell content; cells may be nodes (e.g. a Badge). */
  rows?: React.ReactNode[][];
  /** Names the table for screen readers. Visually hidden. */
  caption?: string;
}

export declare function DataTable(props: DataTableProps): JSX.Element;
