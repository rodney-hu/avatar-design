const { Badge, StatCard, DataTable, Alert, Breadcrumb, Sidebar, SidebarItem } = window.ElementalUIDesignSystem_5d6c38;

function DataScreen() {
  const [power, setPower] = React.useState(98.4);
  React.useEffect(() => {
    const t = setInterval(() => setPower((p) => Math.round(Math.min(99.9, Math.max(94, p + (Math.random() - 0.45) * 3)) * 10) / 10), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <main className="shell-main">
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom="water">
        <div className="sec-head" data-reveal>
          <Badge variant="water" style={{ width: 'fit-content' }}>06. Data &amp; Dashboards</Badge>
          <h2>Stats &amp; Tables</h2>
          <p>Data components for SaaS dashboards and analytics screens.</p>
        </div>
        <Breadcrumb items={[{ label: 'Nations', href: '#' }, { label: 'Fire Nation', href: '#' }, { label: 'Caldera' }]} />
        <div className="grid4" data-stagger>
          <StatCard element="fire" label="Fire Power Index" value={power.toFixed(1) + '%'} delta="↑ +14.2% Comet boost" />
          <StatCard element="water" label="Oceanic Flow Rate" value="1,420 L/s" delta="Full Moon Alignment" />
          <StatCard element="earth" label="Seismic Density" value="840 MPa" delta="Ground vibration stable" />
          <StatCard element="air" label="Air Velocity" value="120 km/h" delta="Glider lift optimal" />
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }} data-reveal>
          <Sidebar style={{ height: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)' }}>
            <SidebarItem active>Fire Nation</SidebarItem>
            <SidebarItem>Water Tribe</SidebarItem>
            <SidebarItem>Earth Kingdom</SidebarItem>
            <SidebarItem>Air Nomads</SidebarItem>
          </Sidebar>
          <div style={{ flex: 1 }}>
            <DataTable
              columns={['Master', 'Affiliation', 'Specialty', 'Status']}
              rows={[
                [<span style={{ fontWeight: 600, color: 'var(--color-fire-400)' }}>Zuko</span>, 'Fire Nation', 'Lightning Redirection', <Badge variant="fire">Active Fire Lord</Badge>],
                [<span style={{ fontWeight: 600, color: 'var(--color-water-400)' }}>Katara</span>, 'Southern Water Tribe', 'Bloodbending / Healing', <Badge variant="water">Grandmaster</Badge>],
                [<span style={{ fontWeight: 600, color: 'var(--color-earth-400)' }}>Toph Beifong</span>, 'Earth Kingdom', 'Metalbending Creator', <Badge variant="earth">Chief of Police</Badge>],
                [<span style={{ fontWeight: 600, color: 'var(--color-air-400)' }}>Aang</span>, 'Air Nomads', 'Energybending', <Badge variant="avatar">Avatar State</Badge>],
              ]}
            />
          </div>
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom>
        <div className="sec-head" data-reveal>
          <Badge variant="fire" style={{ width: 'fit-content' }}>07. Feedback &amp; Alerts</Badge>
          <h2>Elemental Notifications</h2>
          <p>Status callouts themed after each element.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} data-stagger>
          <Alert variant="fire"><b>Fire Warning:</b> High thermal activity detected in the Caldera.</Alert>
          <Alert variant="water"><b>Water Info:</b> Tidal waves arriving at high tide tonight.</Alert>
          <Alert variant="earth"><b>Earth Success:</b> Defense walls fortified at Ba Sing Se.</Alert>
          <Alert variant="air"><b>Air Notice:</b> Tailwinds favorable for Northern Air Temple flight.</Alert>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { DataScreen });
