import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { TruckCursor } from './components/common/TruckCursor';
import { SaathiAIAssistant } from './components/common/SaathiAIAssistant';

// Pages
import { Home } from './pages/Home';
import { ForDrivers } from './pages/ForDrivers';
import { ForTransporters } from './pages/ForTransporters';
import { HowItWorks } from './pages/HowItWorks';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Terms, Privacy } from './pages/Terms';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { DriverDashboard } from './pages/driver/DriverDashboard';
import { OwnerDashboard } from './pages/owner/OwnerDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FBF6EC] text-[#14171C]">
          <Header />
          <TruckCursor />
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/for-drivers" element={<ForDrivers />} />
              <Route path="/for-transporters" element={<ForTransporters />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/driver" element={<DriverDashboard />} />
              <Route path="/owner" element={<OwnerDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <SaathiAIAssistant />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
