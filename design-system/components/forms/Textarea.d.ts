export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  /** Default 3. */
  rows?: number;
}

export declare function Textarea(props: TextareaProps): JSX.Element;
