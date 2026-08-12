import React from 'react';
import { X, Calendar, DollarSign, ShieldAlert, Award, FileText, User, Building } from 'lucide-react';

export default function DetailDrawer({ type, data, onClose }) {
  if (!data) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3 className="drawer-title">
            {type === 'client' && 'Client Information'}
            {type === 'order' && 'Order Summary'}
            {type === 'inventory' && 'Material Specifications'}
          </h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Client Details */}
          {type === 'client' && (
            <>
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary-color)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '0.75rem'
                }}>
                  {data.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{data.name}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{data.id}</p>
              </div>

              <div className="drawer-section">
                <span className="drawer-section-title">Company Info</span>
                <div className="detail-grid">
                  <div className="detail-item">
                    <div className="detail-label">Legal Name</div>
                    <div className="detail-value">{data.company}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Client Status</div>
                    <div className="detail-value">
                      <span className="badge badge-healthy">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <span className="drawer-section-title">Account Activity</span>
                <div className="detail-grid">
                  <div className="detail-item">
                    <div className="detail-label">Total Orders Placed</div>
                    <div className="detail-value">{data.orders}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Preferred Carrier</div>
                    <div className="detail-value">Urja Logistics</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Order Details */}
          {type === 'order' && (
            <>
              <div style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{data.id}</span>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{data.clientName}</h4>
              </div>

              <div className="drawer-section">
                <span className="drawer-section-title">Timeline</span>
                <div className="detail-grid">
                  <div className="detail-item">
                    <div className="detail-label">Order Started</div>
                    <div className="detail-value">{data.startDate}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Est. Completion</div>
                    <div className="detail-value">{data.endDate}</div>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <span className="drawer-section-title">Financial Details</span>
                <div className="detail-grid">
                  <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                    <div className="detail-label">Contract Amount</div>
                    <div className="detail-value" style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}>
                      ${data.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <span className="drawer-section-title">Logistics & priority</span>
                <div className="detail-grid">
                  <div className="detail-item">
                    <div className="detail-label">Priority Level</div>
                    <div className="detail-value">
                      <span className={`priority-tag priority-${data.priority.toLowerCase()}`}>
                        {data.priority}
                      </span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Fulfillment Status</div>
                    <div className="detail-value">
                      <span className="badge badge-mixing">In Production</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Inventory Details */}
          {type === 'inventory' && (
            <>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  backgroundColor: data.status === 'Critical' ? 'var(--status-critical-bg)' : 'var(--status-healthy-bg)',
                  color: data.status === 'Critical' ? 'var(--status-critical-text)' : 'var(--status-healthy-text)'
                }}>
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{data.id}</span>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{data.name}</h4>
                </div>
              </div>

              <div className="drawer-section">
                <span className="drawer-section-title">Stock Levels</span>
                <div className="detail-grid">
                  <div className="detail-item">
                    <div className="detail-label">Current Quantity</div>
                    <div className="detail-value" style={{ fontSize: '1.2rem' }}>
                      {data.quantity.toLocaleString()} {data.unit}
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Safety Threshold</div>
                    <div className="detail-value">
                      {data.threshold.toLocaleString()} {data.unit}
                    </div>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <span className="drawer-section-title">Product Classification</span>
                <div className="detail-grid">
                  <div className="detail-item">
                    <div className="detail-label">Material Type</div>
                    <div className="detail-value">{data.type} Material</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Storage Temperature</div>
                    <div className="detail-value">18°C - 25°C</div>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <span className="drawer-section-title">Reorder Metrics</span>
                <div className="detail-grid">
                  <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                    <div className="detail-label">Recommended Lead Time</div>
                    <div className="detail-value">7 - 10 Business Days</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="drawer-footer">
          <button className="btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
