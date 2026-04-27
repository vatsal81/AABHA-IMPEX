const API_BASE_URL = 'http://localhost:5000/api';

// Helper to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    'x-auth-token': token || ''
  };
};

// Auth
export const login = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    return data;
};

// Public Routes
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const submitInquiry = async (inquiryData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData),
    });
    if (!response.ok) throw new Error('Failed to submit inquiry');
    return await response.json();
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    throw error;
  }
};

// Admin Routes (PROTECTED)
export const fetchAllInquiries = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/inquiries`, {
          headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch inquiries');
      return await response.json();
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      return [];
    }
};

export const addProduct = async (productData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/products`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to add product');
      return await response.json();
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to update product');
      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return await response.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
};

export const deleteInquiry = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to delete inquiry');
      return await response.json();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      throw error;
    }
};

export const updateInquiryStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update inquiry');
      return await response.json();
    } catch (error) {
      console.error('Error updating inquiry:', error);
      throw error;
    }
};

// Blogs
export const fetchBlogs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const addBlog = async (blogData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(blogData),
      });
      if (!response.ok) throw new Error('Failed to add blog');
      return await response.json();
    } catch (error) {
      console.error('Error adding blog:', error);
      throw error;
    }
};

export const deleteBlog = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to delete blog');
      return await response.json();
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
};
