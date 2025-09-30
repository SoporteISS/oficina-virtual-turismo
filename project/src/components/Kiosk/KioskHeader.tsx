import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Home, Globe, Eye, Type, X } from 'lucide-react';
import { useKiosk } from '../../contexts/KioskContext';

const KioskHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { resetInactivityTimer, toggleKioskMode } = useKiosk();
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showExitButton, setShowExitButton] = useState(false);

  const isHome = location.pathname === '/';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    resetInactivityTimer();
  };

  const toggleTextSize = () => {
    const sizes: Array<'normal' | 'large' | 'xlarge'> = ['normal', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(textSize);
    const nextSize = sizes[(currentIndex + 1) % sizes.length];
    setTextSize(nextSize);

    const root = document.documentElement;
    if (nextSize === 'large') {
      root.style.fontSize = '120%';
    } else if (nextSize === 'xlarge') {
      root.style.fontSize = '140%';
    } else {
      root.style.fontSize = '100%';
    }
    resetInactivityTimer();
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast');
    resetInactivityTimer();
  };

  const handleTitleClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 4) {
      setShowExitButton(true);
      setClickCount(0);
    }
  };

  useEffect(() => {
    if (clickCount > 0) {
      const timeout = setTimeout(() => {
        setClickCount(0);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [clickCount]);

  useEffect(() => {
    if (showExitButton) {
      const timeout = setTimeout(() => {
        setShowExitButton(false);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [showExitButton]);

  const handleExitKiosk = () => {
    if (window.confirm('¿Seguro que deseas salir del modo kiosko?')) {
      toggleKioskMode();
    }
  };

  return (
    <header className="bg-gradient-to-r from-green-700 to-blue-600 text-white shadow-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {!isHome && (
              <Link
                to="/"
                onClick={resetInactivityTimer}
                className="flex items-center space-x-3 bg-white bg-opacity-20 hover:bg-opacity-30 px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                aria-label={t('nav.home')}
              >
                <Home className="h-10 w-10" aria-hidden="true" />
                <span className="text-2xl font-semibold">{t('nav.home')}</span>
              </Link>
            )}

            <div className="text-center">
              <h1
                className="text-3xl font-bold cursor-pointer select-none"
                onClick={handleTitleClick}
              >
                {t('kiosk.title')}
              </h1>
              <p className="text-lg text-green-100">
                {new Date().toLocaleDateString(i18n.language, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {showExitButton && (
              <button
                onClick={handleExitKiosk}
                className="flex flex-col items-center bg-red-600 hover:bg-red-700 px-6 py-4 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 animate-pulse"
                aria-label="Salir del modo kiosko"
              >
                <X className="h-8 w-8 mb-1" aria-hidden="true" />
                <span className="text-sm font-medium">Salir</span>
              </button>
            )}
            <button
              onClick={toggleTextSize}
              className="flex flex-col items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-4 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              aria-label={t('accessibility.toolbar.fontSize')}
            >
              <Type className="h-8 w-8 mb-1" aria-hidden="true" />
              <span className="text-sm font-medium">
                {textSize === 'normal' ? 'A' : textSize === 'large' ? 'A+' : 'A++'}
              </span>
            </button>

            <button
              onClick={toggleHighContrast}
              className={`flex flex-col items-center px-6 py-4 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 ${
                highContrast ? 'bg-yellow-400 text-black' : 'bg-white bg-opacity-20 hover:bg-opacity-30'
              }`}
              aria-label={t('accessibility.toolbar.highContrast')}
              aria-pressed={highContrast}
            >
              <Eye className="h-8 w-8 mb-1" aria-hidden="true" />
              <span className="text-sm font-medium">
                {t('accessibility.toolbar.highContrast')}
              </span>
            </button>

            <button
              onClick={toggleLanguage}
              className="flex flex-col items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-4 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              aria-label={t('nav.language')}
            >
              <Globe className="h-8 w-8 mb-1" aria-hidden="true" />
              <span className="text-lg font-bold">
                {i18n.language === 'es' ? 'EN' : 'ES'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default KioskHeader;