export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uppercase caption. */
  label: string;
  /** Headline figure, rendered in Inter 700 at 32px with tabular numerals. Strings like "98.4%", "$1,420" or "120 km/h" are parsed so prefix, separators, decimals and suffix survive the count. */
  value: React.ReactNode;
  /** Small supporting line under the value. Nudges up or down on change. */
  delta?: React.ReactNode;
  /** Tints value, glow and border. Default 'none'. */
  element?: 'fire' | 'water' | 'earth' | 'air' | 'none';
  /** Count up from 0 (expo-out) the first time the card scrolls into view. Default true. */
  countUp?: boolean;
  /** When a numeric value changes, roll to the new figure and flash the card (earth green when up, fire red when down). Default true. */
  flash?: boolean;
  /** Count-up length in ms. Change rolls run at 64% of it. Default 1100 (--duration-slower). */
  duration?: number;
}

export declare function StatCard(props: StatCardProps): JSX.Element;
