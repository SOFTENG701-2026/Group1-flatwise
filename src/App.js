import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Module1 from './pages/Module1';
import Module2 from './pages/Module2';
import Learn from './pages/Learn';
import MyFlat from './pages/MyFlat';
import NegotiationScenario from './pages/NegotiationScenario';
import SpotTheMistake from './pages/SpotTheMistake';
import BottomNav from './components/BottomNav';
import './App.css';

const NO_NAV_PATHS = ['/welcome'];

function AppShell() {
  const { pathname } = useLocation();
  const hideNav = NO_NAV_PATHS.some(p => pathname.startsWith(p));
  return (
    <>
      <Routes>
        <Route path="/welcome"           element={<Onboarding />} />
        <Route path="/"                  element={<Dashboard />} />
        <Route path="/learn"             element={<Learn />} />
        <Route path="/my-flat"           element={<MyFlat />} />
        <Route path="/module/1"          element={<Module1 />} />
        <Route path="/module/2"          element={<Module2 />} />
        <Route path="/negotiation/:id"   element={<NegotiationScenario />} />
        <Route path="/spot-mistake/:id"  element={<SpotTheMistake />} />
        <Route path="*"                  element={<Navigate to="/" />} />
      </Routes>
      {!hideNav && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AppShell />
      </div>
    </BrowserRouter>
  );
}
