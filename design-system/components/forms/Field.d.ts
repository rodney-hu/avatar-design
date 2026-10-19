import type { ElementProp } from '../elements';

/**
 * Wrapper for a form control: label, hint, error and focus underline, with
 * the ids wired for screen readers. Input, Select and Textarea use it; wrap
 * your own control (a date picker, a combobox) to get the same behavior.
 * @startingPoint section="Forms" subtitle="Label, hint, error and required for any control" viewport="700x200"
 */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uppercase label above the control, tied to it with htmlFor. Tints to the element on focus. */
  label?: React.ReactNode;
  /** Muted help text under the control, linked with aria-describedby. */
  hint?: React.ReactNode;
  /** Error message. Adds aria-invalid to the control, switches the tint to danger and is linked with aria-describedby. */
  error?: React.ReactNode;
  /** Passes native required to the control and shows a visual * that screen readers skip. Default false. */
  required?: boolean;
  /** Element or status name for the focus bloom, underline and label tint. Ignored while error is set. Default 'fire'. */
  element?: ElementProp;
  /** Wrap the control in the glowing focus underline. Default false (Input, Select and Textarea turn it on). */
  underline?: boolean;
  /** Id for the control. Falls back to the child's id, then a generated one. */
  id?: string;
  /** Exactly one control element. It receives id, aria-describedby, aria-invalid and required. */
  children: React.ReactElement;
}

export declare function Field(props: FieldProps): JSX.Element;
