/* One color vocabulary for every component.
   element: fire | water | earth | air | avatar.
   Status names are aliases: success -> earth, warning -> air, info -> water.
   danger has its own tokens (--color-danger-*), which point at fire for now. */
export const ELEMENTS = ['fire', 'water', 'earth', 'air', 'avatar'];
export const ALIASES = { success: 'earth', warning: 'air', info: 'water' };

/* Returns the canonical color name, or `fallback` for anything unknown.
   Pass allowDanger=false for components that have no danger style. */
export function resolveElement(value, fallback = 'fire', allowDanger = true) {
  if (value == null) return fallback;
  if (ELEMENTS.includes(value)) return value;
  if (ALIASES[value]) return ALIASES[value];
  if (value === 'danger') return allowDanger ? 'danger' : 'fire';
  return fallback;
}

export function isColor(value) {
  return value != null && (ELEMENTS.includes(value) || value in ALIASES || value === 'danger');
}

/* Back-compat: Button, Badge, Alert and Card used to take color through
   `variant`. A color passed there still works and warns once per component. */
const warned = {};
export function colorFromVariant(component, variant, element) {
  if (!isColor(variant)) return { element, variant };
  if (!warned[component] && typeof console !== 'undefined') {
    warned[component] = true;
    console.warn(`${component}: variant="${variant}" is deprecated. Use element="${variant}" for color.`);
  }
  return { element: element ?? variant, variant: undefined };
}
