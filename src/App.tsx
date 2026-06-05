import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminProducts from './pages/AdminProducts';
import Privacy from './pages/Legal/Privacy';
import Terms from './pages/Legal/Terms';
import Refund from './pages/Legal/Refund';
import Shipping from './pages/Legal/Shipping';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminLogin from './pages/AdminLogin';
import AdminProtectedRoute from './components/AdminProtectedRoute';

import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Customer Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/legal/privacy" element={<Privacy />} />
                <Route path="/legal/terms" element={<Terms />} />
                <Route path="/legal/refund" element={<Refund />} />
                <Route path="/legal/shipping" element={<Shipping />} />
              </Route>

              {/* Separate Admin Login Route */}
              <Route path="/adminarea" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <AdminProtectedRoute>
                    <AdminLayout />
                  </AdminProtectedRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="products" element={<AdminProducts />} />
                {/* Add more admin routes here */}
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
};

export default App;
  

