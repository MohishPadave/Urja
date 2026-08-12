import React from 'react';
import { 
  FileText, 
  AlertTriangle, 
  FlaskConical, 
  Activity, 
  Plus, 
  ClipboardCheck, 
  Wrench, 
  Octagon, 
  TrendingUp, 
  Search, 
  Bell, 
  Globe 
} from 'lucide-react';

export default function DashboardView({ 
  onAction, 
  productionLogs, 
  isSystemHalted, 
  onHaltToggle,
  user 
}) {
  return (
    <div className="main-content">
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="navbar-brand">Urja Sealants</div>
        <div className="navbar-actions">
          <div className="navbar-search">
            <Search size={16} className="navbar-search-icon" />
            <input type="text" placeholder="Search orders, materials..." />
          </div>
          <button className="icon-btn" onClick={() => alert('No new notifications')}>
            <Bell size={20} />
          </button>
          <button className="icon-btn">
            <Globe size={20} />
          </button>
          <div className="avatar-badge">{user?.name || 'JD'}</div>
        </div>
      </header>

      {/* Main Page Area */}
      <div className="page-container">
        {/* System Halt Banner */}
        {isSystemHalted && (
          <div className="halt-banner">
            <div className="halt-info">
              <AlertTriangle size={24} />
              <div>
                <span className="halt-title">CRITICAL ALERT: </span>
                <span className="halt-desc">Production line has been halted by the Plant Floor Manager. Emergency checks in progress.</span>
              </div>
            </div>
            <button className="btn-primary" style={{ backgroundColor: '#1e293b' }} onClick={onHaltToggle}>
              Resume Production
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <h4>Active Orders</h4>
              <div className="stat-number">124</div>
              <div className="stat-trend trend-up">
                <TrendingUp size={14} />
                <span>12% from yesterday</span>
              </div>
            </div>
            <div className="stat-icon-wrapper stat-icon-orders">
              <FileText size={22} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <h4>Inventory Alerts</h4>
              <div className="stat-number" style={{ color: '#ef4444' }}>8</div>
              <div className="stat-trend">
                <span className="trend-desc">Low stock materials</span>
              </div>
            </div>
            <div className="stat-icon-wrapper stat-icon-alerts">
              <AlertTriangle size={22} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <h4>Mixing Status</h4>
              <div className="stat-number">12</div>
              <div className="stat-trend">
                <span className="trend-desc">3 batches completing soon</span>
              </div>
            </div>
            <div className="stat-icon-wrapper stat-icon-mixing">
              <FlaskConical size={22} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <h4>Daily Output</h4>
              <div className="stat-number">4.2k <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Units</span></div>
              <div className="stat-trend">
                <span className="trend-desc" style={{ color: '#10b981', fontWeight: 600 }}>On track for daily target</span>
              </div>
            </div>
            <div className="stat-icon-wrapper stat-icon-output">
              <Activity size={22} />
            </div>
          </div>
        </div>

        {/* Dashboard 2-column content */}
        <div className="dashboard-columns">
          {/* Left Column: Recent Production Logs */}
          <div className="dashboard-column-left">
            <div className="table-card" style={{ margin: 0 }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="dashboard-section-title">Recent Production Logs</h3>
                <button className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>View All</button>
              </div>
              <div className="table-wrapper">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Batch ID</th>
                      <th>Product</th>
                      <th>Status</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productionLogs.map((log) => (
                      <tr key={log.id}>
                        <td style={{ fontWeight: 600 }}>{log.id}</td>
                        <td>{log.product}</td>
                        <td>
                          <span className={`badge badge-${log.status.toLowerCase().replace(' ', '-')}`}>
                            {log.status}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-muted)' }}>{log.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Actions */}
          <div className="quick-actions-card">
            <h3 className="dashboard-section-title">Quick Actions</h3>
            
            <button className="quick-action-btn quick-action-btn-primary" onClick={() => onAction('new-order')}>
              <Plus size={18} />
              <span>New Order</span>
            </button>

            <button className="quick-action-btn quick-action-btn-neutral" onClick={() => onAction('log-material')}>
              <ClipboardCheck size={18} />
              <span>Log Material Receipt</span>
            </button>

            <button className="quick-action-btn quick-action-btn-neutral" onClick={() => onAction('maintenance')}>
              <Wrench size={18} />
              <span>Maintenance Request</span>
            </button>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                Emergency contact for plant floor issues.
              </p>
              <button 
                className="emergency-btn" 
                style={{ width: '100%', backgroundColor: isSystemHalted ? '#10b981' : '#f97316' }}
                onClick={onHaltToggle}
              >
                <Octagon size={18} />
                <span>{isSystemHalted ? 'Resume Production' : 'Halt Production Line'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
