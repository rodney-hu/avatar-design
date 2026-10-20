import React from 'react';
import { Modal, Button } from '@elemental-ui/design-system';

export const Open = () => (
  <div style={{ background: 'var(--color-surface-void)', minHeight: 420 }}>
    <Modal open title="Firebending Scroll" onClose={() => {}}
      footer={<>
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button size="sm">Accept Flame</Button>
      </>}>
      Fire is the element of power. Its people have desire and will, and the energy and drive to get what they want.
    </Modal>
  </div>
);
