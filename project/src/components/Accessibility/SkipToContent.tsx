import React from 'react';
import { useTranslation } from 'react-i18next';

const SkipToContent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {t('accessibility.skipToContent')}
    </a>
  );
};

export default SkipToContent;