import React, { useState } from 'react';
import { Star, Edit, ChevronRight, ArrowLeft, Bell, Globe, CheckCircle2, Timer } from 'lucide-react';

export default function OrderDetailView({ order, onBack, onToggleStar, user }) {
  const [activeTab, setActiveTab] = useState('Order Info');

  // Formula Breakdown database matching the screenshot
  const formulaBreakdown = [
    { id: 'RM-092', name: 'Polyurethane Base Resin', ratio: 45.0, volume: 2250, status: 'Allocated' },
    { id: 'RM-115', name: 'Calcium Carbonate Filler', ratio: 30.0, volume: 1500, status: 'Allocated' },
    { id: 'RM-204', name: 'Plasticizer (Diisodecyl Phthalate)', ratio: 15.0, volume: 750, status: 'Pending' },
    { id: 'RM-055', name: 'Grey Pigment Paste', ratio: 10.0, volume: 500, status: 'Allocated' }
  ];

  return (
    <div className="main-content">
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button className="icon-btn" onClick={onBack} style={{ padding: '0.25rem' }}>
            <ArrowLeft size={20} />
          </button>
          <span>Order Details</span>
        </div>
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

      {/* Main Page Area */}
      <div className="page-container" style={{ paddingBottom: '4rem' }}>
        
        {/* Breadcrumbs */}
        <div className="breadcrumbs-row">
          <span onClick={onBack}>Orders</span>
          <ChevronRight size={14} />
          <span className="active">{order.id}</span>
        </div>

        {/* Order Header Card */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <h1 className="page-title" style={{ margin: 0 }}>Order #{order.id}</h1>
              
              <span className={`priority-tag priority-medium`} style={{ backgroundColor: '#ea580c', borderRadius: '6px', padding: '0.25rem 0.6rem' }}>
                High Priority
              </span>
              
              <Star 
                size={22} 
                className={order.starred ? 'star-icon' : 'star-empty'}
                style={{ cursor: 'pointer' }}
                onClick={() => onToggleStar(order.id)}
              />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Client: <strong>{order.clientName}</strong>
            </p>
          </div>

          <button className="btn-primary" style={{ backgroundColor: '#0c4f8a' }} onClick={() => alert('Editing Order specs.')}>
            <Edit size={16} />
            <span>Edit Order</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="tabs-nav">
          <button 
            className={`tab-item ${activeTab === 'Order Info' ? 'active' : ''}`}
            onClick={() => setActiveTab('Order Info')}
          >
            Order Info
          </button>
          <button 
            className={`tab-item ${activeTab === 'Progress Timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('Progress Timeline')}
          >
            Progress Timeline
          </button>
        </div>

        {/* Tab 1: Order Info */}
        {activeTab === 'Order Info' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
              
              {/* Order Summary */}
              <div className="table-card" style={{ padding: '1.5rem', margin: 0 }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '1.25rem', color: '#1e293b', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#10b981' }} />
                  Order Summary
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Product</span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#334155', marginTop: '0.25rem' }}>Industrial Polyurethane Sealant X-900</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Quantity</span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#334155', marginTop: '0.25rem' }}>5,000 Liters (250 Drums)</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Target Delivery</span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#334155', marginTop: '0.25rem' }}>Oct 15, 2023</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Total Value</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-color)', marginTop: '0.25rem' }}>
                      ${order.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                    </h4>
                  </div>
                </div>
              </div>

              {/* Custom Specs */}
              <div className="table-card" style={{ padding: '1.5rem', margin: 0 }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '1.25rem', color: '#1e293b', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  Custom Specs
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Color Grade</span>
                    <strong style={{ color: '#334155' }}>Concrete Grey (RAL 7023)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Viscosity</span>
                    <strong style={{ color: '#334155' }}>High (Non-sag)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Cure Time</span>
                    <strong style={{ color: '#334155' }}>Accelerated</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Formula Breakdown */}
            <div className="table-card" style={{ margin: 0 }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
                  Formula Breakdown
                </h3>
              </div>
              <div className="table-wrapper">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Material ID</th>
                      <th>Component Name</th>
                      <th style={{ textAlign: 'right' }}>Ratio (%)</th>
                      <th style={{ textAlign: 'right' }}>Required Vol (L)</th>
                      <th style={{ textAlign: 'center' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formulaBreakdown.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 600 }}>{item.id}</td>
                        <td style={{ fontWeight: 500 }}>{item.name}</td>
                        <td style={{ textAlign: 'right' }}>{item.ratio.toFixed(1)}%</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{item.volume.toLocaleString()} L</td>
                        <td style={{ textAlign: 'center' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            backgroundColor: item.status === 'Allocated' ? '#d1fae5' : '#fef3c7',
                            color: item.status === 'Allocated' ? '#065f46' : '#92400e'
                          }}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Progress Timeline */}
        {activeTab === 'Progress Timeline' && (
          <div className="table-card" style={{ padding: '2rem', margin: 0 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '2rem', color: '#1e293b' }}>Production Milestones</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', paddingLeft: '2rem' }}>
              <div style={{ position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px', backgroundColor: '#e2e8f0' }}></div>
              
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-27px', top: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContents: 'center' }}></div>
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Raw Materials Allocated</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>All materials except Plasticizers loaded into Mixing Bay #3. Oct 24, 2023 - 08:30 AM</p>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-27px', top: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#3b82f6', display: 'flex', alignItems: 'center', justifyContents: 'center' }}></div>
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Mixing Cycle Started</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Automated high-shear mixing process configured for DuraSeal Pro specs. Oct 24, 2023 - 10:15 AM</p>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-27px', top: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContents: 'center' }}></div>
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-light)' }}>Quality Testing Approval</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Viscosity and moisture-cure tests pending. Est. Oct 26, 2023</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
