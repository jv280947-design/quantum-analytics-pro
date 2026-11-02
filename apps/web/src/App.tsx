type StatCard = {
  title: string;
  value: string;
  delta: string;
  positive: boolean;
};

type Customer = {
  id: string;
  name: string;
  segment: string;
  revenue: string;
  health: 'Healthy' | 'Watch' | 'Needs review';
};

const stats: StatCard[] = [
  { title: 'Monthly revenue', value: '$482.4K', delta: '+12.4%', positive: true },
  { title: 'Active customers', value: '1,284', delta: '+8.1%', positive: true },
  { title: 'Retention rate', value: '96.2%', delta: '+1.7%', positive: true },
  { title: 'Churn risk', value: '3.8%', delta: '-0.9%', positive: false },
];

const customers: Customer[] = [
  { id: 'C-104', name: 'Northwind Labs', segment: 'Enterprise', revenue: '$148K', health: 'Healthy' },
  { id: 'C-205', name: 'Crestline Media', segment: 'Growth', revenue: '$91K', health: 'Watch' },
  { id: 'C-312', name: 'Blue Harbor Ops', segment: 'Operations', revenue: '$72K', health: 'Healthy' },
  { id: 'C-415', name: 'Aster Digital', segment: 'SMB', revenue: '$58K', health: 'Needs review' },
];

const chartPoints = [44, 52, 60, 48, 72, 74, 66, 81, 92, 88, 96, 104];

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">Q</div>
          <div>
            <p className="eyebrow">Platform</p>
            <h1>Quantum</h1>
          </div>
        </div>

        <nav className="nav">
          <button className="nav-item active">Overview</button>
          <button className="nav-item">Revenue</button>
          <button className="nav-item">Customers</button>
          <button className="nav-item">Forecasts</button>
          <button className="nav-item">Reports</button>
        </nav>

        <div className="sidebar-card">
          <span className="label">Team status</span>
          <strong>94% target pace</strong>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Executive dashboard</p>
            <h2>Performance overview</h2>
          </div>
          <div className="topbar-actions">
            <button className="ghost-button">This quarter</button>
            <button className="primary-button">Export report</button>
          </div>
        </header>

        <section className="stats-grid">
          {stats.map((stat) => (
            <article key={stat.title} className="stat-card">
              <p>{stat.title}</p>
              <h3>{stat.value}</h3>
              <span className={stat.positive ? 'positive' : 'negative'}>{stat.delta}</span>
            </article>
          ))}
        </section>

        <section className="panel-grid">
          <article className="panel chart-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Revenue trend</p>
                <h3>$1.3M pipeline</h3>
              </div>
              <span className="badge success">+18.5%</span>
            </div>

            <div className="chart" aria-label="Revenue chart">
              {chartPoints.map((point, index) => (
                <span
                  key={index}
                  className="bar"
                  style={{ height: `${point}%` }}
                  title={`${point}k`}
                />
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Customer health</p>
                <h3>Account watchlist</h3>
              </div>
            </div>

            <ul className="customer-list">
              {customers.map((customer) => (
                <li key={customer.id}>
                  <div>
                    <strong>{customer.name}</strong>
                    <span>{customer.segment}</span>
                  </div>
                  <div className="customer-meta">
                    <span>{customer.revenue}</span>
                    <em className={customer.health.toLowerCase().replace(/\s+/g, '-')}>{customer.health}</em>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}
