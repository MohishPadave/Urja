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
import SalesDashboard from './components/SalesDashboard';
import FailedProductsView from './components/FailedProductsView';

// Mock Initial Databases
const initialClients = [
  { id: 'CLI-001', name: 'Sarah Jenkins', company: 'Apex Manufacturing', orders: 24 },
  { id: 'CLI-002', name: 'David Chen', company: 'BuildTech Industries', orders: 12 },
  { id: 'CLI-003', name: 'Elena Rodriguez', company: 'Global Sealants Corp', orders: 8 }
];

const initialOrders = [
  // Confirmed Status (10 orders)
  { id: 'ORD-2023-8904', clientName: 'Apex Sealants LLC', startDate: '2023-10-25', endDate: '2023-11-02', price: 12850.00, priority: 'Medium', status: 'Confirmed', starred: false },
  { id: 'ORD-2023-8915', clientName: 'Titan Contractors', startDate: '2023-10-27', endDate: '2023-11-05', price: 22400.00, priority: 'High', status: 'Confirmed', starred: false },
  { id: 'ORD-2023-8916', clientName: 'Delta Builders', startDate: '2023-10-28', endDate: '2023-11-06', price: 18900.00, priority: 'Low', status: 'Confirmed', starred: true },
  { id: 'ORD-2023-8917', clientName: 'Precision Infrastructure', startDate: '2023-10-28', endDate: '2023-11-08', price: 42000.00, priority: 'High', status: 'Confirmed', starred: false },
  { id: 'ORD-2023-8918', clientName: 'Apex Sealants LLC', startDate: '2023-10-29', endDate: '2023-11-09', price: 9500.00, priority: 'Medium', status: 'Confirmed', starred: false },
  { id: 'ORD-2023-8919', clientName: 'Nova Glass & Glazing', startDate: '2023-10-30', endDate: '2023-11-10', price: 15400.00, priority: 'Medium', status: 'Confirmed', starred: false },
  { id: 'ORD-2023-8920', clientName: 'Metro Transit Group', startDate: '2023-10-30', endDate: '2023-11-12', price: 54000.00, priority: 'High', status: 'Confirmed', starred: true },
  { id: 'ORD-2023-8921', clientName: 'Premier Facades Inc', startDate: '2023-11-01', endDate: '2023-11-14', price: 31000.00, priority: 'Low', status: 'Confirmed', starred: false },
  { id: 'ORD-2023-8922', clientName: 'Evergreen Construction', startDate: '2023-11-02', endDate: '2023-11-15', price: 12500.00, priority: 'Medium', status: 'Confirmed', starred: false },
  { id: 'ORD-2023-8923', clientName: 'Starlight Developers', startDate: '2023-11-03', endDate: '2023-11-16', price: 27500.00, priority: 'High', status: 'Confirmed', starred: false },

  // In Production Status (10 orders)
  { id: 'ORD-2023-8901', clientName: 'BuildCorp Industries', startDate: '2023-10-24', endDate: '2023-10-28', price: 45200.00, priority: 'High', status: 'In Production', starred: true },
  { id: 'ORD-2023-8925', clientName: 'Summit Enterprises', startDate: '2023-10-24', endDate: '2023-10-29', price: 35000.00, priority: 'High', status: 'In Production', starred: false },
  { id: 'ORD-2023-8926', clientName: 'Pioneer Developments', startDate: '2023-10-25', endDate: '2023-11-01', price: 16500.00, priority: 'Medium', status: 'In Production', starred: false },
  { id: 'ORD-2023-8927', clientName: 'Integrity Structural LLC', startDate: '2023-10-25', endDate: '2023-11-02', price: 28000.00, priority: 'Medium', status: 'In Production', starred: false },
  { id: 'ORD-2023-8928', clientName: 'Modern Windows Ltd', startDate: '2023-10-26', endDate: '2023-11-03', price: 8200.00, priority: 'Low', status: 'In Production', starred: false },
  { id: 'ORD-2023-8929', clientName: 'Vanguard Engineering', startDate: '2023-10-26', endDate: '2023-11-04', price: 62000.00, priority: 'High', status: 'In Production', starred: true },
  { id: 'ORD-2023-8930', clientName: 'Bayside Drywall Corp', startDate: '2023-10-27', endDate: '2023-11-05', price: 11000.00, priority: 'Low', status: 'In Production', starred: false },
  { id: 'ORD-2023-8931', clientName: 'Eagle Precast Concrete', startDate: '2023-10-27', endDate: '2023-11-06', price: 47500.00, priority: 'High', status: 'In Production', starred: false },
  { id: 'ORD-2023-8932', clientName: 'North Star Contracting', startDate: '2023-10-28', endDate: '2023-11-07', price: 19800.00, priority: 'Medium', status: 'In Production', starred: false },
  { id: 'ORD-2023-8933', clientName: 'Ironwood Commercials', startDate: '2023-10-28', endDate: '2023-11-08', price: 34000.00, priority: 'Medium', status: 'In Production', starred: false },

  // Testing Status (10 orders)
  { id: 'ORD-2023-8910', clientName: 'Global Adhesives Group', startDate: '2023-10-26', endDate: '2023-11-15', price: 8400.00, priority: 'Low', status: 'Testing', starred: false },
  { id: 'ORD-2023-8935', clientName: 'Horizon Glazing Corp', startDate: '2023-10-25', endDate: '2023-11-04', price: 14500.00, priority: 'Medium', status: 'Testing', starred: false },
  { id: 'ORD-2023-8936', clientName: 'Velocity Logistics', startDate: '2023-10-25', endDate: '2023-11-05', price: 32000.00, priority: 'High', status: 'Testing', starred: true },
  { id: 'ORD-2023-8937', clientName: 'Swift Retail Solutions', startDate: '2023-10-26', endDate: '2023-11-06', price: 7200.00, priority: 'Low', status: 'Testing', starred: false },
  { id: 'ORD-2023-8938', clientName: 'Sterling Insulation', startDate: '2023-10-26', endDate: '2023-11-07', price: 21500.00, priority: 'Medium', status: 'Testing', starred: false },
  { id: 'ORD-2023-8939', clientName: 'Apex Sealants LLC', startDate: '2023-10-27', endDate: '2023-11-08', price: 11800.00, priority: 'Low', status: 'Testing', starred: false },
  { id: 'ORD-2023-8940', clientName: 'Beacon Infrastructure', startDate: '2023-10-27', endDate: '2023-11-09', price: 58000.00, priority: 'High', status: 'Testing', starred: true },
  { id: 'ORD-2023-8941', clientName: 'Global Adhesives Group', startDate: '2023-10-28', endDate: '2023-11-10', price: 13900.00, priority: 'Medium', status: 'Testing', starred: false },
  { id: 'ORD-2023-8942', clientName: 'Lakeside Constructors', startDate: '2023-10-28', endDate: '2023-11-11', price: 24500.00, priority: 'Medium', status: 'Testing', starred: false },
  { id: 'ORD-2023-8943', clientName: 'Paramount Roofing', startDate: '2023-10-29', endDate: '2023-11-12', price: 41000.00, priority: 'High', status: 'Testing', starred: false },

  // Packaging Status (10 orders)
  { id: 'ORD-2023-8912', clientName: 'Marine Tech Supply', startDate: '2023-10-26', endDate: '2023-11-05', price: 31500.00, priority: 'Medium', status: 'Packaging', starred: true },
  { id: 'ORD-2023-8945', clientName: 'Allied Mechanical Systems', startDate: '2023-10-24', endDate: '2023-11-02', price: 19400.00, priority: 'Medium', status: 'Packaging', starred: false },
  { id: 'ORD-2023-8946', clientName: 'Dynamic Glass Inc', startDate: '2023-10-24', endDate: '2023-11-03', price: 28500.00, priority: 'High', status: 'Packaging', starred: false },
  { id: 'ORD-2023-8947', clientName: 'Atlas Engineering Group', startDate: '2023-10-25', endDate: '2023-11-04', price: 52000.00, priority: 'High', status: 'Packaging', starred: true },
  { id: 'ORD-2023-8948', clientName: 'Marine Tech Supply', startDate: '2023-10-25', endDate: '2023-11-05', price: 8900.00, priority: 'Low', status: 'Packaging', starred: false },
  { id: 'ORD-2023-8949', clientName: 'Pacific Industrial Supply', startDate: '2023-10-26', endDate: '2023-11-06', price: 16000.00, priority: 'Medium', status: 'Packaging', starred: false },
  { id: 'ORD-2023-8950', clientName: 'Redwood Framing Co', startDate: '2023-10-26', endDate: '2023-11-07', price: 11200.00, priority: 'Low', status: 'Packaging', starred: false },
  { id: 'ORD-2023-8951', clientName: 'National Acoustic Panels', startDate: '2023-10-27', endDate: '2023-11-08', price: 22000.00, priority: 'Medium', status: 'Packaging', starred: false },
  { id: 'ORD-2023-8952', clientName: 'Silverline Windows Corp', startDate: '2023-10-27', endDate: '2023-11-09', price: 43000.00, priority: 'High', status: 'Packaging', starred: false },
  { id: 'ORD-2023-8953', clientName: 'Westcoast Developers', startDate: '2023-10-28', endDate: '2023-11-10', price: 31200.00, priority: 'High', status: 'Packaging', starred: false },

  // Completed Status (10 orders)
  { id: 'ORD-2023-8902', clientName: 'Apex Sealants LLC', startDate: '2023-10-15', endDate: '2023-10-22', price: 15400.00, priority: 'Low', status: 'Completed', starred: false },
  { id: 'ORD-2023-8903', clientName: 'BuildCorp Industries', startDate: '2023-10-16', endDate: '2023-10-23', price: 24500.00, priority: 'Medium', status: 'Completed', starred: false },
  { id: 'ORD-2023-8905', clientName: 'Global Adhesives Group', startDate: '2023-10-18', endDate: '2023-10-24', price: 18900.00, priority: 'High', status: 'Completed', starred: true },
  { id: 'ORD-2023-8906', clientName: 'Marine Tech Supply', startDate: '2023-10-18', endDate: '2023-10-25', price: 34200.00, priority: 'Medium', status: 'Completed', starred: false },
  { id: 'ORD-2023-8907', clientName: 'Pioneer Developments', startDate: '2023-10-19', endDate: '2023-10-26', price: 9200.00, priority: 'Low', status: 'Completed', starred: false },
  { id: 'ORD-2023-8908', clientName: 'Summit Enterprises', startDate: '2023-10-20', endDate: '2023-10-27', price: 47800.00, priority: 'High', status: 'Completed', starred: true },
  { id: 'ORD-2023-8909', clientName: 'Velocity Logistics', startDate: '2023-10-20', endDate: '2023-10-27', price: 12500.00, priority: 'Low', status: 'Completed', starred: false },
  { id: 'ORD-2023-8911', clientName: 'Starlight Developers', startDate: '2023-10-22', endDate: '2023-10-28', price: 26800.00, priority: 'High', status: 'Completed', starred: false },
  { id: 'ORD-2023-8913', clientName: 'Lakeside Constructors', startDate: '2023-10-22', endDate: '2023-10-29', price: 15400.00, priority: 'Medium', status: 'Completed', starred: false },
  { id: 'ORD-2023-8914', clientName: 'Horizon Glazing Corp', startDate: '2023-10-23', endDate: '2023-10-30', price: 39000.00, priority: 'High', status: 'Completed', starred: false }
];

