import React, { useState } from 'react';
import {
  Search,
  Plus,
  Calendar,
  Calculator,
  Layers,
  UserCheck,
  Sparkles,
  Check,
  ArrowLeft
} from 'lucide-react';

export default function CreateOrderView({ onSave, onCancel, clients }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState({
    id: 'CLI-8992',
    name: 'Apex Construction Materials',
    terms: 'Net 30',
    shipping: '1200 Industrial Pkwy, Chicago, IL 60601'
  });

  const [collection, setCollection] = useState('Polyurethane Sealants (High-Modulus)');
  const [productLine, setProductLine] = useState('DuraSeal Pro - Grey (DS-88G)');
  const [startDate, setStartDate] = useState('2026-08-12');
  const [endDate, setEndDate] = useState('2026-08-19');

  // Formula batch calculation state
  const [batchWeight, setBatchWeight] = useState(1000);

  // Materials formula breakdown matching screenshot
  const baseFormula = [
    { name: 'Polyether Polyol (Base)', percentage: 0.45 },
    { name: 'Calcium Carbonate (Filler)', percentage: 0.30 },
    { name: 'Diisodecyl Phthalate (Plasticizer)', percentage: 0.15 },
    { name: 'Titanium Dioxide (Pigment)', percentage: 0.05 },
    { name: 'Silane Coupling Agent', percentage: 0.05 }
  ];

  const handleCreate = () => {
    onSave({
      id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: selectedClient.name,
      startDate,
      endDate,
      price: 17250.00, // ₹14,800 + ₹2,450
      priority: 'Medium',
      status: 'Confirmed',
      starred: false,
      productDetails: {
        collection,
        productLine,
        batchWeight
      }
    });
  };

  return (
    <div className="main-content">
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button className="icon-btn" onClick={onCancel} style={{ padding: '0.25rem' }}>
            <ArrowLeft size={20} />
          </button>
          <span>New Order</span>
        </div>
      </header>

      {/* Main Container */}
      <div className="page-container" style={{ paddingBottom: '6rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 className="page-title">Create New Order</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Configure client details, product specifications, and scheduling for production.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* 1. Client Details Section */}
          <div className="table-card" style={{ padding: '1.5rem', margin: 0 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '1rem', color: '#1e293b' }}>
              <UserCheck size={18} style={{ color: 'var(--primary-color)' }} />
              1. Client Details
            </h3>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Search Client</label>
              <div className="search-input-wrapper">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Type to search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {selectedClient && (
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.25rem' }}>{selectedClient.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    ID: {selectedClient.id} • Terms: {selectedClient.terms}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Shipping: {selectedClient.shipping}
                  </p>
                </div>
                <button
                  className="btn-outline"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                  onClick={() => alert('Search matches: Apex Construction Materials (CLI-8992), Apex Sealants LLC (CLI-004)')}
                >
                  Change
                </button>
              </div>
            )}
          </div>

          {/* 2. Product Configuration Section */}
          <div className="table-card" style={{ padding: '1.5rem', margin: 0 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '1rem', color: '#1e293b' }}>
              <Layers size={18} style={{ color: 'var(--primary-color)' }} />
              2. Product Configuration
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Collection</label>
                <select
                  className="filter-select"
                  style={{ width: '100%', backgroundColor: 'white' }}
                  value={collection}
                  onChange={(e) => setCollection(e.target.value)}
                >
                  <option>Polyurethane Sealants (High-Modulus)</option>
                  <option>Silicone Sealants (Neutral Cure)</option>
                  <option>Acrylic Sealants (Painter Grade)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Product Line</label>
                <select
                  className="filter-select"
                  style={{ width: '100%', backgroundColor: 'white' }}
                  value={productLine}
                  onChange={(e) => setProductLine(e.target.value)}
                >
                  <option>DuraSeal Pro - Grey (DS-88G)</option>
                  <option>DuraSeal Pro - White (DS-88W)</option>
                  <option>Silco-Flex Clear (SF-22C)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>
                <Plus size={16} />
                <span>Add New Formula</span>
              </button>
            </div>
          </div>

          {/* 3. Production Schedule Section */}
          <div className="table-card" style={{ padding: '1.5rem', margin: 0 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '1rem', color: '#1e293b' }}>
              <Calendar size={18} style={{ color: 'var(--primary-color)' }} />
              3. Production Schedule
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Completion</label>
                <input
                  type="date"
                  className="form-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 4. Estimated Costs Section */}
          <div className="table-card" style={{ padding: '1.5rem', margin: 0 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '1rem', color: '#1e293b' }}>
              <Calculator size={18} style={{ color: 'var(--primary-color)' }} />
              4. Estimated Costs & Materials
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {/* Packaging Card */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    <Plus size={16} />
                    <span>Packaging Materials</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Total</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>₹2,450.00</div>
              </div>

              {/* Raw Materials Card */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    <Sparkles size={16} />
                    <span>Raw Materials Base</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Total</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>₹14,800.00</div>
              </div>
            </div>
          </div>

          {/* 5. Product Formula (DS-88G) Section */}
          <div className="table-card" style={{ padding: '1.5rem', margin: 0 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '1rem', color: '#1e293b' }}>
              <Calculator size={18} style={{ color: 'var(--primary-color)' }} />
              5. Product Formula (DS-88G)
            </h3>

            <div className="table-wrapper">
              <table className="custom-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Raw Material</th>
                    <th>Quantity (kg)</th>
                    <th>Percentage (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {baseFormula.map((item, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 500 }}>{item.name}</td>
                      <td style={{ fontWeight: 600 }}>{(batchWeight * item.percentage).toFixed(1)}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{Math.round(item.percentage * 100)}%</td>
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: '#f1f5f9', fontWeight: 700 }}>
                    <td>Total Batch Weight</td>
                    <td>{batchWeight.toFixed(1)} kg</td>
                    <td>100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Footer Panel */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '260px',
        right: 0,
        height: '70px',
        backgroundColor: 'white',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 2rem',
        gap: '1rem',
        zIndex: 90
      }}>
        <button className="btn-outline" style={{ minWidth: '100px' }} onClick={onCancel}>
          Cancel
        </button>
        <button className="btn-primary" style={{ minWidth: '150px', backgroundColor: '#0c4f8a' }} onClick={handleCreate}>
          <Check size={16} />
          <span>Create Order</span>
        </button>
      </div>
    </div>
  );
}
