import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox, Package, Trash2, Plus, LogOut, CheckCircle, Clock, BarChart3, Users, PieChart, TrendingUp, BookOpen, ExternalLink } from 'lucide-react';
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
    deleteBlog
} from '../services/api';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [inquiries, setInquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const initialProductState = {
    name: '', category: 'Seeds', description: '', longDescription: '', image: '', packing: '', available: true
  };

  const initialBlogState = {
    title: '', excerpt: '', content: '', author: 'Prince Patel', image: '', category: 'Market Trends', slug: ''
  };

  const [newProduct, setNewProduct] = useState(initialProductState);
  const [newBlog, setNewBlog] = useState(initialBlogState);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
        const inqData = await fetchAllInquiries();
        const prodData = await fetchProducts();
        const blogData = await fetchBlogs();
        setInquiries(inqData);
        setProducts(prodData);
        setFilteredProducts(prodData);
        setBlogs(blogData);
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
        if (editingId) await updateProduct(editingId, newProduct);
        else await addProduct(newProduct);
        setShowAddForm(false);
        setEditingId(null);
        setNewProduct(initialProductState);
        toast.success(editingId ? "Product updated!" : "Product added!");
        loadData();
    } catch (err) { toast.error("Error saving product"); }
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
                { id: 'blogs', label: `Insights (${blogs.length})`, icon: <BookOpen size={20} /> }
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
                            <div className="card-header"><h4>Recent Inquiries</h4><TrendingUp size={18} /></div>
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
                        <div className="overview-card info-list">
                            <div className="card-header"><h4>Published Insights</h4><BookOpen size={18} /></div>
                            <div className="activity-list">
                                {blogs.slice(0, 4).map((blog, i) => (
                                    <div key={i} className="activity-item">
                                        <div className="activity-dot success"></div>
                                        <div className="activity-text">
                                            <strong>{blog.title}</strong>
                                            <span>{blog.category} | {new Date(blog.publishedAt).toLocaleDateString()}</span>
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
                            <div className="form-group"><label>Short Description</label><input type="text" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} /></div>
                            <div className="form-group"><label>Detailed Description</label><textarea rows="3" value={newProduct.longDescription} onChange={e => setNewProduct({...newProduct, longDescription: e.target.value})}></textarea></div>
                            <div className="form-grid">
                                <div className="form-group"><label>Image URL</label><input type="text" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} /></div>
                                <div className="form-group"><label>Packing</label><input type="text" value={newProduct.packing} onChange={e => setNewProduct({...newProduct, packing: e.target.value})} /></div>
                            </div>
                            <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Save'}</button>
                        </form>
                    </motion.div>
                )}
                <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead><tr><th>Product</th><th>Category</th><th>Actions</th></tr></thead>
                    <tbody>
                        {filteredProducts.map(prod => (
                            <tr key={prod._id}>
                                <td><strong>{prod.name}</strong></td><td>{prod.category}</td>
                                <td className="table-actions">
                                    <button className="btn-icon" onClick={() => {setNewProduct(prod); setEditingId(prod._id); setShowAddForm(true);}}><Plus size={18} /></button>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
