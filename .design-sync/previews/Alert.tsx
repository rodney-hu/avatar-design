import React from 'react';
import { Alert } from '@elemental-ui/design-system';

// The card harness renders on white; this system is dark-first (body uses
// --color-surface-void), so each story sits on the DS's own dark surface.
const stage: React.CSSProperties = { background: 'var(--color-surface-void)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' };
const Stage = ({ children }: { children: React.ReactNode }) => <div style={stage}>{children}</div>;
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 };

export const Elements = () => (
  <Stage><div style={{ ...col, maxWidth: 640 }}>
    <Alert element="fire"><b>Fire Warning:</b> High thermal activity detected in the Caldera.</Alert>
    <Alert element="water"><b>Water Info:</b> Tidal waves arriving at high tide tonight.</Alert>
    <Alert element="earth"><b>Earth Success:</b> Defense walls fortified at Ba Sing Se.</Alert>
    <Alert element="air"><b>Air Notice:</b> Tailwinds favorable for Northern Air Temple flight.</Alert>
  </div></Stage>
);

export const WithTitle = () => (
  <Stage><div style={{ ...col, maxWidth: 640 }}>
    <Alert element="success" title="Scroll saved">Copied to the archive of the Order.</Alert>
    <Alert element="danger" title="Ritual failed" onDismiss={() => {}}>The comet has passed. Try again at the next solstice.</Alert>
  </div></Stage>
);
