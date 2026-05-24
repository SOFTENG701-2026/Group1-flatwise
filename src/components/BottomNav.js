import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TABS = [
  { path: '/',           icon: '🏠', label: 'Home'     },
  { path: '/learn',      icon: '📚', label: 'Learn'    },
  { path: '/simulate',   icon: '🎮', label: 'Simulate' },
  { path: '/progress',   icon: '📈', label: 'Progress' },
  { path: '/my-flat',    icon: '👥', label: 'My Flat'  },
];

export default function BottomNav() {
  const navigate  = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'white',
      borderTop: '1px solid #E5E7EB',
      display: 'flex',
      zIndex: 100,
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {TABS.map(tab => {
        const active = pathname === tab.path ||
          (tab.path !== '/' && pathname.startsWith(tab.path));
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              padding: '8px 0 6px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span style={{
              fontSize: 10,
              fontWeight: active ? 700 : 500,
              color: active ? '#1B4332' : '#9CA3AF',
              letterSpacing: 0.2,
            }}>
              {tab.label}
            </span>
            {active && (
              <span style={{
                width: 4, height: 4, borderRadius: '50%',
                background: '#1B4332', marginTop: 1,
              }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
