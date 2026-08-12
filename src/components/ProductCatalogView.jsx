import React, { useState } from 'react';
import TopNavbar from './TopNavbar';
import { 
  Folder, 
  FlaskConical, 
  MoreVertical, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  ChevronRight, 
  Activity, 
  Eye, 
  Bell, 
  Globe 
} from 'lucide-react';

// Product Catalog Collections based on brand data
const initialCollections = [
  { id: 'C-01', name: 'Acrylic Sealants', status: 'ACTIVE', count: 2, iconType: 'folder', description: 'Vapor-permeable, high-temperature, and fire-resistant acrylic sealant lines engineered for construction joints, duct sealing, and passive fire stopping systems.' },
  { id: 'C-02', name: 'GP Sealants', status: 'ACTIVE', count: 2, iconType: 'folder', description: 'General Purpose (GP) sealants providing high adhesion elastic sealing on construction substrates, submersion systems, and industrial joints.' },
  { id: 'C-03', name: 'Specialty Elastomers', status: 'ACTIVE', count: 1, iconType: 'folder', description: 'Premium specialty adhesives and elastomers featuring chemical resistance, high elongation, and structural load distribution.' }
];

// Product Lines mapped to collections
const productsByCollection = {
  'C-01': [
    { id: 'PU-101', name: 'URJA Fire Stop (White, Gray, Black)', description: 'Passive fire barrier sealant meeting high-grade fire containment ratings.' },
    { id: 'PU-102', name: 'URJA High Temperature (White, Gray, Black)', description: 'Thermally stable acrylic sealant designed to withstand sustained high-temp exposures.' }
  ],
  'C-02': [
    { id: 'PU-201', name: 'NEXO Seal GP Sealant (White, Gray, Black)', description: 'Premium general purpose sealant for industrial expansion joints.' },
    { id: 'PU-202', name: 'EXO Seal GP Sealant (White, Gray, Black, 600ml)', description: 'Contractor grade general purpose formulation packaged in 600ml foil sausages.' }
  ],
  'C-03': [
    { id: 'PU-301', name: 'NEXO Seal DS (White, Gray, Black)', description: 'High-strength specialty adhesive with extreme durability and fiber reinforcement.' }
  ]
};

