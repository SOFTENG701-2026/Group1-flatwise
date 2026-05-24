import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const icons = {
  home: (f) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none">{f?<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#111827"/>:<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5zm2-17.17L19.59 10H18v8h-3v-6H9v6H6v-8H4.41L12 2.83z" fill="#9CA3AF"/>}</svg>,
  learn: (f) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none">{f?<path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 3.75.4 5.5 1.5 1.65-1.05 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z" fill="#111827"/>:<path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 3.75.4 5.5 1.5 1.65-1.05 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" fill="#9CA3AF"/>}</svg>,
  simulate: (f) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none">{f?<path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5S14.67 12 15.5 12s1.5.67 1.5 1.5S16.33 15 15.5 15zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5S19.33 12 18.5 12z" fill="#111827"/>:<path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8zm-10-1h-2v-3H6v-2h3V8h2v3h3v2h-3zM15.5 15c-.83 0-1.5-.67-1.5-1.5S14.67 12 15.5 12s1.5.67 1.5 1.5S16.33 15 15.5 15zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5S19.33 12 18.5 12z" fill="#9CA3AF"/>}</svg>,
  outcomes: (f) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={f?"#111827":"#9CA3AF"} strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="5" stroke={f?"#111827":"#9CA3AF"} strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="2" fill={f?"#111827":"#9CA3AF"}/></svg>,
  progress: (f) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="10" width="4" height="10" rx="1" fill={f?"#111827":"#9CA3AF"}/><rect x="10" y="6" width="4" height="14" rx="1" fill={f?"#111827":"#9CA3AF"}/><rect x="16" y="13" width="4" height="7" rx="1" fill={f?"#111827":"#9CA3AF"}/></svg>,
  myflat: (f) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none">{f?<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#111827"/>:<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#9CA3AF"/>}</svg>,
};

const TABS = [
  { path: '/',         key: 'home',     label: 'Home'     },
  { path: '/learn',    key: 'learn',    label: 'Learn'    },
  { path: '/simulate', key: 'simulate', label: 'Simulate' },
  { path: '/outcomes', key: 'outcomes', label: 'Outcomes' },
  { path: '/progress', key: 'progress', label: 'Progress' },
  { path: '/my-flat',  key: 'myflat',   label: 'My Flat'  },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <nav style={{
      height: 60,
      background: 'white',
      borderTop: '1px solid #E5E7EB',
      display: 'flex',
      flexShrink: 0,
    }}>
      {TABS.map(tab => {
        const active = pathname === tab.path || (tab.path !== '/' && pathname.startsWith(tab.path));
        return (
          <button key={tab.path} onClick={() => navigate(tab.path)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 2, padding: '6px 0',
          }}>
            {icons[tab.key](active)}
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? '#111827' : '#9CA3AF' }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
