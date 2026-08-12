import React, { useState } from 'react';
import { Search, Star, Eye, Bell, Globe, Calendar, SlidersHorizontal, Download, ChevronDown, Plus } from 'lucide-react';

export default function InventoryView({
  inventoryItems,
  onToggleStar,
  onViewDetails,
  user,
  onAddMaterial
}) {
  const [activeTab, setActiveTab] = useState('Raw Materials');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [criticalOnly, setCriticalOnly] = useState(false);
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMaterialName, setNewMaterialName] = useState('');
  const [newMaterialType, setNewMaterialType] = useState('Raw'); // 'Raw' or 'Packaging'
  const [newMaterialCategory, setNewMaterialCategory] = useState('Resins');
  const [newMaterialQuantity, setNewMaterialQuantity] = useState('');
  const [newMaterialThreshold, setNewMaterialThreshold] = useState('');
  const [newMaterialUnit, setNewMaterialUnit] = useState('kg');

  const handleAddMaterialSubmit = (e) => {
    e.preventDefault();
    if (!newMaterialName || !newMaterialQuantity || !newMaterialThreshold) return;

    const qty = parseFloat(newMaterialQuantity) || 0;
    const threshold = parseFloat(newMaterialThreshold) || 0;
    const isRaw = newMaterialType === 'Raw';
    const randomIdNum = Math.floor(1000 + Math.random() * 9000);
    const generatedId = isRaw ? `RM-${randomIdNum}` : `PM-${randomIdNum}`;

    let status = 'Healthy';
    if (qty <= threshold * 0.2) {
      status = 'Critical';
    } else if (qty < threshold) {
      status = 'Low Stock';
    }

    const newItem = {
      id: generatedId,
      name: newMaterialName,
      quantity: qty,
      threshold: threshold,
      status: status,
      unit: newMaterialUnit,
      category: newMaterialCategory,
      type: newMaterialType,
      starred: false,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    onAddMaterial && onAddMaterial(newItem);

    // Reset Form
    setNewMaterialName('');
    setNewMaterialType('Raw');
    setNewMaterialCategory('Resins');
    setNewMaterialQuantity('');
    setNewMaterialThreshold('');
    setNewMaterialUnit('kg');
    setIsModalOpen(false);
  };

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

    // Filter by Low Stock Status Only
    if (lowStockOnly && item.status !== 'Low Stock') return false;

    // Filter by Date Range
    if (startDate && item.lastUpdated && item.lastUpdated < startDate) return false;
    if (endDate && item.lastUpdated && item.lastUpdated > endDate) return false;

    return true;
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Quantity', 'Threshold', 'Status'];
    const rows = filteredItems.map(item => [
      item.id,
      item.name,
      `${item.quantity} ${item.unit}`,
      `${item.threshold} ${item.unit}`,
      item.status
    ]);
    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `inventory_export_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

      {/* Main Area */}
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Inventory Dashboard</h1>
          <button className="btn-primary" style={{ backgroundColor: 'var(--bg-sidebar)' }} onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            <span>Add New Raw Material</span>
          </button>
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
                placeholder="Search inventory items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="custom-dropdown-container" style={{ position: 'relative', display: 'inline-block' }}>
              <button
                className="btn-outline"
                style={{
                  minWidth: '160px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'white',
                  height: '38px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  padding: '0 1rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-main)',
                  cursor: 'pointer'
                }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{categoryFilter === 'All' ? 'All Categories' : categoryFilter}</span>
                <ChevronDown size={16} style={{ color: 'var(--text-light)' }} />
              </button>
              {isDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  zIndex: 100,
                  minWidth: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0.5rem 0',
                  maxHeight: '260px',
                  overflowY: 'auto'
                }}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      style={{
                        padding: '0.6rem 1rem',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        color: 'var(--text-main)',
                        backgroundColor: categoryFilter === cat ? '#f1f5f9' : 'transparent',
                        fontWeight: categoryFilter === cat ? '600' : '400',
                        width: '100%',
                        transition: 'background-color var(--transition-fast)'
                      }}
                      onClick={() => {
                        setCategoryFilter(cat);
                        setIsDropdownOpen(false);
                      }}
                      onMouseEnter={(e) => { if (categoryFilter !== cat) e.target.style.backgroundColor = '#f8fafc'; }}
                      onMouseLeave={(e) => { if (categoryFilter !== cat) e.target.style.backgroundColor = 'transparent'; }}
                    >
                      {cat === 'All' ? 'All Categories' : cat}
                    </button>
                  ))}
                </div>
              )}
            </div>


            <button
              className={`btn-outline ${showFilterPanel ? 'active' : ''}`}
              style={showFilterPanel ? { backgroundColor: '#f1f5f9', borderColor: 'var(--border-focus)' } : {}}
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>
            <div className="custom-dropdown-container" style={{ position: 'relative', display: 'inline-block' }}>
              <button
                className={`btn-outline ${isDatePickerOpen ? 'active' : ''}`}
                style={isDatePickerOpen ? { backgroundColor: '#f1f5f9', borderColor: 'var(--border-focus)' } : {}}
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              >
                <Calendar size={16} />
                <span>{startDate || endDate ? `${startDate || 'Start'} to ${endDate || 'End'}` : 'Date Range'}</span>
              </button>
              {isDatePickerOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  zIndex: 100,
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  minWidth: '240px'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)', textAlign: 'left' }}>START DATE</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.875rem', width: '100%' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)', textAlign: 'left' }}>END DATE</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.875rem', width: '100%' }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.25rem' }}>
                    {(startDate || endDate) && (
                      <button
                        className="btn-outline"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', height: 'auto' }}
                        onClick={() => {
                          setStartDate('');
                          setEndDate('');
                          setIsDatePickerOpen(false);
                        }}
                      >
                        Reset
                      </button>
                    )}
                    <button
                      className="btn-primary"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', height: 'auto', backgroundColor: 'var(--bg-sidebar)' }}
                      onClick={() => setIsDatePickerOpen(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button className="btn-outline" onClick={handleExportCSV}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>

        {showFilterPanel && (
          <div className="filter-card" style={{ marginTop: '-0.75rem', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none', display: 'flex', gap: '2rem', padding: '1rem 1.5rem', animation: 'slideDown 0.2s ease-out' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={criticalOnly}
                onChange={(e) => setCriticalOnly(e.target.checked)}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)' }}>Critical Status Only</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={lowStockOnly}
                onChange={(e) => setLowStockOnly(e.target.checked)}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)' }}>Low Stock Only</span>
            </label>
          </div>
        )}

        {/* Table Card */}
        <div className="table-card">
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
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
                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      No items match the filter settings.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className={item.status === 'Critical' ? 'row-critical' : item.status === 'Low Stock' ? 'row-low-stock' : item.status === 'Healthy' ? 'row-healthy' : ''}
                    >
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
        {/* Add New Inventory Item Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-container" style={{ maxWidth: '480px' }}>
              <div className="modal-header">
                <h3 className="modal-title">Add Inventory Item</h3>
                <button
                  style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
                  onClick={() => setIsModalOpen(false)}
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleAddMaterialSubmit}>
                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  <div className="form-group">
                    <label className="form-label">Item Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Acrysol-35 Emulsion"
                      value={newMaterialName}
                      onChange={(e) => setNewMaterialName(e.target.value)}
                      required
                      style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Type</label>
                      <select
                        className="filter-select"
                        style={{ width: '100%', backgroundColor: 'white' }}
                        value={newMaterialType}
                        onChange={(e) => {
                          setNewMaterialType(e.target.value);
                          setNewMaterialCategory(e.target.value === 'Raw' ? 'Resins' : 'Containers');
                          setNewMaterialUnit(e.target.value === 'Raw' ? 'kg' : 'Units');
                        }}
                      >
                        <option value="Raw">Raw Material</option>
                        <option value="Packaging">Packaging</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Category</label>
                      {newMaterialType === 'Raw' ? (
                        <select
                          className="filter-select"
                          style={{ width: '100%', backgroundColor: 'white' }}
                          value={newMaterialCategory}
                          onChange={(e) => setNewMaterialCategory(e.target.value)}
                        >
                          <option value="Resins">Resins</option>
                          <option value="Emulsions">Emulsions</option>
                          <option value="Additives">Additives</option>
                          <option value="Curing Agents">Curing Agents</option>
                        </select>
                      ) : (
                        <select
                          className="filter-select"
                          style={{ width: '100%', backgroundColor: 'white' }}
                          value={newMaterialCategory}
                          onChange={(e) => setNewMaterialCategory(e.target.value)}
                        >
                          <option value="Containers">Containers</option>
                          <option value="Boxes">Boxes</option>
                          <option value="Pallets">Pallets</option>
                        </select>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Initial Quantity</label>
                      <input
                        type="number"
                        className="form-input"
                        value={newMaterialQuantity}
                        onChange={(e) => setNewMaterialQuantity(e.target.value)}
                        placeholder="e.g. 1000"
                        required
                        style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Low Stock Threshold</label>
                      <input
                        type="number"
                        className="form-input"
                        value={newMaterialThreshold}
                        onChange={(e) => setNewMaterialThreshold(e.target.value)}
                        placeholder="e.g. 200"
                        required
                        style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Measurement Unit</label>
                    <select
                      className="filter-select"
                      style={{ width: '100%', backgroundColor: 'white' }}
                      value={newMaterialUnit}
                      onChange={(e) => setNewMaterialUnit(e.target.value)}
                    >
                      <option value="kg">kg (Kilogram)</option>
                      <option value="L">L (Liter)</option>
                      <option value="Units">Units</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1.25rem' }}>
                  <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn-primary" style={{ backgroundColor: 'var(--primary-color)' }}>Add Item</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <footer className="page-footer">
          2026@ Orion Studios
        </footer>
      </div>
    </div>
  );
}