// Formulations Database corresponding to the user's raw materials list
const formulationsByProduct = {
  'PU-101': [
    { name: 'Acrysol-35 Emulsion', code: 'RM-3501', quantity: 400.0, percent: 40.0 },
    { name: 'K-226 Catalyst', code: 'RM-2260', quantity: 100.0, percent: 10.0 },
    { name: 'Calcium Silicate Filler', code: 'RM-2099', quantity: 200.0, percent: 20.0 },
    { name: 'TiO2 Powder (Titanium Dioxide)', code: 'RM-2098', quantity: 100.0, percent: 10.0 },
    { name: 'CPW (Chlorinated Paraffin Wax)', code: 'RM-0551', quantity: 100.0, percent: 10.0 },
    { name: 'Propylene Glycol (PG)', code: 'RM-0552', quantity: 50.0, percent: 5.0 },
    { name: 'Additive 111 (Stabilizer)', code: 'RM-0111', quantity: 10.0, percent: 1.0 },
    { name: 'Additive 459 (Crosslinker)', code: 'RM-0459', quantity: 20.0, percent: 2.0 },
    { name: 'Antifoam Agent', code: 'RM-0050', quantity: 10.0, percent: 1.0 },
    { name: 'Thickener T-60', code: 'RM-0060', quantity: 10.0, percent: 1.0 }
  ],
  'PU-102': [
    { name: 'Acrysol-35 Emulsion', code: 'RM-3501', quantity: 400.0, percent: 40.0 },
    { name: 'K-226 Catalyst', code: 'RM-2260', quantity: 100.0, percent: 10.0 },
    { name: 'Calcium Silicate Filler', code: 'RM-2099', quantity: 200.0, percent: 20.0 },
    { name: 'TiO2 Powder (Titanium Dioxide)', code: 'RM-2098', quantity: 100.0, percent: 10.0 },
    { name: 'CPW (Chlorinated Paraffin Wax)', code: 'RM-0551', quantity: 100.0, percent: 10.0 },
    { name: 'Propylene Glycol (PG)', code: 'RM-0552', quantity: 50.0, percent: 5.0 },
    { name: 'Additive 111 (Stabilizer)', code: 'RM-0111', quantity: 10.0, percent: 1.0 },
    { name: 'Additive 459 (Crosslinker)', code: 'RM-0459', quantity: 20.0, percent: 2.0 },
    { name: 'Antifoam Agent', code: 'RM-0050', quantity: 10.0, percent: 1.0 },
    { name: 'Thickener T-60', code: 'RM-0060', quantity: 10.0, percent: 1.0 }
  ],
  'PU-201': [
    { name: 'U400/J400F Polyurethane Base', code: 'RM-1024', quantity: 400.0, percent: 40.0 },
    { name: 'BYK-348 Wetting Agent', code: 'RM-3480', quantity: 50.0, percent: 5.0 },
    { name: 'Microsphare P', code: 'RM-2096', quantity: 100.0, percent: 10.0 },
    { name: 'PPT Powder', code: 'RM-2095', quantity: 150.0, percent: 15.0 },
    { name: 'Ortan-1288 Dispersant', code: 'RM-1288', quantity: 50.0, percent: 5.0 },
    { name: 'Thickener T-580', code: 'RM-0580', quantity: 50.0, percent: 5.0 },
    { name: 'Additive 111 (Stabilizer)', code: 'RM-0111', quantity: 20.0, percent: 2.0 },
    { name: 'Additive 459 (Crosslinker)', code: 'RM-0459', quantity: 30.0, percent: 3.0 },
    { name: 'Propylene Glycol (PG)', code: 'RM-0552', quantity: 50.0, percent: 5.0 },
    { name: '5262- Acrylic Emulsion', code: 'RM-5262', quantity: 50.0, percent: 5.0 },
    { name: 'Thickener T-60', code: 'RM-0060', quantity: 20.0, percent: 2.0 },
    { name: 'BNT-200 Gelling Agent', code: 'RM-0200', quantity: 10.0, percent: 1.0 },
    { name: 'Carbigloss Sheen Modifier', code: 'RM-0030', quantity: 20.0, percent: 2.0 }
  ],
  'PU-202': [
    { name: 'U400/J400F Polyurethane Base', code: 'RM-1024', quantity: 450.0, percent: 45.0 },
    { name: 'Whiting Powder (PCC)', code: 'RM-2097', quantity: 200.0, percent: 20.0 },
    { name: 'Microsphare P', code: 'RM-2096', quantity: 100.0, percent: 10.0 },
    { name: 'Ortan-1288 Dispersant', code: 'RM-1288', quantity: 50.0, percent: 5.0 },
    { name: 'Thickener T-580', code: 'RM-0580', quantity: 50.0, percent: 5.0 },
    { name: 'Additive 111 (Stabilizer)', code: 'RM-0111', quantity: 20.0, percent: 2.0 },
    { name: 'CPW (Chlorinated Paraffin Wax)', code: 'RM-0551', quantity: 50.0, percent: 5.0 },
    { name: 'Propylene Glycol (PG)', code: 'RM-0552', quantity: 30.0, percent: 3.0 },
    { name: 'Texnol Extender', code: 'RM-0040', quantity: 20.0, percent: 2.0 },
    { name: 'Thickener T-60', code: 'RM-0060', quantity: 10.0, percent: 1.0 },
    { name: 'BNT-200 Gelling Agent', code: 'RM-0200', quantity: 20.0, percent: 2.0 }
  ],
  'PU-301': [
    { name: 'U400/J400F Polyurethane Base', code: 'RM-1024', quantity: 350.0, percent: 35.0 },
    { name: 'K-226 Catalyst', code: 'RM-2260', quantity: 100.0, percent: 10.0 },
    { name: 'Acrylic Fibre (Reinforcement)', code: 'RM-0010', quantity: 50.0, percent: 5.0 },
    { name: 'Microsphare P', code: 'RM-2096', quantity: 100.0, percent: 10.0 },
    { name: 'Whiting Powder (PCC)', code: 'RM-2097', quantity: 150.0, percent: 15.0 },
    { name: 'Ortan-1288 Dispersant', code: 'RM-1288', quantity: 50.0, percent: 5.0 },
    { name: 'Thickener T-580', code: 'RM-0580', quantity: 50.0, percent: 5.0 },
    { name: 'Additive 111 (Stabilizer)', code: 'RM-0111', quantity: 20.0, percent: 2.0 },
    { name: 'Additive 459 (Crosslinker)', code: 'RM-0459', quantity: 30.0, percent: 3.0 },
    { name: 'Bondex High-Tack Binder', code: 'RM-0020', quantity: 30.0, percent: 3.0 },
    { name: 'CPW (Chlorinated Paraffin Wax)', code: 'RM-0551', quantity: 30.0, percent: 3.0 },
    { name: 'Texnol Extender', code: 'RM-0040', quantity: 20.0, percent: 2.0 },
    { name: 'Propylene Glycol (PG)', code: 'RM-0552', quantity: 20.0, percent: 2.0 },
    { name: 'Thickener T-60', code: 'RM-0060', quantity: 10.0, percent: 1.0 },
    { name: 'Additive 187 Adhesion Promoter', code: 'RM-1870', quantity: 10.0, percent: 1.0 }
  ]
};

