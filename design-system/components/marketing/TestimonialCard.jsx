import React from 'react';

export function TestimonialCard({ quote, author, role, avatar, className = '', ...rest }) {
  return (
    <figure className={['testimonial-card', className].filter(Boolean).join(' ')} {...rest}>
      <blockquote className="testimonial-quote">{quote}</blockquote>
      <figcaption className="testimonial-author">
        {avatar}
        <div>
          <div className="testimonial-name">{author}</div>
          {role && <div className="testimonial-role">{role}</div>}
        </div>
      </figcaption>
    </figure>
  );
}
