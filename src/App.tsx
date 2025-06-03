import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import ContactModal from './components/ContactModal';
import AboutModal from './components/AboutModal';
import AdminPanel from './components/admin/AdminPanel';
import Login from './components/admin/Login';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { ContentProvider } from './context/ContentContext';

// Create context for modal state
export const ModalContext = React.createContext<{
  openContactModal: () => void;
  openAboutModal: () => void;
} | null>(null);

const MainLayout: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const openAboutModal = () => setIsAboutModalOpen(true);
  const closeAboutModal = () => setIsAboutModalOpen(false);

  return (
    <ModalContext.Provider value={{ openContactModal, openAboutModal }}>
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        <Background />
        <Navbar />
        <Hero />
        <Logo />
        <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
        <AboutModal isOpen={isAboutModalOpen} onClose={closeAboutModal} />
      </div>
    </ModalContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ContentProvider>
  );
};

export default App;