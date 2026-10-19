export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Default true. Setting false plays the exit (scale + fade, expo-in, ~350ms) before unmounting. */
  open?: boolean;
  /** Inter 700 headline in --fire-text. Also the dialog's accessible name (aria-labelledby). */
  title?: React.ReactNode;
  /** Called by the ×, a backdrop click and Escape. */
  onClose?: () => void;
  /** Right-aligned action row. */
  footer?: React.ReactNode;
  /** Default true: .glass-thick (28px blur) + lit gradient edge over elevation 4 + fire glow. false = solid elevated surface with fire border. */
  glass?: boolean;
  children?: React.ReactNode;
}

export declare function Modal(props: ModalProps): JSX.Element;
