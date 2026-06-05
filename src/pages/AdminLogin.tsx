import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { signIn } from '../api';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const { data } = await signIn({ email, password });
      
      if (data.isAdmin) {
        adminLogin(data, data.token);
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError('Access denied. You are not an admin.');
        setIsLoading(false);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid admin credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h2>ADMIN PANEL</h2>
          <p>Sign in to manage your store</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="admin@aurazy.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="admin-btn" disabled={isLoading}>
            {isLoading ? 'AUTHENTICATING...' : 'LOGIN TO DASHBOARD'}
          </button>
        </form>
      </div>

      <style>{`
        .admin-login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f4f7f6;
        }

        .admin-login-card {
          background: #ffffff;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          width: 100%;
          max-width: 400px;
        }

        .admin-login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .admin-login-header h2 {
          font-size: 1.75rem;
          color: #333;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .admin-login-header p {
          color: #666;
          font-size: 0.9rem;
        }

        .error-message {
          background-color: #fff2f2;
          color: #d32f2f;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
          text-align: center;
          border: 1px solid #ffcdd2;
        }

        .input-group {
          margin-bottom: 1.25rem;
        }

        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          font-size: 0.85rem;
          color: #444;
        }

        .input-group input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          outline: none;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .input-group input:focus {
          border-color: #000;
        }

        .admin-btn {
          width: 100%;
          padding: 14px;
          background-color: #000;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1rem;
          transition: background-color 0.2s;
        }

        .admin-btn:hover {
          background-color: #333;
        }

        .admin-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
