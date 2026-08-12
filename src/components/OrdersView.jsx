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
  Globe
} from 'lucide-react';

export default function OrdersView({
  orders,
  onAddOrder,
  onToggleStar,
  onViewDetails,
  onCreateOrderClick,
  user
}) {
  const [activeTab, setActiveTab] = useState('Active Orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [clientName, setClientName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');
  const [priority, setPriority] = useState('Medium');

  const tabs = ['Active Orders', 'Completed', 'Drafts', 'Cancellations'];

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
      status: activeTab === 'Active Orders' ? 'Active' : activeTab,
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
    if (activeTab === 'Active Orders' && ['Completed', 'Draft', 'Cancelled'].includes(order.status)) return false;
    if (activeTab === 'Completed' && order.status !== 'Completed') return false;
    if (activeTab === 'Drafts' && order.status !== 'Draft') return false;
    if (activeTab === 'Cancellations' && order.status !== 'Cancelled') return false;

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
                  <th>Details</th>
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
                  filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 600 }}>{order.id}</td>
                      <td style={{ fontWeight: 500 }}>{order.clientName}</td>
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
                        <button className="btn-table-action" onClick={() => onViewDetails('order', order)}>
                          <Eye size={14} />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))
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
