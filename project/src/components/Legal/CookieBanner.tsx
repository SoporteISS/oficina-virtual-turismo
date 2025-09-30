import React, { useState, useEffect } from 'react';
import { X, Settings, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false
  });
  const { t } = useTranslation();

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
    setIsVisible(false);
  };

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Necessary cookies can't be disabled
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {!showSettings ? (
          // Main banner
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {t('cookies.title')}
              </h2>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label={t('cookies.close')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              {t('cookies.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {t('cookies.acceptAll')}
              </button>
              
              <button
                onClick={() => setShowSettings(true)}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                {t('cookies.customize')}
              </button>
              
              <button
                onClick={handleRejectAll}
                className="text-gray-600 hover:text-gray-800 px-6 py-3 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {t('cookies.rejectAll')}
              </button>
            </div>
          </div>
        ) : (
          // Settings panel
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {t('cookies.settings')}
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label={t('cookies.back')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">{t('cookies.necessary.title')}</h3>
                  <div className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm font-medium">
                    {t('cookies.required')}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{t('cookies.necessary.description')}</p>
              </div>
              
              {/* Analytics Cookies */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">{t('cookies.analytics.title')}</h3>
                  <button
                    onClick={() => handlePreferenceChange('analytics')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      preferences.analytics ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={preferences.analytics}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <p className="text-sm text-gray-600">{t('cookies.analytics.description')}</p>
              </div>
              
              {/* Marketing Cookies */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">{t('cookies.marketing.title')}</h3>
                  <button
                    onClick={() => handlePreferenceChange('marketing')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      preferences.marketing ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={preferences.marketing}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <p className="text-sm text-gray-600">{t('cookies.marketing.description')}</p>
              </div>
              
              {/* Personalization Cookies */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">{t('cookies.personalization.title')}</h3>
                  <button
                    onClick={() => handlePreferenceChange('personalization')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      preferences.personalization ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={preferences.personalization}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.personalization ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <p className="text-sm text-gray-600">{t('cookies.personalization.description')}</p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleAcceptSelected}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
              >
                <Check className="h-4 w-4 mr-2" />
                {t('cookies.savePreferences')}
              </button>
              
              <button
                onClick={() => setShowSettings(false)}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t('cookies.cancel')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;