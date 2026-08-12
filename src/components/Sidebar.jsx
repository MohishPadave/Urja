import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Package, 
  Archive, 
  Truck, 
  Layers, 
  User, 
  LogOut 
} from 'lucide-react';

export default function Sidebar({ currentView, onViewChange, onLogout, user }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'orders', label: 'Orders', icon: FileText },
    { id: 'raw-materials', label: 'Raw Materials', icon: Package },
    { id: 'packaging', label: 'Packaging', icon: Archive },
    { id: 'suppliers', label: 'Suppliers', icon: Truck },
    { id: 'product-catalog', label: 'Product Catalog', icon: Layers }
  ];

  return (
    <div className="sidebar-panel">
      {/* Brand Header */}
      <div className="sidebar-header">
        <img 
          src="/urja-1.png" 
          alt="Urja Sealants Logo" 
          style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'contain', backgroundColor: 'white' }} 
        />
        <div className="sidebar-title">
          <h2>Urja Sealants</h2>
          <p>Manufacturing Portal</p>
        </div>
      </div>

      {/* Nav List */}
      <nav className="sidebar-nav-list">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <div
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div 
          className={`sidebar-nav-item ${currentView === 'profile' ? 'active' : ''}`}
          onClick={() => onViewChange('profile')}
        >
          <User size={18} />
          <span>Profile</span>
        </div>
        <div className="sidebar-nav-item" onClick={onLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
