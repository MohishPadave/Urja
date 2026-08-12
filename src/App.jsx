import React, { useState } from 'react';
import LoginView from './components/LoginView';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import ClientsView from './components/ClientsView';
import OrdersView from './components/OrdersView';
import InventoryView from './components/InventoryView';
import DetailDrawer from './components/DetailDrawer';
import CreateOrderView from './components/CreateOrderView';
import ProductCatalogView from './components/ProductCatalogView';
import SuppliersView from './components/SuppliersView';
import OrderDetailView from './components/OrderDetailView';

// Mock Initial Databases
const initialClients = [
  { id: 'CLI-001', name: 'Sarah Jenkins', company: 'Apex Manufacturing', orders: 24 },
  { id: 'CLI-002', name: 'David Chen', company: 'BuildTech Industries', orders: 12 },
  { id: 'CLI-003', name: 'Elena Rodriguez', company: 'Global Sealants Corp', orders: 8 }
];

const initialOrders = [
  { id: 'ORD-2023-8901', clientName: 'BuildCorp Industries', startDate: '2023-10-24', endDate: '2023-10-28', price: 45200.00, priority: 'High', status: 'In Production', starred: true },
  { id: 'ORD-2023-8904', clientName: 'Apex Sealants LLC', startDate: '2023-10-25', endDate: '2023-11-02', price: 12850.00, priority: 'Medium', status: 'Confirmed', starred: false },
  { id: 'ORD-2023-8910', clientName: 'Global Adhesives Group', startDate: '2023-10-26', endDate: '2023-11-15', price: 8400.00, priority: 'Low', status: 'Testing', starred: false },
  { id: 'ORD-2023-8912', clientName: 'Marine Tech Supply', startDate: '2023-10-26', endDate: '2023-11-05', price: 31500.00, priority: 'Medium', status: 'Packaging', starred: true }
];

const initialInventory = [
  { id: 'RM-1042', name: 'Industrial Silicone Base X2', quantity: 120, threshold: 500, status: 'Critical', unit: 'L', category: 'Silicone', type: 'Raw', starred: true, lastUpdated: '2023-10-24' },
  { id: 'RM-2099', name: 'Polyurethane Resin A', quantity: 4500, threshold: 1000, status: 'Healthy', unit: 'kg', category: 'Resins', type: 'Raw', starred: false, lastUpdated: '2023-10-25' },
  { id: 'RM-0551', name: 'Curing Agent B-Plus', quantity: 850, threshold: 1000, status: 'Low Stock', unit: 'kg', category: 'Curing Agents', type: 'Raw', starred: false, lastUpdated: '2023-10-26' },
  { id: 'RM-3102', name: 'Acrylic Emulsion', quantity: 2200, threshold: 800, status: 'Healthy', unit: 'L', category: 'Emulsions', type: 'Raw', starred: false, lastUpdated: '2023-10-27' },
  { id: 'RM-1188', name: 'Premium Titanium Dioxide', quantity: 450, threshold: 600, status: 'Low Stock', unit: 'kg', category: 'Additives', type: 'Raw', starred: true, lastUpdated: '2023-10-28' },

  // Packaging Materials
  { id: 'PM-2010', name: 'Plastic Sealant Cartridges 310ml', quantity: 12000, threshold: 5000, status: 'Healthy', unit: 'Units', category: 'Containers', type: 'Packaging', starred: false, lastUpdated: '2023-10-29' },
  { id: 'PM-3040', name: 'Aluminum Foil Bags (Aerosol)', quantity: 800, threshold: 1500, status: 'Critical', unit: 'Units', category: 'Containers', type: 'Packaging', starred: true, lastUpdated: '2023-10-30' },
  { id: 'PM-4050', name: 'Corrugated Shipping Boxes (L)', quantity: 4200, threshold: 2000, status: 'Healthy', unit: 'Units', category: 'Boxes', type: 'Packaging', starred: false, lastUpdated: '2023-10-31' }
];

const initialLogs = [
  { id: '#B-8924', product: 'Polyurethane Sealant X-1', status: 'Mixing', time: '10:42 AM' },
  { id: '#B-8923', product: 'Silicone Adhesive Base', status: 'Packaging', time: '09:15 AM' },
  { id: '#B-8922', product: 'Industrial Epoxy Primer', status: 'Quality Check', time: '08:30 AM' },
  { id: '#B-8921', product: 'Acrylic Caulking', status: 'Completed', time: 'Yesterday' }
];

