import React, { useState } from 'react';
import { Search, Plus, SlidersHorizontal, Eye, Bell, Globe, Calendar, Download } from 'lucide-react';

export default function SuppliersView({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [division, setDivision] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [activeOrders, setActiveOrders] = useState('0');

  const initialSuppliers = [
    { id: 'SUP-1042', name: 'ChemCorp Industries', division: 'Polymer Resins Division', phone: '+1 (555) 019-2834', email: 'orders@chemcorp.com', activeOrders: 3, category: 'Resins' },
    { id: 'SUP-2011', name: 'Global Silanes Corp', division: 'Specialty Siloxanes', phone: '+1 (555) 043-9921', email: 'supply@globalsilanes.com', activeOrders: 1, category: 'Silicone' },
    { id: 'SUP-3088', name: 'Catalyst Chemical Partners', division: 'Amine Cure Systems', phone: '+1 (555) 088-7612', email: 'logistics@catalystpartners.net', activeOrders: 0, category: 'Curing Agents' }
  ];

  const [suppliers, setSuppliers] = useState(initialSuppliers);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!companyName) return;
    const newId = `SUP-${Math.floor(1000 + Math.random() * 9000)}`;
    setSuppliers([
      ...suppliers,
      {
        id: newId,
        name: companyName,
        division: division || 'General Raw Materials',
        phone: phone || '+1 (555) 000-0000',
        email: email || 'contact@supplier.com',
        activeOrders: parseInt(activeOrders) || 0,
        category: categoryFilter !== 'All' ? categoryFilter : 'Other'
      }
    ]);
    setCompanyName('');
    setDivision('');
    setPhone('');
    setEmail('');
    setActiveOrders('0');
    setIsModalOpen(false);
  };

  const filteredSuppliers = suppliers.filter(sup => {
    const matchesSearch =
      sup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sup.id.toLowerCase().includes(searchTerm.toLowerCase());
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
          <div>
            <h1 className="page-title">Suppliers</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Manage vendor relationships and raw material sourcing.
            </p>
          </div>
          <button className="btn-secondary" style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }} onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            <span>Add New Supplier</span>
          </button>
        </div>

        {/* Filter Card */}
        <div className="filter-card">
          <div className="filters-left">
            <div className="search-input-wrapper">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search suppliers by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Resins">Resins</option>
              <option value="Silicone">Silicone</option>
              <option value="Curing Agents">Curing Agents</option>
            </select>

            <button className="btn-outline" onClick={() => alert('Filter options opened')}>
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>
            <button className="btn-outline" onClick={() => alert('Select date range')}>
              <Calendar size={16} />
              <span>Date Range</span>
            </button>
          </div>

          <button className="btn-outline" onClick={() => alert('Suppliers list exported as CSV.')}>
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
                  <th>Supplier ID</th>
                  <th>Name / Company</th>
                  <th>Contact Info</th>
                  <th>Current Orders</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((sup) => (
                  <tr key={sup.id}>
                    <td style={{ fontWeight: 600 }}>{sup.id}</td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#1e293b' }}>{sup.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sup.division}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{sup.phone}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sup.email}</div>
                    </td>
                    <td>
                      {sup.activeOrders > 0 ? (
                        <span className="badge badge-mixing">
                          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563eb', marginRight: '6px' }}></span>
                          {sup.activeOrders} Active
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>No active orders</span>
                      )}
                    </td>
                    <td>
                      <button className="btn-table-action" onClick={() => alert(`Details for ${sup.name}: Active contract under Net 30 payment terms.`)}>
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
              Showing 1-{filteredSuppliers.length} of 24 suppliers
            </div>
            <div className="pagination-wrapper">
              <button className="pagination-btn" disabled>&lt;</button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <span style={{ margin: '0 0.5rem', color: 'var(--text-light)' }}>...</span>
              <button className="pagination-btn">&gt;</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Supplier Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">Add New Supplier</h3>
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
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. ChemCorp Industries"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Division / Area</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Polymer Resins Division"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. +1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="e.g. orders@chemcorp.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Supplier</button>
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
