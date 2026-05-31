import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster"
import { base44 } from "@/api/base44Client";
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import CurriculumPage from './pages/CurriculumPage';
import ModuleIntro from './pages/ModuleIntro';
import KolbSimulation from './pages/KolbSimulation';
import ModuleQuiz from './pages/ModuleQuiz';
import Simulator from './pages/Simulator';
import LearningOutcomes from './pages/LearningOutcomes';
import ProgressPage from './pages/ProgressPage';
import NegotiationScenario from './pages/NegotiationScenario';
import SpotMistake from './pages/SpotMistake';
import MyFlat from './pages/MyFlat';

const DEV_LOGIN_EMAIL = "rsta265@aucklanduni.ac.nz";

const DevAutoLogin = () => {
  useEffect(() => {
    const runDevLogin = async () => {
      const isLocal =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      if (!import.meta.env.DEV || !isLocal) return;

      try {
        const alreadyAuthenticated = await base44.auth.isAuthenticated();

        if (!alreadyAuthenticated) {
          await base44.auth.loginViaEmailPassword(
            DEV_LOGIN_EMAIL,
            "anything"
          );

          window.location.reload();
        }
      } catch (error) {
        console.error("Base44 local dev login failed:", error);
      }
    };

    runDevLogin();
  }, []);

  return null;
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#EEF5F0]">
        <div className="w-8 h-8 border-4 border-[#D1FAE5] border-t-[#1B4332] rounded-full animate-spin" />
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
    if (authError.type === 'auth_required') { navigateToLogin(); return null; }
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/module/:moduleId" element={<ModuleIntro />} />
        <Route path="/module/:moduleId/kolb" element={<KolbSimulation />} />
        <Route path="/module/:moduleId/quiz" element={<ModuleQuiz />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/outcomes" element={<LearningOutcomes />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/negotiation/:scenarioId" element={<NegotiationScenario />} />
        <Route path="/spot-mistake/:budgetId" element={<SpotMistake />} />
        <Route path="/my-flat" element={<MyFlat />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <DevAutoLogin />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;