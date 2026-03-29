import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
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
import Privacy from './pages/Legal/Privacy';
import Terms from './pages/Legal/Terms';
import Refund from './pages/Legal/Refund';
import Shipping from './pages/Legal/Shipping';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';


import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <CartDrawer />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/legal/privacy" element={<Privacy />} />
                <Route path="/legal/terms" element={<Terms />} />
                <Route path="/legal/refund" element={<Refund />} />
                <Route path="/legal/shipping" element={<Shipping />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;  

