import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import Matchmaking from './components/Matchmaking';
import Teams from './components/Teams';
import Turfs from './components/Turfs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';
import AuthModal from './components/AuthModal';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  useEffect(() => {
    // Initialize AOS
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
      });
    }
  }, []);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setShowDashboard(false);
    setActiveSection('home');
  };
  const handleHeroAction = (action) => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    
    if (action === 'findMatch') {
      setActiveSection('matchmaking');
    } else if (action === 'createTeam') {
      setActiveSection('teams');
    } else if (action === 'signup') {
      openAuthModal('signup');
    }
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    setShowDashboard(true);
  };

  const renderContent = () => {
    if (showDashboard) {
      return <Dashboard openModal={openModal} onBack={() => setShowDashboard(false)} user={user} />;
    }

    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero onAction={handleHeroAction} />
            <About />
            <Features />
            <Contact />
          </>
        );
      case 'matchmaking':
        return <Matchmaking openModal={openModal} user={user} />;
      case 'teams':
        return <Teams openModal={openModal} user={user} />;
      case 'turfs':
        return <Turfs openModal={openModal} user={user} />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            <Hero onAction={handleHeroAction} />
            <About />
            <Features />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onProfileClick={handleProfileClick}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={() => openAuthModal('login')}
        onLogout={handleLogout}
      />
      <main>
        {renderContent()}
      </main>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={closeAuthModal} 
        mode={authMode}
        onLogin={handleLogin}
        onSwitchMode={setAuthMode}
      />
    </div>
  );
}

export default App;