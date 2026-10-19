import type { ElementProp } from '../elements';

export interface ToastItem {
  /** Set by push(). Pass your own to replace or dedupe. */
  id?: string | number;
  /** Color. Element or status name. Default 'fire'. */
  element?: ElementProp;
  /** Bold first line. */
  title?: React.ReactNode;
  /** Supporting text under the title. */
  message?: React.ReactNode;
  /** Ms before it closes on its own. Overrides the hook's duration; 0 keeps it until dismissed. */
  duration?: number;
  /** Set while the exit animation runs. Managed by the hook. */
  closing?: boolean;
}

export interface UseToastsOptions {
  /** Ms each toast stays before closing. 0 keeps toasts until dismissed. Default 4000. */
  duration?: number;
}

/** Toast state. push() returns the new toast's id; dismiss(id) plays the exit and removes it. */
export declare function useToasts(options?: UseToastsOptions): {
  /** Current toasts, oldest first. Pass to ToastStack. */
  toasts: ToastItem[];
  /** Add a toast; returns its id. */
  push: (toast: ToastItem) => string | number;
  /** Close a toast early: plays the exit, then removes it. */
  dismiss: (id: string | number) => void;
};

/**
 * Fixed bottom-right stack of Alert toasts. Rows animate their height so
 * neighbours glide when one arrives or leaves.
 * @startingPoint section="Feedback" subtitle="Toast stack with auto-dismiss" viewport="700x260"
 */
export interface ToastStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** From useToasts(). */
  toasts?: ToastItem[];
  /** Adds a close button to each toast. Pass dismiss from useToasts(). */
  onDismiss?: (id: string | number) => void;
}

export declare function ToastStack(props: ToastStackProps): JSX.Element;
