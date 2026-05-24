import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Module1 from './pages/Module1';
import Module2 from './pages/Module2';
import Learn from './pages/Learn';
import Simulate from './pages/Simulate';
import Outcomes from './pages/Outcomes';
import Progress from './pages/Progress';
import MyFlat from './pages/MyFlat';
import NegotiationScenario from './pages/NegotiationScenario';
import SpotTheMistake from './pages/SpotTheMistake';
import BottomNav from './components/BottomNav';
import './App.css';

function AppShell() {
  const { pathname } = useLocation();
  const hideNav = pathname === '/welcome';
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', overflow:'hidden' }}>
      <div style={{ flex:1, overflowY:'auto', paddingBottom: hideNav ? 0 : 60 }}>
        <Routes>
          <Route path="/welcome" element={<Onboarding />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/simulate" element={<Simulate />} />
          <Route path="/outcomes" element={<Outcomes />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/my-flat" element={<MyFlat />} />
          <Route path="/module/1" element={<Module1 />} />
          <Route path="/module/2" element={<Module2 />} />
          <Route path="/negotiation/:id" element={<NegotiationScenario />} />
          <Route path="/spot-mistake/:id" element={<SpotTheMistake />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      {!hideNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{
        maxWidth: 430,
        margin: '0 auto',
        height: '100vh',
        position: 'relative',
        boxShadow: '0 0 30px rgba(0,0,0,0.12)',
        overflow: 'hidden',
      }}>
        <AppShell />
      </div>
    </BrowserRouter>
  );
}
