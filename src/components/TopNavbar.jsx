import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Globe, Trash2 } from 'lucide-react';

export default function TopNavbar({ user, notifications = [], onClearNotifications }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="top-navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div className="navbar-brand" style={{ fontWeight: 700, fontSize: '1.25rem', color: '#1e293b', fontFamily: 'var(--font-heading)' }}>
        Urja Portal
      </div>

      <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div className="navbar-search" style={{ position: 'relative' }}>
          <Search size={16} className="navbar-search-icon" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          <input 
            type="text" 
            placeholder="Search orders, materials..." 
            style={{ paddingLeft: '2.25rem', paddingRight: '1rem', height: '38px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem', width: '220px', backgroundColor: '#f8fafc' }}
          />
        </div>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button 
            className="icon-btn" 
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer' }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Bell size={18} style={{ color: 'var(--text-main)' }} />
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--secondary-color)' }}></span>
            )}
          </button>

          {showDropdown && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '320px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
              border: '1px solid var(--border-color)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '380px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>Notifications</span>
                {notifications.length > 0 && (
                  <button 
                    style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    onClick={() => {
                      if (onClearNotifications) onClearNotifications();
                      setShowDropdown(false);
                    }}
                  >
                    <Trash2 size={12} />
                    Clear All
                  </button>
                )}
              </div>

              <div style={{ overflowY: 'auto', flex: 1, padding: '0.5rem 0' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.85rem' }}>
                    No new alerts or warnings.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      style={{ 
                        padding: '0.75rem 1rem', 
                        borderBottom: '1px solid #f8fafc',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        fontSize: '0.8rem',
                        lineHeight: '1.4',
                        backgroundColor: notif.type === 'warning' ? '#fffaf0' : 'white'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ 
                          fontWeight: 700, 
                          color: notif.type === 'warning' ? '#c2410c' : 'var(--primary-color)',
                          textTransform: 'uppercase',
                          fontSize: '0.65rem'
                        }}>
                          {notif.type}
                        </span>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.7rem' }}>{notif.time}</span>
                      </div>
                      <p style={{ color: '#334155', margin: 0 }}>{notif.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <button className="icon-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer' }}>
          <Globe size={18} style={{ color: 'var(--text-main)' }} />
        </button>

        <div className="avatar-badge" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
          {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'MP'}
        </div>
      </div>
    </header>
  );
}
