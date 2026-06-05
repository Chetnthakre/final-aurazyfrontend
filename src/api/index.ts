import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');

  // Prioritize adminToken for admin routes
  if (req.url?.includes('/admin') && adminToken) {
    req.headers.Authorization = `Bearer ${adminToken}`;
  } else if (adminToken) {
    // If we have an adminToken, it can also be used for regular routes
    req.headers.Authorization = `Bearer ${adminToken}`;
  } else if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  
  return req;
});

// Response interceptor for handling 401s
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // If we get a 401 and had an adminToken, it's likely invalid/expired
      if (localStorage.getItem('adminToken')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        // Optional: Redirect to login or use a callback to notify the UI
        if (window.location.pathname.startsWith('/admin')) {
          window.location.href = '/adminarea';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const fetchProducts = () => API.get('/products');
export const fetchProduct = (id: string) => API.get(`/products/${id}`);
export const createProduct = (newProduct: any) => API.post('/products', newProduct);
export const updateProduct = (id: string, updatedProduct: any) => API.put(`/products/${id}`, updatedProduct);
export const deleteProduct = (id: string) => API.delete(`/products/${id}`);
export const uploadImage = (formData: any) => API.post('/upload', formData);

export const signIn = (formData: any) => API.post('/users/login', formData);
export const signUp = (formData: any) => API.post('/users/register', formData);
export const fetchUserProfile = () => API.get('/users/profile');

export const createPaymentOrder = (orderData: any) => API.post('/orders', orderData);
export const verifyPayment = (paymentData: any) => API.post('/payment/verify', paymentData);
export const fetchMyOrders = () => API.get('/orders/mine');

export const fetchAdminOrders = () => API.get('/orders/admin');
export const updateOrderStatus = (id: string, status: string) => API.put(`/orders/admin/${id}/status`, { status });

export const fetchAnalytics = () => API.get('/orders/admin/analytics');

