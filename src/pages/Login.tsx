import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signIn } from '../api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/profile";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const { data } = await signIn({ email, password });
      login(data, data.token);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section__container login-page">
      <div className="login-card">
        <h2>LOGIN</h2>
        <p>Please enter your details to continue.</p>
        
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="example@mail.com" 
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

          <button type="submit" className="btn login-btn" disabled={isLoading}>
            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Create one</Link></p>
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>
      </div>

      <style>{`
        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 70vh;
        }

        .login-card {
          background: #fff;
          padding: 3rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          width: 100%;
          max-width: 450px;
          text-align: center;
          color: #000;
        }

        .login-card h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          letter-spacing: 2px;
        }

        .login-card p {
          color: #737373;
          margin-bottom: 2rem;
        }

        .input-group {
          text-align: left;
          margin-bottom: 1.5rem;
        }

        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .input-group input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          outline: none;
          transition: 0.3s;
        }

        .input-group input:focus {
          border-color: var(--primary-color);
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          font-weight: 600;
          margin-top: 1rem;
        }

        .login-footer {
          margin-top: 2rem;
          font-size: 0.9rem;
        }

        .login-footer a {
          color: var(--primary-color);
          font-weight: 600;
        }

        .forgot-password {
          display: block;
          margin-top: 1rem;
          color: #999 !important;
          font-weight: 400 !important;
        }
      `}</style>
    </div>
  );
};

export default Login;
