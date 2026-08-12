import React, { useState } from 'react';
import { Search, Star, Eye, Bell, Globe } from 'lucide-react';

export default function InventoryView({ 
  inventoryItems, 
  onToggleStar, 
  onViewDetails,
  user 
}) {
  const [activeTab, setActiveTab] = useState('Raw Materials');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [criticalOnly, setCriticalOnly] = useState(false);

  const categories = ['All', 'Resins', 'Silicone', 'Curing Agents', 'Emulsions', 'Additives', 'Containers', 'Boxes'];

  const filteredItems = inventoryItems.filter(item => {
    // Filter by raw vs packaging materials
    const isRaw = item.type === 'Raw';
    if (activeTab === 'Raw Materials' && !isRaw) return false;
    if (activeTab === 'Packaging Materials' && isRaw) return false;

    // Filter by search term
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    // Filter by Category
    if (categoryFilter !== 'All' && item.category !== categoryFilter) return false;

    // Filter by Critical Status Only
    if (criticalOnly && item.status !== 'Critical') return false;

    return true;
  });

  return (
    <div className="main-content">
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="navbar-brand">Inventory Desk</div>
        <div className="navbar-actions">
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
          <h1 className="page-title">Inventory Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="tabs-nav">
          <button 
            className={`tab-item ${activeTab === 'Raw Materials' ? 'active' : ''}`}
            onClick={() => setActiveTab('Raw Materials')}
          >
            Raw Materials
          </button>
          <button 
            className={`tab-item ${activeTab === 'Packaging Materials' ? 'active' : ''}`}
            onClick={() => setActiveTab('Packaging Materials')}
          >
            Packaging Materials
          </button>
        </div>

        {/* Filter Card */}
        <div className="filter-card">
          <div className="filters-left">
            <div className="search-input-wrapper">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search by name or ID" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            <label className="checkbox-wrapper">
              <input 
                type="checkbox" 
                checked={criticalOnly}
                onChange={(e) => setCriticalOnly(e.target.checked)}
              />
              <Star size={16} className="star-icon" style={{ fill: '#f59e0b', stroke: '#f59e0b' }} />
              <span>Critical Only</span>
            </label>
          </div>
        </div>

        {/* Table Card */}
        <div className="table-card">
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}></th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Threshold</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      No items match the filter settings.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr 
                      key={item.id}
                      className={item.status === 'Critical' ? 'row-critical' : item.status === 'Low Stock' ? 'row-low-stock' : ''}
                    >
                      <td>
                        <Star 
                          size={18} 
                          className={item.starred ? 'star-icon' : 'star-empty'}
                          onClick={() => onToggleStar(item.id)}
                        />
                      </td>
                      <td style={{ fontWeight: 600 }}>{item.id}</td>
                      <td style={{ fontWeight: 700 }}>{item.name}</td>
                      <td style={{ fontWeight: 600 }}>
                        {item.quantity.toLocaleString()} {item.unit}
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>
                        {item.threshold.toLocaleString()} {item.unit}
                      </td>
                      <td>
                        <span className={`badge badge-${item.status.toLowerCase().replace(' ', '-')}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-table-action" onClick={() => onViewDetails('inventory', item)}>
                          <Eye size={14} />
                          <span>Details</span>
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
              Showing 1-{filteredItems.length} of {inventoryItems.length} items
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
    </div>
  );
}
