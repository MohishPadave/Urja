import React, { useState } from 'react';
import { Search, Eye, Plus, Bell, Globe, SlidersHorizontal, Download, Calendar } from 'lucide-react';

export default function ClientsView({
  clients,
  onAddClient,
  onViewDetails,
  user
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [ordersCount, setOrdersCount] = useState('0');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name || !company) return;
    const newId = `CLI-0${clients.length + 1}`;
    onAddClient({
      id: newId,
      name,
      company,
      orders: parseInt(ordersCount) || 0
    });
    setName('');
    setCompany('');
    setOrdersCount('0');
    setIsModalOpen(false);
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase());
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

      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Clients</h1>
          <button className="btn-primary" style={{ backgroundColor: 'var(--bg-sidebar)' }} onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            <span>Add New Client</span>
          </button>
        </div>

        {/* Filter Card */}
        <div className="filter-card">
          <div className="filters-left">
            <div className="search-input-wrapper">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search clients by name, ID, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn-outline" onClick={() => alert('Filter options opened')}>
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>
            <button className="btn-outline" onClick={() => alert('Select date range')}>
              <Calendar size={16} />
              <span>Date Range</span>
            </button>
          </div>

          <button className="btn-outline" onClick={() => alert('Clients list exported as CSV.')}>
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
                  <th>Client ID</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>No. of Orders</th>
                  <th style={{ textAlign: 'center' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td style={{ fontWeight: 600 }}>{client.id}</td>
                    <td style={{ fontWeight: 700 }}>{client.name}</td>
                    <td>{client.company}</td>
                    <td>
                      <span style={{
                        backgroundColor: '#1e3a8a',
                        color: 'white',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '700'
                      }}>
                        {client.orders}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="btn-table-action" onClick={() => onViewDetails('client', client)}>
                        <Eye size={14} />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="table-footer">
            <div className="footer-text">
              Showing 1-{filteredClients.length} of {clients.length} clients
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

      {/* Add Client Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">Add New Client</h3>
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
                    placeholder="e.g. Sarah Jenkins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Apex Manufacturing"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Initial Orders Count</label>
                  <input
                    type="number"
                    className="form-input"
                    value={ordersCount}
                    onChange={(e) => setOrdersCount(e.target.value)}
                    min="0"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Client</button>
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
