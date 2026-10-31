import React from "react";
import { Badge } from "@ds/core/Badge.jsx";
import { Button } from "@ds/core/Button.jsx";
import { Card } from "@ds/core/Card.jsx";
import { Input } from "@ds/forms/Input.jsx";
import { Select } from "@ds/forms/Select.jsx";
import { Textarea } from "@ds/forms/Textarea.jsx";
import { Checkbox } from "@ds/forms/Checkbox.jsx";
import { ToggleSwitch } from "@ds/forms/ToggleSwitch.jsx";
import { Tooltip } from "@ds/feedback/Tooltip.jsx";
import { Menu } from "@ds/navigation/Menu.jsx";

export default function ComponentsScreen({ onModal }) {
  const elements = ['fire', 'water', 'earth', 'air', 'avatar'];
  const [saving, setSaving] = React.useState(false);
  const save = () => { setSaving(true); setTimeout(() => setSaving(false), 1500); };
  return (
    <main className="shell-main">
      <h1 className="sr-only">Components</h1>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom>
        <div className="sec-head" data-reveal>
          <Badge element="water" style={{ width: 'fit-content' }}>03. Buttons &amp; Actions</Badge>
          <h2>Elemental Action Buttons</h2>
          <p>Elemental hover glows, tactile active states, and custom variants.</p>
        </div>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} data-reveal>
          <div>
            <h3 className="stat-label" style={{ margin: '0 0 0.75rem' }}>Elements</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {elements.map((e) => (
                <Button key={e} element={e}>{e === 'avatar' ? 'Elemental' : e[0].toUpperCase() + e.slice(1)}</Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="stat-label" style={{ margin: '0 0 0.75rem' }}>Styles &amp; sizes</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <Button size="lg">Large Fire</Button>
              <Button>Medium Fire</Button>
              <Button size="sm">Small Fire</Button>
              <Tooltip text="Secondary action, fire outline on hover"><Button variant="outline">Outline</Button></Tooltip>
              <Button variant="ghost">Ghost Link</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
          <div>
            <h3 className="stat-label" style={{ margin: '0 0 0.75rem' }}>Status names</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              {['success', 'warning', 'info', 'danger'].map((s) => (
                <Badge key={s} element={s}>{s}</Badge>
              ))}
              <Button element="danger" variant="outline" size="sm">Delete scroll</Button>
              <Menu label="Scroll actions" items={[
                { label: 'Copy to archive', onSelect: () => {} },
                { label: 'Share with the Order', onSelect: () => {} },
                { label: 'Burn (sealed)', disabled: true },
              ]} />
            </div>
          </div>
        </Card>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom="earth">
        <div className="sec-head" data-reveal>
          <Badge element="earth" style={{ width: 'fit-content' }}>04. Cards &amp; Containers</Badge>
          <h2>Layered Surfaces &amp; Glass</h2>
          <p>Depth layers from #0a0a0a to elevated cards with glowing borders.</p>
        </div>
        <div className="grid3" data-stagger>
          <Card element="fire" elevation={2} data-tilt style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Badge element="fire">Fire</Badge>            </div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>Ember Temple</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>The oldest source of fire, kept burning by those who tend it.</p>
            <Button size="sm" fullWidth>Enter Temple</Button>
          </Card>
          <Card element="water" elevation={2} data-tilt style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Badge element="water">Water</Badge>            </div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>The Sanctuary</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>A quiet haven where water and light circle in harmony.</p>
            <Button element="water" size="sm" fullWidth>Visit Sanctuary</Button>
          </Card>
          <Card variant="glass" elevation={2} data-tilt style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Badge element="avatar">Glassmorphism</Badge>            </div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>Cosmic Energy Overlay</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Backdrop blur at 16px with glowing highlights.</p>
            <Button element="avatar" size="sm" fullWidth onClick={onModal}>Unlock Energy</Button>
          </Card>
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom>
        <div className="sec-head" data-reveal>
          <Badge element="fire" style={{ width: 'fit-content' }}>05. Forms &amp; Inputs</Badge>
          <h2>Form Controls</h2>
          <p>Inputs with elemental focus halos, custom toggles, and select menus.</p>
        </div>
        <Card className="grid2" data-reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input id="display-name" label="Display Name" defaultValue="Sky" placeholder="e.g. Ember, Marin, Terra" />
            <Select id="primary-element" element="water" label="Primary Element" options={['Fire', 'Water', 'Earth', 'Air']} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Textarea id="scroll-notes" element="earth" label="Scroll Notes" placeholder="Write ancient elemental techniques..." />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
              <Checkbox id="elemental-state" element="avatar" label="Enable Elemental State" defaultChecked />
              <ToggleSwitch id="ember-glow" label="Ember Glow" defaultChecked />
            </div>
          </div>
        </Card>
        <Card data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 className="stat-label" style={{ margin: 0 }}>Validation &amp; loading</h3>
          <div className="grid2">
            <Input id="member-name" label="Member Name" required defaultValue="Ember" error="That name is already taken." />
            <Select id="nation" label="Home Element" hint="Where your training began." options={['Fire', 'Water', 'Earth', 'Air']} />
          </div>
          <div>
            <Button loading={saving} onClick={save}>Save Profile</Button>
          </div>
        </Card>
      </section>
    </main>
  );
}

