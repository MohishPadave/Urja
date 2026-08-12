import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  Calendar, 
  User, 
  Hash, 
  IndianRupee, 
  X, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  LogOut,
  ShoppingBag,
  ListOrdered,
  FileText
} from 'lucide-react';

// All product lines from the brand catalog
const ALL_PRODUCTS = [
  { id: 'PU-101', name: 'URJA Fire Stop - White', collection: 'Acrylic Sealants', unit: 'Cartridge 310ml' },
  { id: 'PU-101G', name: 'URJA Fire Stop - Gray', collection: 'Acrylic Sealants', unit: 'Cartridge 310ml' },
  { id: 'PU-101B', name: 'URJA Fire Stop - Black', collection: 'Acrylic Sealants', unit: 'Cartridge 310ml' },
  { id: 'PU-102', name: 'URJA High Temperature - White', collection: 'Acrylic Sealants', unit: 'Cartridge 310ml' },
  { id: 'PU-102G', name: 'URJA High Temperature - Gray', collection: 'Acrylic Sealants', unit: 'Cartridge 310ml' },
  { id: 'PU-102B', name: 'URJA High Temperature - Black', collection: 'Acrylic Sealants', unit: 'Cartridge 310ml' },
  { id: 'PU-201', name: 'NEXO Seal GP Sealant - White', collection: 'GP Sealants', unit: 'Cartridge 310ml' },
  { id: 'PU-201G', name: 'NEXO Seal GP Sealant - Gray', collection: 'GP Sealants', unit: 'Cartridge 310ml' },
  { id: 'PU-201B', name: 'NEXO Seal GP Sealant - Black', collection: 'GP Sealants', unit: 'Cartridge 310ml' },
  { id: 'PU-202', name: 'EXO Seal GP Sealant - White (600ml)', collection: 'GP Sealants', unit: 'Sausage 600ml' },
  { id: 'PU-202G', name: 'EXO Seal GP Sealant - Gray (600ml)', collection: 'GP Sealants', unit: 'Sausage 600ml' },
  { id: 'PU-202B', name: 'EXO Seal GP Sealant - Black (600ml)', collection: 'GP Sealants', unit: 'Sausage 600ml' },
  { id: 'PU-301', name: 'NEXO Seal DS - White', collection: 'Specialty Elastomers', unit: 'Cartridge 310ml' },
  { id: 'PU-301G', name: 'NEXO Seal DS - Gray', collection: 'Specialty Elastomers', unit: 'Cartridge 310ml' },
  { id: 'PU-301B', name: 'NEXO Seal DS - Black', collection: 'Specialty Elastomers', unit: 'Cartridge 310ml' },
];

