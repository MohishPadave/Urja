import React, { useState } from 'react';
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
  Globe,
  Calendar
} from 'lucide-react';

const COLUMNS = [
  { id: 'Confirmed', title: 'Confirmed', dotClass: 'confirmed' },
  { id: 'In Production', title: 'In Production', dotClass: 'production' },
  { id: 'Testing', title: 'Testing', dotClass: 'testing' },
  { id: 'Packaging', title: 'Packaging', dotClass: 'packaging' },
  { id: 'Completed', title: 'Completed', dotClass: 'completed' }
];

export default function DashboardView({
  onAction,
  orders = [],
  onUpdateOrderStatus,
  onToggleStar,
  isSystemHalted,
  onHaltToggle,
  user
}) {
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragStart = (e, orderId) => {
    e.dataTransfer.setData('text/plain', orderId);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    if (dragOverColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const orderId = e.dataTransfer.getData('text/plain');
    if (orderId && onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, targetStatus);
    }
    setDragOverColumn(null);
  };

  return (
    <div className="main-content">
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="navbar-brand"></div>
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
              <div className="stat-number">{orders.filter(o => o.status !== 'Completed').length}</div>
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

        {/* Kanban Board Area */}
        <div className="kanban-board-wrapper">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 className="dashboard-section-title">Production Status Kanban Board</h3>
            <button className="btn-primary" onClick={() => onAction('new-order')}>
              <Plus size={16} />
              <span>New Order</span>
            </button>
          </div>

          <div className="kanban-container">
            {COLUMNS.map((column) => {
              const columnOrders = orders.filter(o => o.status === column.id);
              const isOver = dragOverColumn === column.id;

              return (
                <div
                  key={column.id}
                  className={`kanban-column col-${column.dotClass} ${isOver ? 'drag-over' : ''}`}
                  onDragOver={(e) => handleDragOver(e, column.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, column.id)}
                >
                  <div className="kanban-column-header">
                    <div className="kanban-column-title-wrapper">
                      <span className={`kanban-column-dot ${column.dotClass}`}></span>
                      <span className="kanban-column-title">{column.title}</span>
                    </div>
                    <span className="kanban-column-badge">{columnOrders.length}</span>
                  </div>

                  <div className="kanban-cards-list">
                    {columnOrders.map((order) => (
                      <div
                        key={order.id}
                        className="kanban-card"
                        draggable
                        onDragStart={(e) => handleDragStart(e, order.id)}
                      >
                        <div className="kanban-card-header">
                          <span className="kanban-card-id">{order.id}</span>
                          <span className={`priority-tag priority-${order.priority.toLowerCase()}`}>
                            {order.priority}
                          </span>
                        </div>
                        <div className="kanban-card-client">{order.clientName}</div>
                        <div className="kanban-card-price">
                          ₹{order.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="kanban-card-footer">
                          <span className="kanban-card-date">
                            <Calendar size={12} />
                            <span>{order.endDate}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <footer className="page-footer">
        2026@ Orion Studios
      </footer>
    </div>
  );
}
