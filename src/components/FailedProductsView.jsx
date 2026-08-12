import React, { useState } from 'react';
import { Search, AlertOctagon, Download, Bell, Globe } from 'lucide-react';

const mockFailedProducts = [
  { id: 'ORD-2023-8905', productName: 'URJA Fire Stop (Gray)', quantity: '1,200 kg', reason: 'Viscosity below threshold', date: '2023-10-24' },
  { id: 'ORD-2023-8918', productName: 'NEXO Seal DS (Black)', quantity: '400 kg', reason: 'Color pigment mismatch', date: '2023-10-29' },
  { id: 'ORD-2023-8929', productName: 'EXO Seal GP Sealant (White)', quantity: '800 kg', reason: 'Curing rate too slow', date: '2023-10-26' },
  { id: 'ORD-2023-8933', productName: 'URJA High Temperature (White)', quantity: '1,500 kg', reason: 'Incomplete polymerization', date: '2023-10-28' },
  { id: 'ORD-2023-8946', productName: 'NEXO Seal GP Sealant (Black)', quantity: '600 kg', reason: 'Skin-over time out of spec', date: '2023-10-25' }
];

export default function FailedProductsView({ user, orders = [] }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Extract discarded orders from active state
  const discardedOrders = orders
    .filter(order => order.status === 'Discarded')
    .map(order => ({
      id: order.id,
      productName: order.productDetails?.productLine || 'URJA Custom Sealant Blend',
      quantity: order.productDetails?.batchWeight ? `${order.productDetails.batchWeight.toLocaleString()} kg` : '1,000 kg',
      reason: 'Quality Control check failure in Testing phase',
      date: order.endDate || new Date().toISOString().split('T')[0]
    }));

  const allFailedProducts = [...discardedOrders, ...mockFailedProducts];

  const filteredFailed = allFailedProducts.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertOctagon style={{ color: '#ef4444' }} />
            Failed Products Quality Log
          </h1>
        </div>

        {/* Filters Card Bar */}
        <div className="filter-card">
          <div className="filters-left">
            <div className="search-input-wrapper">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by Order ID, Product, or QC Issue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <button className="btn-outline" onClick={() => alert('QC Log exported as CSV.')}>
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
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>QC Failure Reason</th>
                  <th>Log Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredFailed.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      No failed batches found.
                    </td>
                  </tr>
                ) : (
                  filteredFailed.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600 }}>{item.id}</td>
                      <td style={{ fontWeight: 500 }}>{item.productName}</td>
                      <td style={{ fontWeight: 600, color: '#ef4444' }}>{item.quantity}</td>
                      <td>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          backgroundColor: '#fef2f2',
                          color: '#b91c1c',
                          border: '1px solid #fee2e2',
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}>
                          {item.reason}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>{item.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="table-footer">
            <div className="footer-text">
              Showing 1-{filteredFailed.length} of {allFailedProducts.length} QC logs
            </div>
          </div>
        </div>
      </div>

      <footer className="page-footer">
        2026@ Orion Studios
      </footer>
    </div>
  );
}
