import React from "react";
import { Badge } from "@ds/core/Badge.jsx";
import { StatCard } from "@ds/data/StatCard.jsx";
import { DataTable } from "@ds/data/DataTable.jsx";
import { Alert } from "@ds/feedback/Alert.jsx";
import { Breadcrumb } from "@ds/navigation/Breadcrumb.jsx";
import { Sidebar } from "@ds/navigation/Sidebar.jsx";
import { SidebarItem } from "@ds/navigation/SidebarItem.jsx";

export default function DataScreen() {
  const [power, setPower] = React.useState(98.4);
  const [notice, setNotice] = React.useState(true);
  React.useEffect(() => {
    const t = setInterval(() => setPower((p) => Math.round(Math.min(99.9, Math.max(94, p + (Math.random() - 0.45) * 3)) * 10) / 10), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <main className="shell-main">
      <h1 className="sr-only">Data</h1>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom="water">
        <div className="sec-head" data-reveal>
          <Badge element="water" style={{ width: 'fit-content' }}>06. Data &amp; Dashboards</Badge>
          <h2>Stats &amp; Tables</h2>
          <p>Data components for SaaS dashboards and analytics screens.</p>
        </div>
        <Breadcrumb items={[{ label: 'Elements', href: '#' }, { label: 'Fire', href: '#' }, { label: 'Caldera' }]} />
        <div className="grid4" data-stagger>
          <StatCard element="fire" label="Fire Power Index" value={power.toFixed(1) + '%'} delta="↑ +14.2% Comet boost" />
          <StatCard element="water" label="Oceanic Flow Rate" value="1,420 L/s" delta="Full Moon Alignment" />
          <StatCard element="earth" label="Seismic Density" value="840 MPa" delta="Ground vibration stable" />
          <StatCard element="air" label="Air Velocity" value="120 km/h" delta="Glider lift optimal" />
        </div>
        <div className="data-split" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }} data-reveal>
          <Sidebar as="nav" aria-label="Elements" style={{ height: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)' }}>
            <SidebarItem active>Fire</SidebarItem>
            <SidebarItem>Water</SidebarItem>
            <SidebarItem>Earth</SidebarItem>
            <SidebarItem>Air</SidebarItem>
          </Sidebar>
          <div style={{ flex: 1 }}>
            <DataTable
              caption="Elemental masters"
              columns={['Master', 'Affiliation', 'Specialty', 'Status']}
              rows={[
                [<span style={{ fontWeight: 600, color: 'var(--fire-text)' }}>Ember Hale</span>, 'Fire', 'Heat Control', <Badge element="fire">Active Lead</Badge>],
                [<span style={{ fontWeight: 600, color: 'var(--water-text)' }}>Marin Tide</span>, 'Water', 'Healing', <Badge element="water">Master</Badge>],
                [<span style={{ fontWeight: 600, color: 'var(--earth-text)' }}>Terra Stone</span>, 'Earth', 'Foundations', <Badge element="earth">Chief</Badge>],
                [<span style={{ fontWeight: 600, color: 'var(--air-text)' }}>Sky Drift</span>, 'Air', 'Navigation', <Badge element="avatar">Elemental State</Badge>],
              ]}
            />
          </div>
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} data-halo-bloom>
        <div className="sec-head" data-reveal>
          <Badge element="fire" style={{ width: 'fit-content' }}>07. Feedback &amp; Alerts</Badge>
          <h2>Elemental Notifications</h2>
          <p>Status callouts themed after each element.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} data-stagger>
          <Alert element="fire"><b>Fire Warning:</b> High thermal activity detected in the Caldera.</Alert>
          <Alert element="water"><b>Water Info:</b> Tidal waves arriving at high tide tonight.</Alert>
          <Alert element="earth"><b>Earth Success:</b> Defense walls fortified at the Citadel.</Alert>
          {notice
            ? <Alert element="air" onDismiss={() => setNotice(false)}><b>Air Notice:</b> Tailwinds favorable for Northern Air Temple flight.</Alert>
            : <Alert element="avatar"><b>Dismissed.</b> Alerts with <code>onDismiss</code> get a close button.</Alert>}
        </div>
      </section>
    </main>
  );
}

