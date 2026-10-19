import type { ElementProp } from '../elements';

export interface MenuItem {
  /** Item text. */
  label: React.ReactNode;
  /** Called when the item is chosen by click, Enter or Space. The menu closes first. */
  onSelect?: () => void;
  /** Greyed out, skipped by the arrow keys and not selectable. */
  disabled?: boolean;
}

/**
 * Menu button: a trigger that opens a popover list of actions, with full
 * keyboard support.
 * @startingPoint section="Navigation" subtitle="Menu button with a popover of actions" viewport="700x260"
 */
export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Trigger text, and the menu's accessible name. */
  label: React.ReactNode;
  /** The actions, in order. */
  items?: MenuItem[];
  /** Element or status name for the trigger's outline hover and the item hover tint. Default fire. */
  element?: ElementProp;
  /** Open below (default) or above the trigger. */
  side?: 'bottom' | 'top';
  /** Line the menu up with the trigger's start (default) or end edge. */
  align?: 'start' | 'end';
  /** Your own trigger element instead of the default outline Button. It receives aria-haspopup, aria-expanded, aria-controls, onClick and onKeyDown. */
  trigger?: React.ReactElement;
}

export declare function Menu(props: MenuProps): JSX.Element;
