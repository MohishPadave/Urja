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
  ArrowLeft,
  Package,
  ChevronDown
} from 'lucide-react';

function CustomSelect({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const normalizedOptions = options.map(opt => 
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find(opt => opt.value === value) || normalizedOptions[0];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        className="filter-select"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          backgroundColor: 'white',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          paddingRight: '1rem',
          backgroundImage: 'none'
        }}
      >
        <span>{selectedOption ? selectedOption.label : 'Select...'}</span>
        <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none', color: '#64748b' }} />
      </button>

      {isOpen && (
        <>
          <div 
            onClick={() => setIsOpen(false)} 
            style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 999 }} 
          />
          <ul style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.25rem',
            backgroundColor: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-lg)',
            maxHeight: '220px',
            overflowY: 'auto',
            zIndex: 1000,
            listStyle: 'none',
            padding: '0.5rem 0',
            margin: 0
          }}>
            {normalizedOptions.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                style={{
                  padding: '0.65rem 1rem',
                  fontSize: '0.9rem',
                  color: opt.value === value ? 'var(--primary-color)' : 'var(--text-main)',
                  fontWeight: opt.value === value ? 600 : 400,
                  backgroundColor: opt.value === value ? '#f1f5f9' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                onMouseLeave={(e) => e.target.style.backgroundColor = opt.value === value ? '#f1f5f9' : 'transparent'}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

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
  const [packagingMaterial, setPackagingMaterial] = useState('Cartridges (310ml)');
  const [packagingQuantity, setPackagingQuantity] = useState(500);

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
        batchWeight,
        packagingMaterial,
        packagingQuantity
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
          <div className="table-card" style={{ padding: '1.5rem', margin: 0, overflow: 'visible' }}>
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
          <div className="table-card" style={{ padding: '1.5rem', margin: 0, overflow: 'visible' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '1rem', color: '#1e293b' }}>
              <Layers size={18} style={{ color: 'var(--primary-color)' }} />
              2. Product Configuration
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Collection</label>
                <CustomSelect
                  options={[
                    { value: "Acrylic Sealants", label: "Acrylic Sealants" },
                    { value: "GP Sealants", label: "GP Sealants" },
                    { value: "Specialty Elastomers", label: "Specialty Elastomers" }
                  ]}
                  value={collection}
                  onChange={setCollection}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Product Line</label>
                <CustomSelect
                  options={[
                    { value: "URJA Fire Stop", label: "URJA Fire Stop (White, Gray, Black)" },
                    { value: "URJA High Temp", label: "URJA High Temperature (White, Gray, Black)" },
                    { value: "NEXO GP", label: "NEXO Seal GP Sealant (White, Gray, Black)" },
                    { value: "EXO GP", label: "EXO Seal GP Sealant (White, Gray, Black, 600ml)" },
                    { value: "NEXO DS", label: "NEXO Seal DS (White, Gray, Black)" }
                  ]}
                  value={productLine}
                  onChange={setProductLine}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>
                <Plus size={16} />
                <span>Add New Formula</span>
              </button>
            </div>
          </div>

          {/* 3. Packaging Configuration Section */}
          <div className="table-card" style={{ padding: '1.5rem', margin: 0, overflow: 'visible' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '1rem', color: '#1e293b' }}>
              <Package size={18} style={{ color: 'var(--primary-color)' }} />
              3. Packaging Configuration
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Packing Material</label>
                <CustomSelect
                  options={[
                    { value: "Cartridges (310ml)", label: "Cartridges (310ml)" },
                    { value: "Sausages (600ml)", label: "Sausages (600ml)" },
                    { value: "Pails (20kg)", label: "Pails (20kg)" },
                    { value: "Drums (200kg)", label: "Drums (200kg)" },
                    { value: "IBC Totes (1000kg)", label: "IBC Totes (1000kg)" },
                    { value: "Cartons", label: "Cartons" }
                  ]}
                  value={packagingMaterial}
                  onChange={setPackagingMaterial}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Quantity (kg)</label>
                <input
                  type="number"
                  className="filter-select"
                  style={{ width: '100%', backgroundColor: 'white', backgroundImage: 'none', paddingRight: '1rem' }}
                  value={packagingQuantity}
                  onChange={(e) => setPackagingQuantity(e.target.value)}
                  placeholder="e.g. 500"
                />
              </div>
            </div>
          </div>

          {/* 4. Production Schedule Section */}
          <div className="table-card" style={{ padding: '1.5rem', margin: 0 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '1rem', color: '#1e293b' }}>
              <Calendar size={18} style={{ color: 'var(--primary-color)' }} />
              4. Production Schedule
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

          {/* 5. Estimated Costs Section */}
          <div className="table-card" style={{ padding: '1.5rem', margin: 0 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '1rem', color: '#1e293b' }}>
              <Calculator size={18} style={{ color: 'var(--primary-color)' }} />
              5. Estimated Costs & Materials
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

          {/* 6. Product Formula (DS-88G) Section */}
          <div className="table-card" style={{ padding: '1.5rem', margin: 0 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '1rem', color: '#1e293b' }}>
              <Calculator size={18} style={{ color: 'var(--primary-color)' }} />
              6. Product Formula (DS-88G)
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