export default function SalesDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [salesOrders, setSalesOrders] = useState([
    {
      id: 'SO-0001',
      productId: 'PU-201',
      productName: 'NEXO Seal GP Sealant - White',
      clientName: 'BuildCorp Industries',
      quantity: 500,
      quotation: 85000,
      orderDate: '2023-10-20',
      deliveryDate: '2023-11-05',
      status: 'Delivered'
    },
    {
      id: 'SO-0002',
      productId: 'PU-101',
      productName: 'URJA Fire Stop - White',
      clientName: 'Apex Construction',
      quantity: 200,
      quotation: 42000,
      orderDate: '2023-10-22',
      deliveryDate: '2023-11-10',
      status: 'In Transit'
    }
  ]);

  // Modal form state
  const [formClientName, setFormClientName] = useState('');
  const [formQuantity, setFormQuantity] = useState('');
  const [formQuotation, setFormQuotation] = useState('');
  const [formDeliveryDate, setFormDeliveryDate] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredProducts = ALL_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.collection.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group products by collection for display
  const collections = [...new Set(filteredProducts.map(p => p.collection))];

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!formClientName || !formQuantity || !formQuotation || !formDeliveryDate) return;

    const newOrder = {
      id: `SO-${String(salesOrders.length + 1).padStart(4, '0')}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      clientName: formClientName,
      quantity: parseInt(formQuantity),
      quotation: parseFloat(formQuotation),
      orderDate: todayStr,
      deliveryDate: formDeliveryDate,
      status: 'Pending'
    };

    setSalesOrders([newOrder, ...salesOrders]);
    setSelectedProduct(null);
    setFormClientName('');
    setFormQuantity('');
    setFormQuotation('');
    setFormDeliveryDate('');
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return { bg: '#fef3c7', color: '#92400e', border: '#fcd34d' };
      case 'In Transit': return { bg: '#dbeafe', color: '#1e40af', border: '#93c5fd' };
      case 'Delivered': return { bg: '#d1fae5', color: '#065f46', border: '#6ee7b7' };
      case 'Cancelled': return { bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' };
      default: return { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>

      {/* Top Header Bar */}
      <header style={{
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        padding: '0 2rem',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/urja-1.png" alt="Logo" style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'contain', backgroundColor: 'white' }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>Urja Sealants</div>
            <div style={{ fontSize: '0.65rem', opacity: 0.8, fontWeight: 500 }}>Sales Portal</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', opacity: 0.9 }}>
            <User size={16} />
            <span>{user?.name || 'Salesman'}</span>
          </div>
          <button
            onClick={onLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
              color: 'white', padding: '0.4rem 0.8rem', borderRadius: '6px',
              cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600
            }}
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 2rem',
        display: 'flex',
        gap: '0',
      }}>
        <button
          onClick={() => setActiveTab('products')}
          style={{
            padding: '0.9rem 1.5rem',
            border: 'none',
            borderBottom: activeTab === 'products' ? '3px solid var(--primary-color)' : '3px solid transparent',
            background: 'none',
            fontWeight: activeTab === 'products' ? 700 : 500,
            color: activeTab === 'products' ? 'var(--primary-color)' : 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          <ShoppingBag size={16} />
          Place New Order
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '0.9rem 1.5rem',
            border: 'none',
            borderBottom: activeTab === 'orders' ? '3px solid var(--primary-color)' : '3px solid transparent',
            background: 'none',
            fontWeight: activeTab === 'orders' ? 700 : 500,
            color: activeTab === 'orders' ? 'var(--primary-color)' : 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          <ListOrdered size={16} />
          Past Orders
          <span style={{
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '0.1rem 0.45rem',
            borderRadius: '9999px',
            marginLeft: '0.25rem'
          }}>
            {salesOrders.length}
          </span>
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '1.5rem 2rem', maxWidth: '1100px', width: '100%', margin: '0 auto' }}>

        {/* ======== TAB 1: PRODUCTS LIST ======== */}
        {activeTab === 'products' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-heading)', marginBottom: '0.25rem' }}>
                Select a Product
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Browse or search our catalog, then click a product to place an order.
              </p>
            </div>

            {/* Search Bar */}
            <div style={{
              position: 'relative',
              marginBottom: '1.5rem'
            }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input
                type="text"
                placeholder="Search products by name, collection, or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.75rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  backgroundColor: 'white',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>

            {/* Products Grid Grouped by Collection */}
            {collections.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
                <Package size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <p style={{ fontSize: '1rem', fontWeight: 600 }}>No products match your search.</p>
              </div>
            ) : (
              collections.map(collName => (
                <div key={collName} style={{ marginBottom: '1.75rem' }}>
                  <h3 style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--text-light)',
                    marginBottom: '0.75rem',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid var(--border-color)'
                  }}>
                    {collName}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {filteredProducts.filter(p => p.collection === collName).map(product => (
                      <button
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '1rem 1.25rem',
                          backgroundColor: 'white',
                          border: '1px solid var(--border-color)',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          textAlign: 'left',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--primary-color)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(42,25,107,0.08)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-color)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            width: '40px', height: '40px', borderRadius: '10px',
                            backgroundColor: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--primary-color)', flexShrink: 0
                          }}>
                            <Package size={20} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{product.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                              SKU: {product.id} • {product.unit}
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={18} style={{ color: 'var(--text-light)', flexShrink: 0 }} />
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* ======== TAB 2: PAST ORDERS ======== */}
        {activeTab === 'orders' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-heading)', marginBottom: '0.25rem' }}>
                Past Orders
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                View all orders you have submitted.
              </p>
            </div>

            {salesOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <FileText size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <p style={{ fontSize: '1rem', fontWeight: 600 }}>No orders placed yet.</p>
                <p style={{ fontSize: '0.85rem' }}>Switch to "Place New Order" to get started.</p>
              </div>
            ) : (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                <div className="table-wrapper">
                  <table className="custom-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Client</th>
                        <th style={{ textAlign: 'right' }}>Qty</th>
                        <th style={{ textAlign: 'right' }}>Quotation (₹)</th>
                        <th>Order Date</th>
                        <th>Delivery Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesOrders.map((order) => {
                        const sty = getStatusStyle(order.status);
                        return (
                          <tr key={order.id}>
                            <td style={{ fontWeight: 700 }}>{order.id}</td>
                            <td>
                              <div style={{ fontWeight: 600 }}>{order.productName}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.productId}</div>
                            </td>
                            <td style={{ fontWeight: 500 }}>{order.clientName}</td>
                            <td style={{ textAlign: 'right', fontWeight: 600 }}>{order.quantity.toLocaleString()}</td>
                            <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--primary-color)' }}>
                              ₹{order.quotation.toLocaleString('en-IN')}
                            </td>
                            <td style={{ color: 'var(--text-muted)' }}>{order.orderDate}</td>
                            <td style={{ color: 'var(--text-muted)' }}>{order.deliveryDate}</td>
                            <td>
                              <span style={{
                                padding: '0.25rem 0.65rem',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                backgroundColor: sty.bg,
                                color: sty.color,
                                border: `1px solid ${sty.border}`
                              }}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="page-footer">
        2026@ Orion Studios
      </footer>

      {/* ======== ORDER MODAL POPUP ======== */}
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a', fontFamily: 'var(--font-heading)', marginBottom: '0.15rem' }}>
                  Place Order
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedProduct.name}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  border: '1px solid var(--border-color)', backgroundColor: '#f8fafc',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleOrderSubmit}>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                {/* Product Info Card */}
                <div style={{
                  padding: '0.85rem 1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    backgroundColor: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--primary-color)'
                  }}>
                    <Package size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{selectedProduct.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      SKU: {selectedProduct.id} • {selectedProduct.unit}
                    </div>
                  </div>
                </div>

                {/* Auto-filled Order Date */}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.4rem' }}>
                    <Clock size={14} />
                    Date of Order (auto-filled)
                  </label>
                  <input
                    type="date"
                    value={todayStr}
                    disabled
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      backgroundColor: '#f1f5f9',
                      color: 'var(--text-main)',
                      cursor: 'not-allowed',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Client Name */}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.4rem' }}>
                    <User size={14} />
                    Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BuildCorp Industries"
                    value={formClientName}
                    onChange={(e) => setFormClientName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>

                {/* Quantity & Quotation */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.4rem' }}>
                      <Hash size={14} />
                      Quantity (units)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      min="1"
                      value={formQuantity}
                      onChange={(e) => setFormQuantity(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.4rem' }}>
                      <IndianRupee size={14} />
                      Quotation Given (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 85000"
                      min="1"
                      value={formQuotation}
                      onChange={(e) => setFormQuotation(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                    />
                  </div>
                </div>

                {/* Date of Delivery */}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.4rem' }}>
                    <Calendar size={14} />
                    Expected Delivery Date
                  </label>
                  <input
                    type="date"
                    value={formDeliveryDate}
                    onChange={(e) => setFormDeliveryDate(e.target.value)}
                    min={todayStr}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.75rem',
                backgroundColor: '#f8fafc'
              }}>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    color: 'var(--text-main)'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.6rem 1.5rem',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <CheckCircle2 size={16} />
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
