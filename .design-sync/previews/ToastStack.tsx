import React from 'react';
import { ToastStack } from '@elemental-ui/design-system';

export const Stack = () => (
  <div style={{ background: 'var(--color-surface-void)', minHeight: 320 }}>
    <ToastStack
      onDismiss={() => {}}
      toasts={[
        { id: 1, element: 'success', title: 'Scroll saved', message: 'Copied to the archive.' },
        { id: 2, element: 'water', title: 'Tide rising', message: 'High tide reaches the docks at dusk.' },
        { id: 3, element: 'fire', title: 'Comet approaching', message: "Sozin's Comet arrives in three days." },
      ]}
    />
  </div>
);
