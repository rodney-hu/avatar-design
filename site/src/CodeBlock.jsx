import React from 'react';
import { Button } from '@ds/core/Button.jsx';

export default function CodeBlock({ children }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="code-block">
      <Button variant="ghost" size="sm" burst={false} className="copy-btn" style={copied ? { color: 'var(--color-earth-400)' } : undefined} onClick={copy}>
        {copied ? 'Copied!' : 'Copy'}
      </Button>
      <pre style={{ margin: 0 }}><code>{children}</code></pre>
    </div>
  );
}
