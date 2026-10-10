import React from 'react';

export function TestimonialCard({ quote, author, role, avatar, className = '', ...rest }) {
  return (
    <figure className={['testimonial-card', className].filter(Boolean).join(' ')} style={{ margin: 0 }} {...rest}>
      <blockquote className="testimonial-quote" style={{ margin: 0 }}>{quote}</blockquote>
      <figcaption className="testimonial-author">
        {avatar}
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{author}</div>
          {role && <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{role}</div>}
        </div>
      </figcaption>
    </figure>
  );
}
