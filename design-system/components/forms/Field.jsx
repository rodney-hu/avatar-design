import React from 'react';
import { resolveElement } from '../elements.js';

/* One wrapper for every text-like control: label, hint, error and the focus
   underline, with the ids wired for screen readers. It clones its single
   child to add id, aria-describedby, aria-invalid and required.
   With no label, hint, error or underline the control renders alone. */
export function Field({ label, hint, error, required = false, element = 'fire', underline = false, id, className = '', children, ...rest }) {
  const autoId = React.useId();
  const child = React.Children.only(children);
  const fieldId = id || child.props.id || autoId;
  const hintId = hint ? fieldId + '-hint' : undefined;
  const errorId = error ? fieldId + '-error' : undefined;
  const tint = 'field-' + (error ? 'danger' : resolveElement(element, 'fire'));
  const describedBy = [child.props['aria-describedby'], hintId, errorId].filter(Boolean).join(' ') || undefined;
  const bare = !label && !hint && !error && !underline;

  const control = React.cloneElement(child, {
    id: fieldId,
    'aria-describedby': describedBy,
    'aria-invalid': error ? true : child.props['aria-invalid'],
    required: required || child.props.required,
    className: [child.props.className, bare && tint].filter(Boolean).join(' ') || undefined,
  });
  if (bare) return control;

  return (
    <div className={['field', tint, className].filter(Boolean).join(' ')} {...rest}>
      {label && (
        <label htmlFor={fieldId} className="field-label">
          {label}{required && <span aria-hidden="true"> *</span>}
        </label>
      )}
      {underline ? <span className="field-control">{control}<span className="field-line" aria-hidden="true"></span></span> : control}
      {hint && <p id={hintId} className="field-hint">{hint}</p>}
      {error && <p id={errorId} className="field-error">{error}</p>}
    </div>
  );
}