function App() {
  const [user, setUser] = useState(null); // Auth state
  const [currentView, setCurrentView] = useState('dashboard');

  // App States
  const [clients, setClients] = useState(initialClients);
  const [orders, setOrders] = useState(initialOrders);
  const [inventory, setInventory] = useState(initialInventory);
  const [logs, setLogs] = useState(initialLogs);

  const [isSystemHalted, setIsSystemHalted] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState(null); // { type, data }
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);

  // Auth Handler
  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
  };

  // State Mutators
  const handleAddClient = (client) => {
    setClients([client, ...clients]);
  };

  const handleAddOrder = (order) => {
    setOrders([order, ...orders]);
    // Also append a production log for new order
    const newLog = {
      id: `#B-${8920 + logs.length + 1}`,
      product: order.clientName + ' Custom Batch',
      status: 'Mixing',
      time: 'Just Now'
    };
    setLogs([newLog, ...logs]);
  };

  const handleToggleStar = (id) => {
    if (id.startsWith('ORD')) {
      setOrders(orders.map(o => o.id === id ? { ...o, starred: !o.starred } : o));
    } else {
      setInventory(inventory.map(item => item.id === id ? { ...item, starred: !item.starred } : item));
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => prevOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleHaltToggle = () => {
    setIsSystemHalted(!isSystemHalted);
    if (!isSystemHalted) {
      alert('WARNING: All production operations have been halted! Alarm signals sent to all floor mixing units.');
    } else {
      alert('Production resume signals dispatched. Normal operations restored.');
    }
  };

  const handleQuickAction = (action) => {
    if (action === 'new-order') {
      setCurrentView('create-order');
    } else if (action === 'log-material') {
      const addedQty = Math.floor(Math.random() * 500) + 100;
      // Increment silicone base quantity
      setInventory(inventory.map(item =>
        item.id === 'RM-1042'
          ? { ...item, quantity: item.quantity + addedQty, status: item.quantity + addedQty >= item.threshold ? 'Healthy' : 'Low Stock' }
          : item
      ));
      alert(`Log Material Receipt Success: Added ${addedQty} L of Industrial Silicone Base X2 into inventory.`);
    } else if (action === 'maintenance') {
      alert('Maintenance Request successfully filed. Engineering team will inspect Mixer #4 shortly.');
    }
  };

  // Render View Selector
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            user={user}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onToggleStar={handleToggleStar}
            isSystemHalted={isSystemHalted}
            onHaltToggle={handleHaltToggle}
            onAction={handleQuickAction}
          />
        );
      case 'clients':
        return (
          <ClientsView
            user={user}
            clients={clients}
            onAddClient={handleAddClient}
            onViewDetails={(type, data) => setActiveDrawer({ type, data })}
          />
        );
      case 'orders':
        return (
          <OrdersView
            user={user}
            orders={orders}
            onAddOrder={handleAddOrder}
            onToggleStar={handleToggleStar}
            onViewDetails={(type, data) => { setSelectedOrderDetail(data); setCurrentView('order-detail'); }}
            onCreateOrderClick={() => setCurrentView('create-order')}
          />
        );
      case 'order-detail':
        return (
          <OrderDetailView
            order={selectedOrderDetail}
            onBack={() => { setCurrentView('orders'); setSelectedOrderDetail(null); }}
            onToggleStar={handleToggleStar}
            user={user}
          />
        );
      case 'create-order':
        return (
          <CreateOrderView
            clients={clients}
            onSave={(newOrder) => {
              handleAddOrder(newOrder);
              setCurrentView('orders');
            }}
            onCancel={() => setCurrentView('orders')}
          />
        );
      case 'raw-materials':
      case 'packaging':
        // Show raw materials page and set state filter accordingly
        return (
          <InventoryView
            user={user}
            inventoryItems={inventory}
            onToggleStar={handleToggleStar}
            onViewDetails={(type, data) => setActiveDrawer({ type, data })}
          />
        );
      case 'suppliers':
        return (
          <SuppliersView
            user={user}
          />
        );
      case 'product-catalog':
        return (
          <ProductCatalogView
            user={user}
          />
        );
      case 'profile':
        return (
          <div className="main-content">
            <header className="top-navbar"><div className="navbar-brand">User Settings</div></header>
            <div className="page-container">
              <h1 className="page-title">Manager Profile</h1>
              <div className="table-card" style={{ padding: '2rem', maxWidth: '600px' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                    JD
                  </div>
                  <div>
                    <h2>John Doe</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Plant Operations Supervisor</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div><strong>Email:</strong> admin@urjasealants.com</div>
                  <div><strong>Access Level:</strong> Super Administrator</div>
                  <div><strong>Terminal Unit ID:</strong> UNIT-MIX-4</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>View not implemented</div>;
    }
  };

  // If not logged in, render Login Panel
  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      {/* Navigation Left Sidebar */}
      <Sidebar
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
        onLogout={handleLogout}
        user={user}
      />

      {/* Main Content Render */}
      {renderView()}

      {/* Detail Slide Drawer Overlay */}
      {activeDrawer && (
        <DetailDrawer
          type={activeDrawer.type}
          data={activeDrawer.data}
          onClose={() => setActiveDrawer(null)}
        />
      )}
    </div>
  );
}

export default App;
