import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Mountain, Globe, Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useKiosk } from '../../contexts/KioskContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { toggleKioskMode } = useKiosk();

  const navigation = [
    { name: t('nav.accommodation'), href: '/accommodation' },
    { name: t('nav.activities'), href: '/activities' },
    { name: t('nav.routes'), href: '/routes' },
    { name: t('nav.gastronomy'), href: '/gastronomy' },
    { name: t('nav.events'), href: '/events' },
    { name: t('nav.map'), href: '/map' },
  ];

  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
  ];

  const toggleLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLanguageOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label={t('nav.main')}>
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg p-2"
              aria-label={t('nav.home')}
              aria-describedby="logo-description"
            >
              <Mountain className="h-8 w-8" aria-hidden="true" />
              <span className="hidden sm:block font-bold text-lg">Montaña Central</span>
              <span id="logo-description" className="sr-only">
                Portal oficial de turismo de la Montaña Central de Asturias
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-describedby={`nav-${item.href.slice(1)}-desc`}
              >
                {item.name}
                <span id={`nav-${item.href.slice(1)}-desc`} className="sr-only">
                  Navegar a la sección de {item.name.toLowerCase()}
                </span>
              </Link>
            ))}
            
            {/* Kiosk Mode Toggle */}
            <button
              onClick={toggleKioskMode}
              className="flex items-center space-x-1 text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Activar modo kiosko"
              title="Activar modo kiosko"
            >
              <Monitor className="h-4 w-4" aria-hidden="true" />
              <span>Kiosk</span>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-expanded={isLanguageOpen}
                aria-haspopup="true"
                aria-label={`Cambiar idioma. Idioma actual: ${i18n.language === 'es' ? 'Español' : 'English'}`}
                id="language-button"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
                <span>{i18n.language.toUpperCase()}</span>
              </button>
              
              {isLanguageOpen && (
                <div 
                  className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-labelledby="language-button"
                >
                  <div className="py-1" role="menu">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => toggleLanguage(lang.code)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                        role="menuitem"
                        aria-label={`Cambiar idioma a ${lang.name}`}
                      >
                        {lang.name}
                        {i18n.language === lang.code && (
                          <span className="sr-only"> (idioma actual)</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={t('nav.toggleMenu')}
              aria-describedby="mobile-menu-desc"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span id="mobile-menu-desc" className="sr-only">
                {isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden" id="mobile-menu" role="navigation" aria-label="Menú de navegación móvil">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                  onClick={() => setIsMenuOpen(false)}
                  aria-describedby={`mobile-nav-${item.href.slice(1)}-desc`}
                >
                  {item.name}
                  <span id={`mobile-nav-${item.href.slice(1)}-desc`} className="sr-only">
                    Navegar a {item.name.toLowerCase()} y cerrar menú
                  </span>
                </Link>
              ))}
              
              <div className="border-t pt-4 mt-4">
                <div className="px-3 text-sm font-medium text-gray-500 mb-2" role="heading" aria-level={3}>
                  {t('nav.language')}
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => toggleLanguage(lang.code)}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                    aria-label={`Cambiar idioma a ${lang.name}`}
                  >
                    {lang.name}
                    {i18n.language === lang.code && (
                      <span className="sr-only"> (idioma actual)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;