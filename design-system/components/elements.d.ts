/** The five element colors. Fire is the brand color. */
export type Element = 'fire' | 'water' | 'earth' | 'air' | 'avatar';

/**
 * Status names. success, warning and info are aliases for earth, air and water.
 * danger has its own tokens (`--color-danger-*`), which equal fire by default.
 */
export type Status = 'success' | 'warning' | 'info' | 'danger';

/** What every `element` prop accepts. */
export type ElementProp = Element | Status;

export declare const ELEMENTS: Element[];
export declare const ALIASES: { success: 'earth'; warning: 'air'; info: 'water' };
export declare function resolveElement(value?: string | null, fallback?: string | null, allowDanger?: boolean): Element | 'danger' | string | null;
export declare function isColor(value?: string | null): boolean;
