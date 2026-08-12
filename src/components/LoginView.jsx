import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldAlert, ArrowLeft, Factory, ShoppingBag } from 'lucide-react';

export default function LoginView({ onLogin }) {
  const [email, setEmail] = useState('admin@urjasealants.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('admin'); // 'admin' | 'salesman'
  
  // Password Reset state
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    if (selectedRole === 'salesman') {
      onLogin({ name: email.split('@')[0], role: 'Salesman', email });
    } else {
      onLogin({ name: 'JD', role: 'Plant Manager', email });
    }
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail) {
      alert('Please enter your email address.');
      return;
    }
    alert(`Reset link successfully sent to: ${resetEmail}`);
    setIsResetMode(false);
  };

  return (
    <div className="login-container">
      {/* Left panel with background image and overlay */}
      <div 
        className="login-visual-panel"
        style={{ backgroundImage: `url('/factory_login_background.png')` }}
      >
        <div className="login-visual-content">
          {isResetMode ? (
            <>
              <h1 className="login-visual-tagline">Dependable Operations.</h1>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.4' }}>
                Powering industrial production with robust, resilient software solutions designed for high-pressure environments.
              </p>
            </>
          ) : selectedRole === 'salesman' ? (
            <>
              <h1 className="login-visual-tagline">Sales Portal</h1>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.4' }}>
                Place orders, track deliveries, and manage client quotations — all in one place.
              </p>
            </>
          ) : (
            <h1 className="login-visual-tagline">Trusted Sealants & Adhesives, Every Batch</h1>
          )}
        </div>
      </div>

      {/* Right panel with forms */}
      <div className="login-form-panel">
        <div className="login-form-wrapper">
          <div className="login-logo-wrapper" style={{ marginBottom: '2rem' }}>
            <img 
              src="/urja-1.png" 
              alt="Urja Logo" 
              style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'contain' }} 
            />
            <div className="login-logo-text">
              <h2>Urja Sealants</h2>
              <p>{selectedRole === 'salesman' ? 'Sales Portal' : 'Manufacturing Portal'}</p>
            </div>
          </div>

          {/* Role Selector Tabs */}
          {!isResetMode && (
            <div style={{
              display: 'flex',
              gap: '0',
              marginBottom: '1.75rem',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              overflow: 'hidden',
              backgroundColor: '#f1f5f9'
            }}>
              <button
                type="button"
                onClick={() => { setSelectedRole('admin'); setError(''); }}
                style={{
                  flex: 1,
                  padding: '0.7rem 1rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                  backgroundColor: selectedRole === 'admin' ? 'var(--primary-color)' : 'transparent',
                  color: selectedRole === 'admin' ? 'white' : 'var(--text-muted)',
                  borderRadius: selectedRole === 'admin' ? '9px' : '0',
                }}
              >
                <Factory size={16} />
                Admin / Manager
              </button>
              <button
                type="button"
                onClick={() => { setSelectedRole('salesman'); setError(''); }}
                style={{
                  flex: 1,
                  padding: '0.7rem 1rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                  backgroundColor: selectedRole === 'salesman' ? 'var(--primary-color)' : 'transparent',
                  color: selectedRole === 'salesman' ? 'white' : 'var(--text-muted)',
                  borderRadius: selectedRole === 'salesman' ? '9px' : '0',
                }}
              >
                <ShoppingBag size={16} />
                Sales Team
              </button>
            </div>
          )}

          {/* Render Reset Password Form */}
          {isResetMode ? (
            <div>
              <div className="login-welcome" style={{ marginBottom: '1.5rem' }}>
                <h1>Reset Your Password</h1>
                <p>Enter your email and we'll send you a link to reset it.</p>
              </div>

              <form onSubmit={handleResetSubmit}>
                <div className="login-input-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="login-input-label">Email Address</label>
                  <div className="login-input-field">
                    <Mail size={18} />
                    <input 
                      type="email" 
                      placeholder="name@company.com" 
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="login-submit-btn" style={{ marginBottom: '1.5rem' }}>
                  Send Reset Link
                </button>

                <div style={{ textAlign: 'center' }}>
                  <button 
                    type="button"
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--primary-color)', 
                      fontWeight: '700', 
                      fontSize: '0.85rem', 
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onClick={() => setIsResetMode(false)}
                  >
                    <ArrowLeft size={16} />
                    <span>Back to Login</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Render Standard Login Form */
            <div>
              <div className="login-welcome">
                <h1>Welcome Back</h1>
                <p>{selectedRole === 'salesman' ? 'Sign in to place and track orders' : 'Sign in to manage your inventory'}</p>
              </div>

              {error && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#fee2e2',
                  color: '#b91c1c',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  marginBottom: '1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}>
                  <ShieldAlert size={16} />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="login-input-group">
                  <label className="login-input-label">Email or Username</label>
                  <div className="login-input-field">
                    <Mail size={18} />
                    <input 
                      type="text" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="login-input-group">
                  <label className="login-input-label">Password</label>
                  <div className="login-input-field">
                    <Lock size={18} />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Enter your password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="login-input-eye"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="login-options-row">
                  <button 
                    type="button" 
                    className="forgot-password-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    onClick={() => setIsResetMode(true)}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button type="submit" className="login-submit-btn">Log In</button>
              </form>
            </div>
          )}
        </div>

        <div className="login-copyright">
          © 2026 Urja Sealants. All rights reserved.
        </div>
      </div>
    </div>
  );
}
