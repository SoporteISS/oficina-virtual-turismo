import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';
import { useKiosk } from '../../contexts/KioskContext';

const InactivityWarning: React.FC = () => {
  const { t } = useTranslation();
  const { showInactivityWarning, resetInactivityTimer, inactivityTime } = useKiosk();

  if (!showInactivityWarning) return null;

  const secondsRemaining = Math.ceil((60000 - inactivityTime) / 1000);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 rounded-full p-6">
            <AlertCircle className="h-20 w-20 text-orange-600" />
          </div>
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {t('kiosk.inactivity.title')}
        </h2>

        <p className="text-2xl text-gray-700 mb-8">
          {t('kiosk.inactivity.message')}
        </p>

        <div className="text-6xl font-bold text-orange-600 mb-8">
          {secondsRemaining}
        </div>

        <button
          onClick={resetInactivityTimer}
          className="bg-green-600 hover:bg-green-700 text-white text-2xl font-semibold px-16 py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 shadow-lg"
          aria-label={t('kiosk.inactivity.continue')}
        >
          {t('kiosk.inactivity.continue')}
        </button>
      </div>
    </div>
  );
};

export default InactivityWarning;