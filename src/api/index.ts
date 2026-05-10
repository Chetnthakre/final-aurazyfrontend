import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

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

