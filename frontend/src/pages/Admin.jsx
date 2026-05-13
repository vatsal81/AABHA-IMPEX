import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox, Package, Trash2, Plus, LogOut, CheckCircle, Clock, BarChart3, Users, PieChart, TrendingUp, BookOpen, ExternalLink, ShieldCheck, Upload, RefreshCcw } from 'lucide-react';
import { 
    fetchAllInquiries, 
    fetchProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    deleteInquiry, 
    updateInquiryStatus,
    fetchBlogs,
    addBlog,
    deleteBlog,
    fetchServices,
    addService,
    updateService,
    deleteService,
    fetchCertificates,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    uploadFile
} from '../services/api';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [inquiries, setInquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editingCertId, setEditingCertId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const initialProductState = {
    name: '', slug: '', category: 'Seeds', description: '', longDescription: '', image: '', packing: '', hsCode: '', 
    origin: 'India', loadingPort: 'Mundra / Pipavav, India', available: true,
    specifications: [{ label: '', value: '' }],
    nutrients: [{ label: '', value: '' }],
    uses: [],
    exportDetails: ''
  };

  const initialBlogState = {
    title: '', excerpt: '', content: '', author: 'Prince Patel', image: '', category: 'Market Trends', slug: ''
  };

  const initialServiceState = {
    title: '', description: '', icon: 'FileText', image: '', details: [''], color: 'var(--primary)'
  };

  const initialCertState = {
    name: '', fullName: '', imageUrl: '', fileUrl: '', description: ''
  };

  const [newProduct, setNewProduct] = useState(initialProductState);
  const [newBlog, setNewBlog] = useState(initialBlogState);
  const [newService, setNewService] = useState(initialServiceState);
  const [newCert, setNewCert] = useState(initialCertState);


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
        const inqData = await fetchAllInquiries();
        const prodData = await fetchProducts();
        const blogData = await fetchBlogs();
        const servData = await fetchServices();
        const certData = await fetchCertificates();
        setInquiries(inqData);
        setProducts(prodData);
        setFilteredProducts(prodData);
        setBlogs(blogData);
        setServices(servData);
        setCertificates(certData);

    } catch (err) {
        console.error("Failed to load admin data");
    }
    setLoading(false);
  };

  useEffect(() => {
    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
        return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, filterCategory, products]);

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        try {
            await deleteProduct(id);
            toast.success("Product deleted successfully");
            loadData();
        } catch (err) {
            toast.error("Failed to delete product");
        }
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Delete this insight?')) {
        try {
            await deleteBlog(id);
            toast.success("Insight removed");
            loadData();
        } catch (err) {
            toast.error("Failed to delete blog");
        }
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm('Delete this inquiry?')) {
        try {
            await deleteInquiry(id);
            toast.success("Inquiry removed");
            loadData();
        } catch (err) {
            toast.error("Failed to delete inquiry");
        }
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
        await updateInquiryStatus(id, 'Resolved');
        toast.success("Inquiry marked as resolved");
        loadData();
    } catch (err) {
        toast.error("Failed to update status");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
        // Auto-generate slug if not provided
        const generatedSlug = newProduct.slug || newProduct.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const productToSave = { ...newProduct, slug: generatedSlug };
        
        if (editingId) await updateProduct(editingId, productToSave);
        else await addProduct(productToSave);
        
        setShowAddForm(false);
        setEditingId(null);
        setNewProduct(initialProductState);
        toast.success(editingId ? "Product updated!" : "Product added!");
        loadData();
    } catch (err) { 
        console.error("Error saving product:", err);
        toast.error("Error saving product. Make sure the name is unique."); 
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
        const blogToSave = { ...newBlog, slug: newBlog.title.toLowerCase().replace(/ /g, '-') };
        await addBlog(blogToSave);
        setShowBlogForm(false);
        setNewBlog(initialBlogState);
        toast.success("Insight published!");
        loadData();
    } catch (err) { toast.error("Error saving insight"); }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
        if (editingServiceId) await updateService(editingServiceId, newService);
        else await addService(newService);
        
        setShowServiceForm(false);
        setEditingServiceId(null);
        setNewService(initialServiceState);
        toast.success(editingServiceId ? "Service updated!" : "Service added!");
        loadData();
    } catch (err) { toast.error("Error saving service"); }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Delete this service?')) {
        try {
            await deleteService(id);
            toast.success("Service removed");
            loadData();
        } catch (err) {
            toast.error("Failed to delete service");
        }
    }
  };

  const handleEditService = (serv) => {
    setNewService({
        ...initialServiceState,
        ...serv,
        details: serv.details || ['']
    });
    setEditingServiceId(serv._id);
    setShowServiceForm(true);
  };

  const handleFileUpload = async (e, type, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
        const { url } = await uploadFile(file);
        const apiBase = import.meta.env.VITE_API_URL || '/api';
        const baseUrl = apiBase.startsWith('http') ? apiBase.replace('/api', '') : window.location.origin;
        const fullUrl = `${baseUrl}${url}`;
        
        if (type === 'service') {
            setNewService(prev => ({ ...prev, [field]: fullUrl }));
        } else if (type === 'certificate') {
            setNewCert(prev => ({ ...prev, [field]: fullUrl }));
        } else if (type === 'product') {
            setNewProduct(prev => ({ ...prev, [field]: fullUrl }));
        }
        
        toast.success("File uploaded successfully");
    } catch (err) {
        toast.error("Upload failed");
    } finally {
        setUploading(false);
    }
  };

  const handleAddCert = async (e) => {
    e.preventDefault();
    try {
        if (editingCertId) await updateCertificate(editingCertId, newCert);
        else await addCertificate(newCert);
        
        setShowCertForm(false);
        setEditingCertId(null);
        setNewCert(initialCertState);
        toast.success(editingCertId ? "Certificate updated!" : "Certificate added!");
        loadData();
    } catch (err) { toast.error("Error saving certificate"); }
  };

  const handleDeleteCert = async (id) => {
    if (window.confirm('Delete this certificate?')) {
        try {
            await deleteCertificate(id);
            toast.success("Certificate removed");
            loadData();
        } catch (err) {
            toast.error("Failed to delete certificate");
        }
    }
  };

  const handleEditCert = (cert) => {
    setNewCert({ ...initialCertState, ...cert });
    setEditingCertId(cert._id);
    setShowCertForm(true);
  };

  const handleEditProduct = (prod) => {
    setNewProduct({
        ...initialProductState,
        ...prod,
        specifications: prod.specifications || [{ label: '', value: '' }],
        nutrients: prod.nutrients || [{ label: '', value: '' }],
        uses: prod.uses || []
    });
    setEditingId(prod._id);
    setShowAddForm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '../login';
  };

  return (
    <div className="admin-page">
      <section className="page-header">
        <div className="container admin-header-content">
          <div>
            <h1>Admin Control Center</h1>
            <p>Unified management for products, inquiries, and trade insights.</p>
          </div>
          <button className="btn btn-outline-white" onClick={handleLogout}><LogOut size={18} /> Logout</button>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="admin-tabs">
            {[
                { id: 'overview', label: 'Overview', icon: <BarChart3 size={20} /> },
                { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: <Inbox size={20} /> },
                { id: 'products', label: `Products (${products.length})`, icon: <Package size={20} /> },
                { id: 'blogs', label: `Insights (${blogs.length})`, icon: <BookOpen size={20} /> },
                { id: 'services', label: `Services (${services.length})`, icon: <Users size={20} /> },
                { id: 'certificates', label: `Certificates (${certificates.length})`, icon: <ShieldCheck size={20} /> }
            ].map(tab => (
                <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                    {tab.icon} {tab.label}
                </button>
            ))}
          </div>

          <div className="admin-content">
            {activeTab === 'overview' && (
                <div className="admin-overview">
                    <div className="stats-grid-premium">
                        <div className="stat-card-modern">
                            <div className="stat-icon-bg"><Users size={24} /></div>
                            <div className="stat-details"><h3>{inquiries.length}</h3><p>Total Inquiries</p></div>
                            <div className="stat-trend positive"><TrendingUp size={14} /> +12%</div>
                        </div>
                        <div className="stat-card-modern">
                            <div className="stat-icon-bg warning"><Clock size={24} /></div>
                            <div className="stat-details"><h3>{inquiries.filter(i => i.status !== 'Resolved').length}</h3><p>Pending Action</p></div>
                        </div>
                        <div className="stat-card-modern">
                            <div className="stat-icon-bg primary"><Package size={24} /></div>
                            <div className="stat-details"><h3>{products.length}</h3><p>Active Products</p></div>
                        </div>
                        <div className="stat-card-modern">
                            <div className="stat-icon-bg success"><CheckCircle size={24} /></div>
                            <div className="stat-details"><h3>{inquiries.filter(i => i.status === 'Resolved').length}</h3><p>Resolved Cases</p></div>
                        </div>
                    </div>

                    <div className="overview-charts-grid">
                        <div className="overview-card info-list">
                            <div className="card-header"><h4>Inquiry Distribution</h4><PieChart size={18} /></div>
                            <div className="simple-bar-chart">
                                {['Seeds', 'Spices', 'Pulses', 'Other'].map(cat => {
                                    const count = inquiries.filter(inq => inq.subject?.toLowerCase().includes(cat.toLowerCase())).length;
                                    const percentage = inquiries.length > 0 ? (count / inquiries.length) * 100 : 0;
                                    return (
                                        <div key={cat} className="bar-wrapper">
                                            <motion.div 
                                                className="bar-fill-premium" 
                                                initial={{ height: 0 }}
                                                animate={{ height: `${Math.max(percentage, 5)}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                            >
                                                <span className="bar-tooltip">{count}</span>
                                            </motion.div>
                                            <span className="bar-label">{cat}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="overview-card info-list">
                            <div className="card-header"><h4>Recent Activity</h4><TrendingUp size={18} /></div>
                            <div className="activity-list">
                                {inquiries.slice(0, 4).map((inq, i) => (
                                    <div key={i} className="activity-item">
                                        <div className="activity-dot"></div>
                                        <div className="activity-text">
                                            <strong>{inq.name}</strong> inquiry about <em>{inq.subject}</em>
                                            <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="inquiries-list">
                {inquiries.length === 0 ? <p className="empty-msg">No inquiries yet.</p> : 
                  inquiries.map((inq) => (
                    <div key={inq._id} className="inquiry-card">
                      <div className="inquiry-status">
                          {inq.status === 'Resolved' ? <CheckCircle size={16} color="#28a745" /> : <Clock size={16} />}
                          <span>{inq.status || 'Pending'} | {new Date(inq.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="inquiry-main">
                          <h3>{inq.name}</h3>
                          <p className="inq-email">{inq.email} | {inq.phone}</p>
                          <p className="inq-subject"><strong>Subject:</strong> {inq.subject}</p>
                          <p className="inq-msg">"{inq.message}"</p>
                      </div>
                      <div className="inquiry-actions">
                          {inq.status !== 'Resolved' && (
                              <button className="btn-icon" onClick={() => handleUpdateStatus(inq._id)} title="Mark as Resolved"><CheckCircle size={20} /></button>
                          )}
                          <button className="btn-icon delete" onClick={() => handleDeleteInquiry(inq._id)} title="Delete"><Trash2 size={20} /></button>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}

            {activeTab === 'products' && (
              <div className="products-admin">
                <div className="admin-actions">
                    <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                        {showAddForm ? 'Cancel' : <><Plus size={18} /> Add New Product</>}
                    </button>
                    {!showAddForm && (
                        <div className="admin-filters">
                            <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="search-input" />
                            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="filter-select">
                                <option value="All">All Categories</option>
                                <option value="Seeds">Seeds</option><option value="Pulses">Pulses</option><option value="Spices">Spices</option><option value="Construction">Construction</option>
                            </select>
                        </div>
                    )}
                </div>
                {showAddForm && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="add-product-container">
                        <form className="add-product-form" onSubmit={handleAddProduct}>
                            <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                            <div className="form-grid">
                                <div className="form-group"><label>Name</label><input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required /></div>
                                <div className="form-group"><label>Category</label><select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}><option>Seeds</option><option>Pulses</option><option>Spices</option><option>Construction</option></select></div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group"><label>HS Code</label><input type="text" value={newProduct.hsCode} onChange={e => setNewProduct({...newProduct, hsCode: e.target.value})} placeholder="e.g. 1001.10" /></div>
                                <div className="form-group"><label>Origin</label><input type="text" value={newProduct.origin} onChange={e => setNewProduct({...newProduct, origin: e.target.value})} /></div>
                            </div>
                            <div className="form-group"><label>Loading Port</label><input type="text" value={newProduct.loadingPort} onChange={e => setNewProduct({...newProduct, loadingPort: e.target.value})} /></div>
                            <div className="form-group"><label>Short Description</label><input type="text" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} /></div>
                            <div className="form-group"><label>Detailed Description</label><textarea rows="3" value={newProduct.longDescription} onChange={e => setNewProduct({...newProduct, longDescription: e.target.value})}></textarea></div>
                            <div className="form-grid">
                                <div className="form-group"><label>Image URL</label><input type="text" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} /></div>
                            </div>
                            
                            <div className="form-section-title">Specifications</div>
                            {newProduct.specifications?.map((spec, i) => (
                                <div key={i} className="dynamic-row">
                                    <input placeholder="Label" value={spec.label} onChange={e => {
                                        const nextSpecs = [...newProduct.specifications];
                                        nextSpecs[i].label = e.target.value;
                                        setNewProduct({...newProduct, specifications: nextSpecs});
                                    }} />
                                    <input placeholder="Value" value={spec.value} onChange={e => {
                                        const nextSpecs = [...newProduct.specifications];
                                        nextSpecs[i].value = e.target.value;
                                        setNewProduct({...newProduct, specifications: nextSpecs});
                                    }} />
                                    <button type="button" onClick={() => {
                                        const nextSpecs = newProduct.specifications.filter((_, idx) => idx !== i);
                                        setNewProduct({...newProduct, specifications: nextSpecs});
                                    }}><Trash2 size={16} /></button>
                                </div>
                            ))}
                            <button type="button" className="btn-add-row" onClick={() => setNewProduct({...newProduct, specifications: [...(newProduct.specifications || []), {label:'', value:''}]})}>+ Add Spec</button>

                            <div className="form-section-title">Nutrients</div>
                            {newProduct.nutrients?.map((n, i) => (
                                <div key={i} className="dynamic-row">
                                    <input placeholder="Nutrient" value={n.label} onChange={e => {
                                        const next = [...newProduct.nutrients];
                                        next[i].label = e.target.value;
                                        setNewProduct({...newProduct, nutrients: next});
                                    }} />
                                    <input placeholder="Value" value={n.value} onChange={e => {
                                        const next = [...newProduct.nutrients];
                                        next[i].value = e.target.value;
                                        setNewProduct({...newProduct, nutrients: next});
                                    }} />
                                    <button type="button" onClick={() => {
                                        const next = newProduct.nutrients.filter((_, idx) => idx !== i);
                                        setNewProduct({...newProduct, nutrients: next});
                                    }}><Trash2 size={16} /></button>
                                </div>
                            ))}
                            <button type="button" className="btn-add-row" onClick={() => setNewProduct({...newProduct, nutrients: [...(newProduct.nutrients || []), {label:'', value:''}]})}>+ Add Nutrient</button>

                            <div className="form-group"><label>Uses (comma separated)</label><input type="text" value={Array.isArray(newProduct.uses) ? newProduct.uses.join(', ') : newProduct.uses} onChange={e => setNewProduct({...newProduct, uses: e.target.value.split(',').map(u => u.trim())})} /></div>
                            <div className="form-group"><label>Export Details</label><textarea rows="3" value={newProduct.exportDetails} onChange={e => setNewProduct({...newProduct, exportDetails: e.target.value})}></textarea></div>
                            <div className="form-group"><label>Packing</label><input type="text" value={newProduct.packing} onChange={e => setNewProduct({...newProduct, packing: e.target.value})} /></div>
                            
                            <button type="submit" className="btn btn-primary btn-save-main">
                                {editingId ? <><RefreshCcw size={18} /> Update Product</> : <><CheckCircle size={18} /> Save Product</>}
                            </button>
                        </form>
                    </motion.div>
                )}
                <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead><tr><th>Product</th><th>Category</th><th>Actions</th></tr></thead>
                    <tbody>
                        {filteredProducts?.map(prod => (
                            <tr key={prod._id}>
                                <td><strong>{prod.name}</strong></td><td>{prod.category}</td>
                                <td className="table-actions">
                                    <button className="btn-icon" onClick={() => handleEditProduct(prod)}><Plus size={18} /></button>
                                    <button className="btn-icon delete" onClick={() => handleDeleteProduct(prod._id)}><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
              </div>
            )}

            {activeTab === 'blogs' && (
                <div className="blogs-admin">
                    <div className="admin-actions">
                        <button className="btn btn-primary" onClick={() => setShowBlogForm(!showBlogForm)}>
                            {showBlogForm ? 'Cancel' : <><Plus size={18} /> Publish New Insight</>}
                        </button>
                    </div>
                    {showBlogForm && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="add-product-container">
                            <form className="add-product-form" onSubmit={handleAddBlog}>
                                <h3>Publish Trade Insight</h3>
                                <div className="form-group"><label>Title</label><input type="text" value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} required /></div>
                                <div className="form-group"><label>Excerpt</label><input type="text" value={newBlog.excerpt} onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})} required /></div>
                                <div className="form-group"><label>Full Content (HTML allowed)</label><textarea rows="6" value={newBlog.content} onChange={e => setNewBlog({...newBlog, content: e.target.value})} required></textarea></div>
                                <div className="form-grid">
                                    <div className="form-group"><label>Category</label><select value={newBlog.category} onChange={e => setNewBlog({...newBlog, category: e.target.value})}><option>Market Trends</option><option>Trade Education</option><option>Compliance</option><option>Logistics</option></select></div>
                                    <div className="form-group"><label>Image URL</label><input type="text" value={newBlog.image} onChange={e => setNewBlog({...newBlog, image: e.target.value})} /></div>
                                </div>
                                <button type="submit" className="btn btn-primary">Publish Insight</button>
                            </form>
                        </motion.div>
                    )}
                    <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Title</th><th>Category</th><th>Published</th><th>Actions</th></tr></thead>
                        <tbody>
                            {blogs.map(blog => (
                                <tr key={blog._id}>
                                    <td><strong>{blog.title}</strong></td>
                                    <td>{blog.category}</td>
                                    <td>{new Date(blog.publishedAt).toLocaleDateString()}</td>
                                    <td className="table-actions">
                                        <button className="btn-icon delete" onClick={() => handleDeleteBlog(blog._id)}><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            )}

            {activeTab === 'services' && (
                <div className="services-admin">
                    <div className="admin-actions">
                        <button className="btn btn-primary" onClick={() => setShowServiceForm(!showServiceForm)}>
                            {showServiceForm ? 'Cancel' : <><Plus size={18} /> Add New Service</>}
                        </button>
                    </div>
                    {showServiceForm && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="add-product-container">
                            <form className="add-product-form" onSubmit={handleAddService}>
                                <h3>{editingServiceId ? 'Edit Service' : 'Add New Service'}</h3>
                                <div className="form-group"><label>Service Title</label><input type="text" value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} required /></div>
                                <div className="form-group"><label>Description</label><textarea rows="3" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} required></textarea></div>
                                <div className="form-grid">
                                    <div className="form-group"><label>Lucide Icon Name</label><input type="text" value={newService.icon} onChange={e => setNewService({...newService, icon: e.target.value})} placeholder="e.g. Ship, FileText, Globe" /></div>
                                    <div className="form-group"><label>Accent Color</label><input type="text" value={newService.color} onChange={e => setNewService({...newService, color: e.target.value})} placeholder="e.g. var(--primary) or #d4af37" /></div>
                                </div>
                                <div className="form-group">
                                    <label>Service Image (Upload from device)</label>
                                    <div className="upload-wrapper">
                                        <input type="file" onChange={(e) => handleFileUpload(e, 'service', 'image')} accept="image/*" />
                                        {uploading && <span className="upload-spinner">Uploading...</span>}
                                    </div>
                                    {newService.image && (
                                        <div className="upload-preview-small">
                                            <img src={newService.image} alt="Preview" />
                                            <span>File uploaded</span>
                                        </div>
                                    )}
                                </div>
                                <div className="form-section-title">Service Highlights (Details)</div>
                                {newService.details?.map((detail, i) => (
                                    <div key={i} className="dynamic-row">
                                        <input placeholder="Feature/Detail" value={detail} onChange={e => {
                                            const nextDetails = [...newService.details];
                                            nextDetails[i] = e.target.value;
                                            setNewService({...newService, details: nextDetails});
                                        }} />
                                        <button type="button" onClick={() => {
                                            const nextDetails = newService.details.filter((_, idx) => idx !== i);
                                            setNewService({...newService, details: nextDetails});
                                        }}><Trash2 size={16} /></button>
                                    </div>
                                ))}
                                <button type="button" className="btn-add-row" onClick={() => setNewService({...newService, details: [...(newService.details || []), '']})}>+ Add Highlight</button>
                                <button type="submit" className="btn btn-primary">{editingServiceId ? 'Update Service' : 'Save Service'}</button>
                            </form>
                        </motion.div>
                    )}
                    <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Service</th><th>Icon</th><th>Details</th><th>Actions</th></tr></thead>
                        <tbody>
                            {services.map(serv => (
                                <tr key={serv._id}>
                                    <td><strong>{serv.title}</strong></td>
                                    <td>{serv.icon}</td>
                                    <td>{serv.details?.length || 0} items</td>
                                    <td className="table-actions">
                                        <button className="btn-icon" onClick={() => handleEditService(serv)}><Plus size={18} /></button>
                                        <button className="btn-icon delete" onClick={() => handleDeleteService(serv._id)}><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            )}

            {activeTab === 'certificates' && (
                <div className="certificates-admin">
                    <div className="admin-actions">
                        <button className="btn btn-primary" onClick={() => setShowCertForm(!showCertForm)}>
                            {showCertForm ? 'Cancel' : <><Plus size={18} /> Add New Certificate</>}
                        </button>
                    </div>
                    {showCertForm && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="add-product-container">
                            <form className="add-product-form" onSubmit={handleAddCert}>
                                <h3>{editingCertId ? 'Edit Certificate' : 'Add New Certificate'}</h3>
                                <div className="form-group"><label>Certificate Name (Short)</label><input type="text" value={newCert.name} onChange={e => setNewCert({...newCert, name: e.target.value})} placeholder="e.g. APEDA" required /></div>
                                <div className="form-group"><label>Authority Full Name</label><input type="text" value={newCert.fullName} onChange={e => setNewCert({...newCert, fullName: e.target.value})} placeholder="e.g. Agricultural & Processed Food Products Export Development Authority" required /></div>
                                <div className="form-group"><label>Authority Logo URL</label><input type="text" value={newCert.imageUrl} onChange={e => setNewCert({...newCert, imageUrl: e.target.value})} placeholder="Optional icon link" /></div>
                                <div className="form-group">
                                    <label>Certificate File (Upload Image or PDF)</label>
                                    <div className="upload-wrapper">
                                        <input type="file" onChange={(e) => handleFileUpload(e, 'certificate', 'fileUrl')} accept="image/*,.pdf" />
                                        {uploading && <span className="upload-spinner">Uploading...</span>}
                                    </div>
                                    {newCert.fileUrl && (
                                        <div className="upload-preview-small">
                                            <span className="file-name-info">
                                                {newCert.fileUrl.split('/').pop()} 
                                                {newCert.fileUrl.toLowerCase().endsWith('.pdf') ? ' (PDF Document)' : ' (Image)'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group"><label>Description</label><textarea rows="2" value={newCert.description} onChange={e => setNewCert({...newCert, description: e.target.value})}></textarea></div>
                                <button type="submit" className="btn btn-primary">{editingCertId ? 'Update Certificate' : 'Save Certificate'}</button>
                            </form>
                        </motion.div>
                    )}
                    <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Certificate</th><th>Authority</th><th>Actions</th></tr></thead>
                        <tbody>
                            {certificates.map(cert => (
                                <tr key={cert._id}>
                                    <td><strong>{cert.name}</strong></td>
                                    <td>{cert.fullName}</td>
                                    <td className="table-actions">
                                        <button className="btn-icon" onClick={() => handleEditCert(cert)}><Plus size={18} /></button>
                                        <button className="btn-icon delete" onClick={() => handleDeleteCert(cert._id)}><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            )}
          </div>


        </div>
      </section>
    </div>
  );
};

export default Admin;