export default function ProductCatalogView({ user, notifications, onClearNotifications }) {
  const [level, setLevel] = useState('grid'); // 'grid' | 'collection' | 'product'
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [collections, setCollections] = useState(initialCollections);
  const [products, setProducts] = useState(productsByCollection);

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
    setLevel('collection');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setLevel('product');
  };

  const handleAddCollection = () => {
    const name = prompt('Enter new Collection name:');
    if (!name) return;
    const newColl = {
      id: `C-0${collections.length + 1}`,
      name,
      status: 'ACTIVE',
      count: 0,
      iconType: 'folder',
      description: 'Custom added chemical product catalog collection.'
    };
    setCollections([...collections, newColl]);
  };

  const currentProducts = selectedCollection ? (products[selectedCollection.id] || []) : [];
  const currentFormula = selectedProduct ? (formulationsByProduct[selectedProduct.id] || formulationsByProduct['PU-101']) : [];

  return (
    <div className="main-content">
      <TopNavbar user={user} notifications={notifications} onClearNotifications={onClearNotifications} />

      {/* Main Content Area */}
      <div className="page-container" style={{ paddingBottom: '4rem' }}>
        
        {/* Breadcrumbs Row */}
        <div className="breadcrumbs-row">
          <span onClick={() => { setLevel('grid'); setSelectedCollection(null); setSelectedProduct(null); }}>Product Catalog</span>
          {selectedCollection && (
            <>
              <ChevronRight size={14} />
              <span 
                className={level === 'collection' ? 'active' : ''}
                onClick={() => { setLevel('collection'); setSelectedProduct(null); }}
              >
                {selectedCollection.name}
              </span>
            </>
          )}
          {selectedProduct && (
            <>
              <ChevronRight size={14} />
              <span className="active">{selectedProduct.name}</span>
            </>
          )}
        </div>

        {/* ---------------- LEVEL 1: GRID VIEW ---------------- */}
        {level === 'grid' && (
          <>
            <div className="page-header">
              <div>
                <h1 className="page-title">Product Catalog</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  Manage and organize all active manufacturing product lines.
                </p>
              </div>
              <button className="btn-secondary" onClick={handleAddCollection} style={{ backgroundColor: 'var(--bg-sidebar)' }}>
                <Plus size={18} />
                <span>Add New Collection</span>
              </button>
            </div>

            <div className="catalog-grid">
              {collections
                .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((col) => (
                  <div key={col.id} className="collection-card" onClick={() => handleCollectionClick(col)}>
                    <button className="collection-card-options" onClick={(e) => { e.stopPropagation(); alert('Collection settings.'); }}>
                      <MoreVertical size={16} />
                    </button>
                    
                    <div className="collection-card-icon" style={{ color: 'var(--primary-color)' }}>
                      {col.iconType === 'flask' ? <FlaskConical size={22} /> : <Folder size={22} />}
                    </div>

                    <h3 className="collection-card-title">{col.name}</h3>

                    <div className="collection-card-meta">
                      <span style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: 700, 
                        padding: '0.15rem 0.5rem', 
                        borderRadius: '4px',
                        backgroundColor: col.status === 'ACTIVE' ? '#f1f5f9' : '#fff7ed',
                        color: col.status === 'ACTIVE' ? '#475569' : '#ea580c'
                      }}>
                        {col.status}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {col.count} Products
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}

        {/* ---------------- LEVEL 2: COLLECTION DETAIL VIEW ---------------- */}
        {level === 'collection' && selectedCollection && (
          <>
            <div className="page-header">
              <div>
                <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {selectedCollection.name}
                  <Edit size={18} style={{ color: 'var(--text-light)', cursor: 'pointer' }} onClick={() => alert('Rename collection')} />
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem', maxWidth: '800px', lineHeight: '1.5' }}>
                  {selectedCollection.description}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  className="btn-outline" 
                  style={{ color: '#b91c1c', borderColor: '#fca5a5' }}
                  onClick={() => { if (confirm('Delete entire collection?')) setLevel('grid'); }}
                >
                  <Trash2 size={16} />
                  <span>Delete Collection</span>
                </button>
                <button className="btn-outline" onClick={() => alert('Edit properties')}>
                  <Edit size={16} />
                  <span>Edit Details</span>
                </button>
              </div>
            </div>

            {/* Sub Filter Row */}
            <div className="filter-card" style={{ marginTop: '2rem' }}>
              <button className="btn-secondary" onClick={() => {
                const name = prompt('Enter new Product name:');
                if (!name) return;
                const newProd = {
                  id: `PU-${Math.floor(100 + Math.random() * 900)}`,
                  name,
                  description: 'Formulated custom sealant.'
                };
                setProducts({
                  ...products,
                  [selectedCollection.id]: [...(products[selectedCollection.id] || []), newProd]
                });
              }} style={{ backgroundColor: 'var(--bg-sidebar)' }}>
                <Plus size={18} />
                <span>Add New Product</span>
              </button>
              <div className="search-input-wrapper" style={{ maxWidth: '360px' }}>
                <Search size={18} />
                <input type="text" placeholder="Search by ID or Name..." />
              </div>
            </div>

            {/* Collection Products Table */}
            <div className="table-card">
              <div className="table-wrapper">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Description</th>
                      <th style={{ width: '120px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((p) => (
                      <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => handleProductClick(p)}>
                        <td style={{ fontWeight: 600 }}>{p.id}</td>
                        <td style={{ fontWeight: 700 }}>{p.name}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{p.description}</td>
                        <td style={{ textAlign: 'center' }}>
                          <button className="btn-table-action" style={{ marginRight: '0.5rem' }} onClick={(e) => { e.stopPropagation(); handleProductClick(p); }}>
                            <Eye size={14} />
                          </button>
                          <button className="btn-table-action" style={{ color: '#ef4444' }} onClick={(e) => { e.stopPropagation(); setProducts({ ...products, [selectedCollection.id]: currentProducts.filter(item => item.id !== p.id) }); }}>
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="table-footer">
                <div className="footer-text">
                  Showing 1-{currentProducts.length} of {currentProducts.length} products
                </div>
                <div className="pagination-wrapper">
                  <button className="pagination-btn" disabled>&lt;</button>
                  <button className="pagination-btn active">1</button>
                  <button className="pagination-btn" disabled>&gt;</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ---------------- LEVEL 3: PRODUCT SPECIFICATIONS & FORMULA ---------------- */}
        {level === 'product' && selectedProduct && (
          <>
            <div className="page-header" style={{ marginBottom: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <h1 className="page-title">{selectedProduct.name}</h1>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    border: '1px solid #a7f3d0'
                  }}>
                    ACTIVE
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem', maxWidth: '900px', lineHeight: '1.5' }}>
                  High-performance, certified sealant formulation designed for industrial expansion joints, structural bonding, and demanding construction weatherproofing applications. Provides exceptional durability and long-term elasticity.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-outline" onClick={() => alert('Edit Product Properties')}>
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  className="btn-outline"
                  style={{ color: '#b91c1c', borderColor: '#fca5a5' }}
                  onClick={() => { if (confirm('Delete product?')) setLevel('collection'); }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Split specifications layout */}
            <div className="specs-layout">
              {/* Left Column: Image and Specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="product-image-card">
                  <img src="/duraseal_product_bucket.png" alt="Product Bucket" />
                  <span className="sku-badge">SKU: {selectedProduct.id}-PACK</span>
                </div>

                <div className="tech-specs-card">
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                    Technical Specs
                  </h3>
                  <div className="tech-specs-grid">
                    <div className="spec-item">
                      <span className="spec-label">Cure Time</span>
                      <span className="spec-value">24 Hours</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Viscosity</span>
                      <span className="spec-value">Thixotropic Paste</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Shelf Life</span>
                      <span className="spec-value">12 Months</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">VOC Content</span>
                      <span className="spec-value">&lt; 35 g/L</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Master Formula Card */}
              <div className="master-formula-card">
                <div className="master-formula-header">
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
                      Master Formula
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      This formula makes <strong>1,000 kg</strong> of finished product.
                    </p>
                  </div>
                  <button className="btn-primary" onClick={() => alert('New Raw Material formulation added.')} style={{ backgroundColor: 'var(--bg-sidebar)' }}>
                    <Plus size={16} />
                    <span>Add Raw Material</span>
                  </button>
                </div>

                <div className="table-wrapper">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Raw Material Name</th>
                        <th style={{ textAlign: 'right' }}>Quantity Needed (kg)</th>
                        <th style={{ textAlign: 'right' }}>%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentFormula.map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                              <div className="formula-avatar">
                                <FlaskConical size={14} />
                              </div>
                              <div>
                                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>{item.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.code}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ textAlign: 'right', fontWeight: 600 }}>{item.quantity.toFixed(1)}</td>
                          <td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>{item.percent.toFixed(1)}%</td>
                        </tr>
                      ))}
                      <tr style={{ backgroundColor: '#f8fafc', fontWeight: 700 }}>
                        <td>Total:</td>
                        <td style={{ textAlign: 'right', color: 'var(--primary-color)' }}>1,000.0</td>
                        <td style={{ textAlign: 'right' }}>100.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <footer className="page-footer">
        2026@ Orion Studios
      </footer>
    </div>
  );
}
