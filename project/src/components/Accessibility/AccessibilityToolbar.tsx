import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Type, 
  Contrast, 
  MousePointer, 
  Volume2, 
  VolumeX,
  Settings,
  RotateCcw,
  Pause,
  Play,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  audioDescriptions: boolean;
  fontSize: number;
  lineHeight: number;
}

const AccessibilityToolbar: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.accommodation'), href: '/accommodation' },
    { name: t('nav.activities'), href: '/activities' },
    { name: t('nav.routes'), href: '/routes' },
    { name: t('nav.gastronomy'), href: '/gastronomy' },
    { name: t('nav.events'), href: '/events' },
    { name: t('nav.map'), href: '/map' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: false,
    audioDescriptions: false,
    fontSize: 16,
    lineHeight: 1.5
  });

  useEffect(() => {
    // Cargar configuración guardada
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applySettings(parsed);
    }

    // Detectar preferencias del sistema
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSettings(prev => ({ ...prev, reducedMotion: true }));
    }

    if (window.matchMedia('(prefers-contrast: high)').matches) {
      setSettings(prev => ({ ...prev, highContrast: true }));
    }
  }, []);

  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Alto contraste
    if (newSettings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Texto grande
    if (newSettings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Movimiento reducido
    if (newSettings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Navegación por teclado mejorada
    if (newSettings.keyboardNavigation) {
      root.classList.add('enhanced-keyboard');
    } else {
      root.classList.remove('enhanced-keyboard');
    }

    // Tamaño de fuente personalizado
    root.style.setProperty('--accessibility-font-size', `${newSettings.fontSize}px`);
    root.style.setProperty('--accessibility-line-height', newSettings.lineHeight.toString());
  };

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applySettings(newSettings);
    localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
    
    // Anunciar cambio para lectores de pantalla
    announceChange(key, value);
  };

  const announceChange = (setting: string, value: any) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `${setting} ${value ? 'activado' : 'desactivado'}`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: false,
      audioDescriptions: false,
      fontSize: 16,
      lineHeight: 1.5
    };
    
    setSettings(defaultSettings);
    applySettings(defaultSettings);
    localStorage.removeItem('accessibilitySettings');
    announceChange('Configuración', 'restablecida');
  };

  const scrollUp = () => {
    window.scrollBy({ top: -200, behavior: 'smooth' });
    announceChange('Desplazamiento', 'hacia arriba');
  };

  const scrollDown = () => {
    window.scrollBy({ top: 200, behavior: 'smooth' });
    announceChange('Desplazamiento', 'hacia abajo');
  };
  return (
    <>
      {/* Botón de accesibilidad flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75"
        aria-label="Abrir herramientas de accesibilidad"
        aria-expanded={isOpen}
        title="Herramientas de accesibilidad"
      >
        <Settings className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Panel de herramientas */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 z-50 bg-white border-2 border-blue-600 rounded-lg shadow-xl w-80 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Herramientas de Accesibilidad
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label="Cerrar herramientas de accesibilidad"
              >
                <EyeOff className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Botones de desplazamiento */}
            <div className="pb-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Navegación por página</h3>
              <div className="flex space-x-2">
                <button
                  onClick={scrollUp}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Desplazarse hacia arriba en la página"
                >
                  <ArrowUp className="h-4 w-4" aria-hidden="true" />
                  <span>Subir</span>
                </button>
                <button
                  onClick={scrollDown}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Desplazarse hacia abajo en la página"
                >
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  <span>Bajar</span>
                </button>
              </div>
            </div>

            {/* Menú de navegación */}
            <div className="pb-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Navegación del sitio</h3>
              <nav role="navigation" aria-label="Menú de navegación accesible">
                <div className="grid grid-cols-1 gap-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label={`Navegar a ${item.name}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>

            {/* Alto contraste */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Contrast className="h-4 w-4" aria-hidden="true" />
                <span>Alto contraste</span>
              </label>
              <button
                onClick={() => updateSetting('highContrast', !settings.highContrast)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.highContrast ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={settings.highContrast}
                aria-label="Alternar alto contraste"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Texto grande */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Type className="h-4 w-4" aria-hidden="true" />
                <span>Texto grande</span>
              </label>
              <button
                onClick={() => updateSetting('largeText', !settings.largeText)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.largeText ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={settings.largeText}
                aria-label="Alternar texto grande"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.largeText ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Tamaño de fuente personalizado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tamaño de fuente: {settings.fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="24"
                value={settings.fontSize}
                onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Ajustar tamaño de fuente"
              />
            </div>

            {/* Altura de línea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Espaciado de línea: {settings.lineHeight}
              </label>
              <input
                type="range"
                min="1.2"
                max="2.0"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Ajustar espaciado de línea"
              />
            </div>

            {/* Movimiento reducido */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Pause className="h-4 w-4" aria-hidden="true" />
                <span>Reducir animaciones</span>
              </label>
              <button
                onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.reducedMotion ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={settings.reducedMotion}
                aria-label="Alternar movimiento reducido"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Navegación por teclado mejorada */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <MousePointer className="h-4 w-4" aria-hidden="true" />
                <span>Navegación mejorada</span>
              </label>
              <button
                onClick={() => updateSetting('keyboardNavigation', !settings.keyboardNavigation)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.keyboardNavigation ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={settings.keyboardNavigation}
                aria-label="Alternar navegación mejorada por teclado"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.keyboardNavigation ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Descripciones de audio */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Volume2 className="h-4 w-4" aria-hidden="true" />
                <span>Descripciones de audio</span>
              </label>
              <button
                onClick={() => updateSetting('audioDescriptions', !settings.audioDescriptions)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.audioDescriptions ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={settings.audioDescriptions}
                aria-label="Alternar descripciones de audio"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.audioDescriptions ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Botón de reset */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={resetSettings}
                className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>Restablecer configuración</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityToolbar;