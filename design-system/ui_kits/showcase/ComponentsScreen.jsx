const { Badge, Button, Card, Input, Select, Textarea, Checkbox, ToggleSwitch, Tooltip } = window.ElementalUIDesignSystem_5d6c38;

function ComponentsScreen({ onModal }) {
  const elements = ['fire', 'water', 'earth', 'air', 'avatar'];
  return (
    <main className="shell-main">
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom>
        <div className="sec-head" data-reveal>
          <Badge variant="water" style={{ width: 'fit-content' }}>03. Buttons &amp; Actions</Badge>
          <h2>Bending Action Buttons</h2>
          <p>Elemental hover glows, tactile active states, and custom variants.</p>
        </div>
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} data-reveal>
          <div>
            <h4 className="stat-label" style={{ margin: '0 0 0.75rem' }}>Elemental variants</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {elements.map((e) => (
                <Button key={e} variant={e}>{e[0].toUpperCase() + e.slice(1)}</Button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="stat-label" style={{ margin: '0 0 0.75rem' }}>Styles &amp; sizes</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <Button size="lg">Large Fire</Button>
              <Button>Medium Fire</Button>
              <Button size="sm">Small Fire</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost Link</Button>
              <Button disabled>Disabled</Button>
              </div>
          </div>
        </Card>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom="earth">
        <div className="sec-head" data-reveal>
          <Badge variant="earth" style={{ width: 'fit-content' }}>04. Cards &amp; Containers</Badge>
          <h2>Layered Surfaces &amp; Glass</h2>
          <p>Depth layers from #0a0a0a to elevated cards with glowing borders.</p>
        </div>
        <div className="grid3" data-stagger>
          <Card variant="fire" elevation={2} data-tilt style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Badge variant="fire">Fire Nation</Badge>            </div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>Sun Warrior Temple</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>The original source of firebending power, guarded by the dragons Ran and Shaw.</p>
            <Button size="sm" fullWidth>Enter Temple</Button>
          </Card>
          <Card variant="water" elevation={2} data-tilt style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Badge variant="water">Northern Tribe</Badge>            </div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>Spirit Oasis</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>A sacred haven at the North Pole where Tui and La circle in eternal harmony.</p>
            <Button variant="water" size="sm" fullWidth>Visit Sanctuary</Button>
          </Card>
          <Card variant="glass" elevation={2} data-tilt style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Badge variant="avatar">Glassmorphism</Badge>            </div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>Cosmic Energy Overlay</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Backdrop blur at 16px with glowing highlights.</p>
            <Button variant="avatar" size="sm" fullWidth onClick={onModal}>Unlock Energy</Button>
          </Card>
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom>
        <div className="sec-head" data-reveal>
          <Badge variant="fire" style={{ width: 'fit-content' }}>05. Forms &amp; Inputs</Badge>
          <h2>Form Controls</h2>
          <p>Inputs with elemental focus halos, custom toggles, and select menus.</p>
        </div>
        <Card style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} data-reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input id="avatar-name" label="Avatar Name" defaultValue="Aang" placeholder="e.g. Aang, Korra, Roku" />
            <Select id="primary-element" label="Primary Element" options={['Firebending', 'Waterbending', 'Earthbending', 'Airbending']} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Textarea id="scroll-notes" label="Scroll Notes" placeholder="Write ancient bending techniques..." />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
              <Checkbox id="avatar-state" label="Enable Avatar State" defaultChecked />
              <ToggleSwitch id="ember-glow" label="Ember Glow" defaultChecked />
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}

Object.assign(window, { ComponentsScreen });
