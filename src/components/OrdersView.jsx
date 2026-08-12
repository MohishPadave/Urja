import React, { useState } from 'react';
import {
  Search,
  Plus,
  SlidersHorizontal,
  Calendar,
  Download,
  Star,
  Eye,
  Bell,
  Globe,
  Play,
  FlaskConical,
  Box,
  CheckCircle,
  RotateCw,
  Trash2
} from 'lucide-react';

export default function OrdersView({
  orders,
  onAddOrder,
  onToggleStar,
  onViewDetails,
  onCreateOrderClick,
  user,
  onUpdateOrderStatus
}) {
  const [activeTab, setActiveTab] = useState('Confirmed');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [clientName, setClientName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');
  const [priority, setPriority] = useState('Medium');

  const tabs = ['Confirmed', 'In Production', 'Testing', 'Packaging', 'Completed'];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!clientName || !startDate || !endDate || !price) return;
    const newId = `ORD-2026-${8900 + orders.length + 1}`;
    onAddOrder({
      id: newId,
      clientName,
      startDate,
      endDate,
      price: parseFloat(price) || 0,
      priority,
      status: 'Confirmed',
      starred: false
    });
    setClientName('');
    setStartDate('');
    setEndDate('');
    setPrice('');
    setIsModalOpen(false);
  };

  const filteredOrders = orders.filter(order => {
    // Filter by tab
    if (order.status !== activeTab) return false;

    // Filter by search
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

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

      {/* Main Area */}
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Orders Management</h1>
          <button className="btn-primary" onClick={onCreateOrderClick}>
            <Plus size={18} />
            <span>New Order</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters Card Bar */}
        <div className="filter-card">
          <div className="filters-left">
            <div className="search-input-wrapper">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search orders by ID, Client, or Product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn-outline">
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>
            <button className="btn-outline">
              <Calendar size={16} />
              <span>Date Range</span>
            </button>
          </div>

          <button className="btn-outline" onClick={() => alert('Orders exported as CSV.')}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Table Card */}
        <div className="table-card">
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Client Name</th>
                  <th>Start Date</th>
                  <th>Est. End Date</th>
                  <th>Price</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      No orders found matching the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, index) => {
                    const isSuggested = activeTab === 'Confirmed' && index < 4;
                    const getNextStageInfo = (status) => {
                      switch (status) {
                        case 'Confirmed': return { next: 'In Production', label: 'Start Production', icon: Play, color: '#16a34a', bg: '#dcfce7', border: '#bbf7d0' };
                        case 'In Production': return { next: 'Testing', label: 'Quality Test', icon: FlaskConical, color: '#2563eb', bg: '#dbeafe', border: '#93c5fd' };
                        case 'Testing': return { next: 'Packaging', label: 'Pack', icon: Box, color: '#8b5cf6', bg: '#faf5ff', border: '#e9d5ff' };
                        case 'Packaging': return { next: 'Completed', label: 'Complete', icon: CheckCircle, color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' };
                        default: return null;
                      }
                    };
                    const nextStage = getNextStageInfo(order.status);

                    return (
                      <tr key={order.id} style={isSuggested ? { backgroundColor: '#f0fdf4' } : {}}>
                        <td style={{ fontWeight: 600 }}>{order.id}</td>
                        <td style={{ fontWeight: 500 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <span>{order.clientName}</span>
                            {isSuggested && (
                              <span style={{
                                padding: '0.15rem 0.5rem',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                borderRadius: '4px',
                                backgroundColor: '#dcfce7',
                                color: '#16a34a',
                                border: '1px solid #bbf7d0',
                                whiteSpace: 'nowrap'
                              }}>
                                Can move to production
                              </span>
                            )}
                          </div>
                        </td>
                        <td>{order.startDate}</td>
                        <td>{order.endDate}</td>
                        <td style={{ fontWeight: 600 }}>
                          ₹{order.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td>
                          <span className={`priority-tag priority-${order.priority.toLowerCase()}`}>
                            {order.priority}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button className="btn-table-action" onClick={() => onViewDetails('order', order)}>
                              <Eye size={14} />
                              <span>View</span>
                            </button>
                            {nextStage ? (
                              <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                                <button
                                  className="btn-table-action"
                                  style={{
                                    color: nextStage.color,
                                    backgroundColor: nextStage.bg,
                                    borderColor: nextStage.border,
                                    fontWeight: 600
                                  }}
                                  onClick={() => onUpdateOrderStatus && onUpdateOrderStatus(order.id, nextStage.next)}
                                >
                                  {(() => {
                                    const IconComp = nextStage.icon;
                                    return <IconComp size={14} />;
                                  })()}
                                  <span>{nextStage.label}</span>
                                </button>
                                {order.status === 'Testing' && (
                                  <>
                                    <button
                                      className="btn-table-action"
                                      style={{ color: '#0284c7', backgroundColor: '#f0f9ff', borderColor: '#bae6fd' }}
                                      onClick={() => {
                                        if (confirm(`Mark Batch ${order.id} as failed and flag it for blending? It will be logged in Failed Products.`)) {
                                          onUpdateOrderStatus && onUpdateOrderStatus(order.id, 'Failed');
                                        }
                                      }}
                                    >
                                      <RotateCw size={14} />
                                      <span>Blend</span>
                                    </button>
                                    <button
                                      className="btn-table-action"
                                      style={{ color: '#d97706', backgroundColor: '#fffbeb', borderColor: '#fde68a' }}
                                      onClick={() => alert(`Additives added to Batch ${order.id}`)}
                                    >
                                      <Plus size={14} />
                                      <span>Additive</span>
                                    </button>
                                    <button
                                      className="btn-table-action"
                                      style={{ color: '#dc2626', backgroundColor: '#fef2f2', borderColor: '#fecaca' }}
                                      onClick={() => {
                                        if (confirm(`Are you sure you want to discard Batch ${order.id}? It will be logged in Failed Products.`)) {
                                          onUpdateOrderStatus && onUpdateOrderStatus(order.id, 'Discarded');
                                        }
                                      }}
                                    >
                                      <Trash2 size={14} />
                                      <span>Discard</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            ) : (
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                fontSize: '0.8rem',
                                color: '#16a34a',
                                fontWeight: 600,
                                padding: '0.25rem 0.5rem',
                                backgroundColor: '#ecfdf5',
                                borderRadius: '4px',
                                border: '1px solid #a7f3d0'
                              }}>
                                <CheckCircle size={14} />
                                Done
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="table-footer">
            <div className="footer-text">
              Showing 1-{filteredOrders.length} of {orders.length} orders
            </div>
            <div className="pagination-wrapper">
              <button className="pagination-btn" disabled>&lt;</button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <span style={{ margin: '0 0.5rem', color: 'var(--text-light)' }}>...</span>
              <button className="pagination-btn">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Order Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">New Order Entry</h3>
              <button
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Client Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. BuildCorp Industries"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Est. End Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Price (₹ INR)</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="e.g. 45200"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select
                      className="filter-select"
                      style={{ width: '100%', minWidth: 'auto', backgroundColor: 'white' }}
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Create Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
          <footer className="page-footer">
            2026@ Orion Studios
          </footer>
        </div>
      );
}
