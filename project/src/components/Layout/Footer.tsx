import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-green-400" aria-hidden="true" />
              <span className="font-bold text-xl">Montaña Central</span>
            </div>
            <p className="text-gray-300 text-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/accommodation" className="text-gray-300 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">
                  {t('nav.accommodation')}
                </Link>
              </li>
              <li>
                <Link to="/routes" className="text-gray-300 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">
                  {t('nav.routes')}
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-gray-300 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">
                  {t('nav.activities')}
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">
                  {t('nav.events')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-gray-300 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">
                  {t('footer.accessibility')}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-300 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">
                  {t('footer.cookies')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-green-400" aria-hidden="true" />
                <span className="text-gray-300 text-sm">+34 985 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-green-400" aria-hidden="true" />
                <span className="text-gray-300 text-sm">info@montanacentral.es</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-green-400" aria-hidden="true" />
                <span className="text-gray-300 text-sm">Asturias, España</span>
              </div>
            </div>
          </div>
        </div>

        {/* EU Funding */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2024 Montaña Central de Asturias. {t('footer.rights')}
            </p>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <span className="text-xs text-gray-500">
                {t('footer.euFunding')}
              </span>
              <div className="flex space-x-2">
                <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">EU</div>
                <div className="bg-yellow-500 text-black text-xs px-2 py-1 rounded">PRTR</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;