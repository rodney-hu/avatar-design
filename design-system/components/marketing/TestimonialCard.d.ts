export interface TestimonialCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Italic 17px pull quote. */
  quote?: React.ReactNode;
  author?: React.ReactNode;
  role?: React.ReactNode;
  /** Optional leading mark, e.g. an image. The system ships no icon set. */
  avatar?: React.ReactNode;
}

export declare function TestimonialCard(props: TestimonialCardProps): JSX.Element;
