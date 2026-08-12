import React, { useState } from 'react';
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

export default function ProductCatalogView({ user }) {
  const [level, setLevel] = useState('grid'); // 'grid' | 'collection' | 'product'
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Collections Database
  const initialCollections = [
    { id: 'C-01', name: 'Polyurethane Sealants', status: 'ACTIVE', count: 24, iconType: 'folder', description: 'High-performance moisture-cured sealants designed for heavy industrial expansion joints, structural bonding, and extreme weather sealing applications.' },
    { id: 'C-02', name: 'Silicone Adhesives', status: 'ACTIVE', count: 18, iconType: 'folder', description: 'Neutral cure industrial silicone sealants and adhesives with premium heat resistance and elasticity.' },
    { id: 'C-03', name: 'Acrylic Caulks', status: 'ACTIVE', count: 32, iconType: 'folder', description: 'Water-based flexible painters acrylics and caulking formulations for indoor construction projects.' },
    { id: 'C-04', name: 'Epoxy Resins', status: 'ACTIVE', count: 12, iconType: 'folder', description: 'Two-part heavy duty epoxy matrices and structural bonding potting resins.' },
    { id: 'C-05', name: 'R&D Formulations', status: 'DRAFTS', count: 8, iconType: 'flask', description: 'Experimental compounds and pilot run formulations under safety evaluation.' },
    { id: 'C-06', name: 'Primers & Cleaners', status: 'ACTIVE', count: 15, iconType: 'folder', description: 'Surface preparation cleaners and high adhesion organic primers.' }
  ];

  const [collections, setCollections] = useState(initialCollections);

  // 2. Collection Products Database (for Polyurethane Sealants)
  const initialProducts = [
    { id: 'PU-1042', name: 'FlexiSeal Pro Grade', description: 'Heavy-duty structural adhesive formulated for expansion joint sealing.' },
    { id: 'PU-1088', name: 'AquaStop Marine Sealant', description: 'Water-resistant polyurethane formula for direct sea-water submerged applications.' },
    { id: 'PU-2201', name: 'RapidCure Industrial', description: 'Fast-setting adhesive designed for high throughput packaging automated lines.' }
  ];

  const [products, setProducts] = useState(initialProducts);

  // 3. Product Master Formula (for DuraSeal Pro / FlexiSeal Pro Grade)
  const masterFormula = [
    { name: 'Polyol Prepolymer (PP-400)', code: 'RM-1024', quantity: 450.0, percent: 45.0 },
    { name: 'Calcium Carbonate Filler (CC-F)', code: 'RM-2099', quantity: 350.0, percent: 35.0 },
    { name: 'Plasticizer (DIDP)', code: 'RM-3100', quantity: 120.0, percent: 12.0 },
    { name: 'Thixotropic Agent (Fumed Silica)', code: 'RM-4055', quantity: 50.0, percent: 5.0 },
    { name: 'Curing Catalyst (DBTDL)', code: 'RM-8890', quantity: 30.0, percent: 3.0 }
  ];

  // Actions
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

  const handleAddProduct = () => {
    const name = prompt('Enter new Product name:');
    if (!name) return;
    const desc = prompt('Enter description:');
    const newProd = {
      id: `PU-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      description: desc || 'Formulated sealant product line.'
    };
    setProducts([...products, newProd]);
  };

  return (
    <div className="main-content">
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="navbar-brand">Manufacturing Portal</div>
        <div className="navbar-actions">
          <div className="navbar-search">
            <Search size={16} className="navbar-search-icon" />
            <input 
              type="text" 
              placeholder="Search catalog..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
              <span className="active">{selectedProduct.name || 'DuraSeal Pro'}</span>
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
              <button className="btn-secondary" onClick={handleAddCollection}>
                <Plus size={18} />
                <span>Add New Collection</span>
              </button>
            </div>

            <div className="catalog-grid">
              {collections
                .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((col) => (
                  <div key={col.id} className="collection-card" onClick={() => handleCollectionClick(col)}>
                    <button className="collection-card-options" onClick={(e) => { e.stopPropagation(); alert('Collection configuration settings.'); }}>
                      <MoreVertical size={16} />
                    </button>
                    
                    <div className="collection-card-icon">
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
                  onClick={() => { if(confirm('Delete entire collection?')) setLevel('grid'); }}
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
              <button className="btn-secondary" onClick={handleAddProduct}>
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
                    {/* Fixed listing to match the screenshot details */}
                    <tr style={{ cursor: 'pointer' }} onClick={() => handleProductClick({ id: 'DS-88G', name: 'DuraSeal Pro' })}>
                      <td style={{ fontWeight: 600 }}>DS-88G</td>
                      <td style={{ fontWeight: 700 }}>DuraSeal Pro</td>
                      <td style={{ color: 'var(--text-muted)' }}>High-performance structural polyurethane sealing compound.</td>
                      <td style={{ textAlign: 'center' }}>
                        <button className="btn-table-action" style={{ marginRight: '0.5rem' }} onClick={(e) => { e.stopPropagation(); handleProductClick({ id: 'DS-88G', name: 'DuraSeal Pro' }); }}>
                          <Eye size={14} />
                        </button>
                        <button className="btn-table-action" style={{ color: '#ef4444' }} onClick={(e) => { e.stopPropagation(); alert('Deleted product.'); }}>
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                    {products.map((p) => (
                      <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => handleProductClick(p)}>
                        <td style={{ fontWeight: 600 }}>{p.id}</td>
                        <td style={{ fontWeight: 700 }}>{p.name}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{p.description}</td>
                        <td style={{ textAlign: 'center' }}>
                          <button className="btn-table-action" style={{ marginRight: '0.5rem' }} onClick={(e) => { e.stopPropagation(); handleProductClick(p); }}>
                            <Eye size={14} />
                          </button>
                          <button className="btn-table-action" style={{ color: '#ef4444' }} onClick={(e) => { e.stopPropagation(); setProducts(products.filter(item => item.id !== p.id)); }}>
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
                  Showing 1-{products.length + 1} of 24 products
                </div>
                <div className="pagination-wrapper">
                  <button className="pagination-btn" disabled>&lt;</button>
                  <button className="pagination-btn active">1</button>
                  <button className="pagination-btn">2</button>
                  <button className="pagination-btn">3</button>
                  <span style={{ margin: '0 0.5rem', color: 'var(--text-light)' }}>...</span>
                  <button className="pagination-btn">8</button>
                  <button className="pagination-btn">&gt;</button>
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
                  <h1 className="page-title">{selectedProduct.name || 'DuraSeal Pro'}</h1>
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
                  High-performance, single-component polyurethane sealant designed for heavy-duty industrial expansion joints and demanding weatherproofing applications. Provides exceptional tear resistance and permanent elasticity.
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
                  onClick={() => { if(confirm('Delete product?')) setLevel('collection'); }}
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
                  <img src="/duraseal_product_bucket.png" alt="DuraSeal Pro Product Bucket" />
                  <span className="sku-badge">SKU: DS-PRO-5G</span>
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
                  <button className="btn-primary" onClick={() => alert('New Raw Material formulation added.')}>
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
                      {masterFormula.map((item, idx) => (
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
    </div>
  );
}
