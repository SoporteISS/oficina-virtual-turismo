import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Accommodation from './pages/Accommodation';
import Activities from './pages/Activities';
import RoutesPage from './pages/Routes';
import Gastronomy from './pages/Gastronomy';
import Events from './pages/Events';
import Map from './pages/Map';
import Accessibility from './pages/Accessibility';
import Contact from './pages/Contact';
import ChatBot from './components/ChatBot/ChatBot';
import CookieBanner from './components/Legal/CookieBanner';
import SkipToContent from './components/Accessibility/SkipToContent';
import AccessibilityToolbar from './components/Accessibility/AccessibilityToolbar';
import ScreenReaderAnnouncements from './components/Accessibility/ScreenReaderAnnouncements';
import KeyboardNavigation from './components/Accessibility/KeyboardNavigation';
import { KioskProvider, useKiosk } from './contexts/KioskContext';
import KioskHome from './pages/KioskHome';
import KioskHeader from './components/Kiosk/KioskHeader';
import InactivityWarning from './components/Kiosk/InactivityWarning';

const AppContent: React.FC = () => {
  const { isKioskMode } = useKiosk();

  if (isKioskMode) {
    return (
      <div className="min-h-screen bg-white kiosk-mode">
        <SkipToContent />
        <ScreenReaderAnnouncements />
        <KioskHeader />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<KioskHome />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/gastronomy" element={<Gastronomy />} />
            <Route path="/events" element={<Events />} />
            <Route path="/map" element={<Map />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <InactivityWarning />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SkipToContent />
      <AccessibilityToolbar />
      <ScreenReaderAnnouncements />
      <KeyboardNavigation />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/gastronomy" element={<Gastronomy />} />
          <Route path="/events" element={<Events />} />
          <Route path="/map" element={<Map />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <ChatBot />
      <CookieBanner />
    </div>
  );
};

function App() {
  return (
    <Router>
      <KioskProvider>
        <AppContent />
      </KioskProvider>
    </Router>
  );
}

export default App;