const initialInventory = [
  // Emulsions & Resins
  { id: 'RM-1024', name: 'U400/J400F Polyurethane Base', quantity: 4500, threshold: 2000, status: 'Healthy', unit: 'kg', category: 'Resins', type: 'Raw', starred: true, lastUpdated: '2023-10-24' },
  { id: 'RM-3501', name: 'Acrysol-35 Emulsion', quantity: 2800, threshold: 1000, status: 'Healthy', unit: 'kg', category: 'Resins', type: 'Raw', starred: false, lastUpdated: '2023-10-25' },
  { id: 'RM-5262', name: '5262- Acrylic Emulsion', quantity: 180, threshold: 800, status: 'Critical', unit: 'kg', category: 'Emulsions', type: 'Raw', starred: false, lastUpdated: '2023-10-26' },
  
  // Fillers & Pigments
  { id: 'RM-2099', name: 'Calcium Silicate Filler', quantity: 6000, threshold: 1500, status: 'Healthy', unit: 'kg', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-10-27' },
  { id: 'RM-2098', name: 'TiO2 Powder (Titanium Dioxide)', quantity: 450, threshold: 600, status: 'Low Stock', unit: 'kg', category: 'Additives', type: 'Raw', starred: true, lastUpdated: '2023-10-28' },
  { id: 'RM-2097', name: 'Whiting Powder (PCC)', quantity: 8200, threshold: 2000, status: 'Healthy', unit: 'kg', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-10-29' },
  { id: 'RM-2096', name: 'Microsphare P', quantity: 120, threshold: 300, status: 'Critical', unit: 'kg', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-10-30' },
  { id: 'RM-2095', name: 'PPT Powder', quantity: 1500, threshold: 800, status: 'Healthy', unit: 'kg', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-10-31' },

  // Plasticizers & Additives
  { id: 'RM-0551', name: 'CPW (Chlorinated Paraffin Wax)', quantity: 3400, threshold: 1000, status: 'Healthy', unit: 'L', category: 'Curing Agents', type: 'Raw', starred: false, lastUpdated: '2023-10-26' },
  { id: 'RM-0552', name: 'Propylene Glycol (PG)', quantity: 750, threshold: 800, status: 'Low Stock', unit: 'L', category: 'Curing Agents', type: 'Raw', starred: false, lastUpdated: '2023-10-27' },
  { id: 'RM-0111', name: 'Additive 111 (Stabilizer)', quantity: 420, threshold: 200, status: 'Healthy', unit: 'L', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-10-28' },
  { id: 'RM-0459', name: 'Additive 459 (Crosslinker)', quantity: 90, threshold: 150, status: 'Critical', unit: 'L', category: 'Additives', type: 'Raw', starred: true, lastUpdated: '2023-10-29' },
  { id: 'RM-1288', name: 'Ortan-1288 Dispersant', quantity: 380, threshold: 200, status: 'Healthy', unit: 'kg', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-10-30' },
  { id: 'RM-1870', name: 'Additive 187 Adhesion Promoter', quantity: 110, threshold: 100, status: 'Low Stock', unit: 'L', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-10-31' },
  { id: 'RM-3480', name: 'BYK-348 Wetting Agent', quantity: 240, threshold: 100, status: 'Healthy', unit: 'L', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-11-01' },
  
  // Catalysts, Thickeners & Fibres
  { id: 'RM-2260', name: 'K-226 Catalyst', quantity: 550, threshold: 200, status: 'Healthy', unit: 'kg', category: 'Curing Agents', type: 'Raw', starred: false, lastUpdated: '2023-10-25' },
  { id: 'RM-0060', name: 'Thickener T-60', quantity: 720, threshold: 300, status: 'Healthy', unit: 'kg', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-10-26' },
  { id: 'RM-0580', name: 'Thickener T-580', quantity: 290, threshold: 300, status: 'Low Stock', unit: 'kg', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-10-27' },
  { id: 'RM-0200', name: 'BNT-200 Gelling Agent', quantity: 85, threshold: 100, status: 'Critical', unit: 'kg', category: 'Curing Agents', type: 'Raw', starred: false, lastUpdated: '2023-10-28' },
  { id: 'RM-0010', name: 'Acrylic Fibre (Reinforcement)', quantity: 300, threshold: 150, status: 'Healthy', unit: 'kg', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-10-29' },
  { id: 'RM-0020', name: 'Bondex High-Tack Binder', quantity: 880, threshold: 400, status: 'Healthy', unit: 'kg', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-10-30' },
  { id: 'RM-0030', name: 'Carbigloss Sheen Modifier', quantity: 1200, threshold: 500, status: 'Healthy', unit: 'kg', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-10-31' },
  { id: 'RM-0040', name: 'Texnol Extender', quantity: 450, threshold: 300, status: 'Healthy', unit: 'L', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-11-01' },
  { id: 'RM-0050', name: 'Antifoam Agent', quantity: 180, threshold: 100, status: 'Healthy', unit: 'L', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-11-02' },
  { id: 'RM-0090', name: 'Black Paste Colorant', quantity: 950, threshold: 400, status: 'Healthy', unit: 'kg', category: 'Additives', type: 'Raw', starred: false, lastUpdated: '2023-11-03' },

  // Packaging Materials
  { id: 'PM-2010', name: 'Plastic Sealant Cartridges 310ml', quantity: 12000, threshold: 5000, status: 'Healthy', unit: 'Units', category: 'Containers', type: 'Packaging', starred: false, lastUpdated: '2023-10-29' },
  { id: 'PM-3040', name: 'Aluminum Foil Sausage Packets 600ml', quantity: 800, threshold: 1500, status: 'Critical', unit: 'Units', category: 'Containers', type: 'Packaging', starred: true, lastUpdated: '2023-10-30' },
  { id: 'PM-4050', name: 'Corrugated Shipping Boxes (L)', quantity: 4200, threshold: 2000, status: 'Healthy', unit: 'Units', category: 'Boxes', type: 'Packaging', starred: false, lastUpdated: '2023-10-31' }
];

const initialFailedProducts = [
  { id: 'ORD-2023-8905', productName: 'URJA Fire Stop (Gray)', totalQuantity: 1200, remainingQuantity: 1200, reason: 'Viscosity below threshold', date: '2023-10-24' },
  { id: 'ORD-2023-8918', productName: 'NEXO Seal DS (Black)', totalQuantity: 400, remainingQuantity: 400, reason: 'Color pigment mismatch', date: '2023-10-29' },
  { id: 'ORD-2023-8929', productName: 'EXO Seal GP Sealant (White)', totalQuantity: 800, remainingQuantity: 800, reason: 'Curing rate too slow', date: '2023-10-26' },
  { id: 'ORD-2023-8933', productName: 'URJA High Temperature (White)', totalQuantity: 1500, remainingQuantity: 1500, reason: 'Incomplete polymerization', date: '2023-10-28' },
  { id: 'ORD-2023-8946', productName: 'NEXO Seal GP Sealant (Black)', totalQuantity: 600, remainingQuantity: 600, reason: 'Skin-over time out of spec', date: '2023-10-25' }
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
  const [failedProducts, setFailedProducts] = useState(initialFailedProducts);

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

  const handleAddInventoryItem = (item) => {
    setInventory([item, ...inventory]);
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

    if (newStatus === 'Discarded' || newStatus === 'Failed') {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        const batchWt = order.productDetails?.batchWeight || 1000;
        const failedItem = {
          id: order.id,
          productName: order.productDetails?.productLine || 'URJA Custom Sealant Blend',
          totalQuantity: batchWt,
          remainingQuantity: batchWt,
          reason: newStatus === 'Discarded' ? 'Quality Control check failure in Testing phase' : 'QC Failure - Slated for Blending',
          date: new Date().toISOString().split('T')[0]
        };
        setFailedProducts(prev => {
          if (prev.some(p => p.id === order.id)) return prev;
          return [failedItem, ...prev];
        });
      }
    }
  };

  const handleDeductFailedProduct = (id, amount) => {
    setFailedProducts(prev => prev.map(item => {
      if (item.id === id) {
        const rem = Math.max(0, item.remainingQuantity - amount);
        return { ...item, remainingQuantity: rem };
      }
      return item;
    }));
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
            onUpdateOrderStatus={handleUpdateOrderStatus}
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
            failedProducts={failedProducts}
            onDeductFailedProduct={handleDeductFailedProduct}
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
            onAddMaterial={handleAddInventoryItem}
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
      case 'failed-products':
        return (
          <FailedProductsView
            user={user}
            orders={orders}
            failedProducts={failedProducts}
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

  // If logged in as Salesman, render Sales Dashboard
  if (user.role === 'Salesman') {
    return <SalesDashboard user={user} onLogout={handleLogout} />;
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
