import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Bed, Mountain, Utensils, Activity, Calendar, MapPin } from 'lucide-react';
import { useKiosk } from '../contexts/KioskContext';
import TouchFeedback from '../components/Kiosk/TouchFeedback';

const KioskHome: React.FC = () => {
  const { t } = useTranslation();
  const { resetInactivityTimer, trackInteraction } = useKiosk();

  const handleNavigationClick = (title: string, link: string) => {
    trackInteraction('navigation_click', title, link);
    resetInactivityTimer();
  };

  const navigationItems = [
    {
      icon: Bed,
      title: t('nav.accommodation'),
      description: t('quickActions.accommodationDesc'),
      link: '/accommodation',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      iconBg: 'bg-blue-700',
    },
    {
      icon: Mountain,
      title: t('nav.routes'),
      description: t('quickActions.routesDesc'),
      link: '/routes',
      bgColor: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      iconBg: 'bg-green-700',
    },
    {
      icon: Utensils,
      title: t('nav.gastronomy'),
      description: t('quickActions.gastronomyDesc'),
      link: '/gastronomy',
      bgColor: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700',
      iconBg: 'bg-orange-700',
    },
    {
      icon: Activity,
      title: t('nav.activities'),
      description: t('quickActions.activitiesDesc'),
      link: '/activities',
      bgColor: 'bg-teal-600',
      hoverColor: 'hover:bg-teal-700',
      iconBg: 'bg-teal-700',
    },
    {
      icon: Calendar,
      title: t('nav.events'),
      description: t('quickActions.eventsDesc'),
      link: '/events',
      bgColor: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      iconBg: 'bg-red-700',
    },
    {
      icon: MapPin,
      title: t('nav.map'),
      description: t('quickActions.mapDesc'),
      link: '/map',
      bgColor: 'bg-cyan-600',
      hoverColor: 'hover:bg-cyan-700',
      iconBg: 'bg-cyan-700',
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <section
        className="relative h-[25vh] min-h-[200px] max-h-[400px] flex items-center justify-center bg-gradient-to-r from-green-800 to-blue-700 shrink-0"
        role="banner"
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          }}
          role="img"
          aria-label={t('hero.backgroundAlt')}
        ></div>

        <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-lg">
            {t('kiosk.welcome')}
          </h1>
        </div>
      </section>

      <section className="py-4 sm:py-6 md:py-8 flex items-center justify-center px-4 sm:px-6 md:px-8 shrink-0">
        <div className="text-center max-w-4xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            {t('kiosk.selectOption')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600">
            {t('kiosk.touchToExplore')}
          </p>
        </div>
      </section>

      <section className="flex-1 px-3 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6 md:pb-8 shrink-0">
        <div className="h-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 auto-rows-fr">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  to={item.link}
                  onClick={() => handleNavigationClick(item.title, item.link)}
                  className="focus:outline-none focus:ring-4 sm:focus:ring-6 md:focus:ring-8 focus:ring-blue-500 focus:ring-opacity-50 rounded-2xl md:rounded-3xl min-h-[180px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[300px]"
                >
                  <TouchFeedback
                    className={`${item.bgColor} ${item.hoverColor} text-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full w-full`}
                    ariaLabel={item.title}
                  >
                    <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col items-center text-center h-full justify-center">
                      <div
                        className={`${item.iconBg} rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 mb-2 sm:mb-3 md:mb-4 shadow-lg`}
                      >
                        <Icon className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" aria-hidden="true" />
                      </div>

                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-1.5 md:mb-2 leading-tight">
                        {item.title}
                      </h3>

                      <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-snug opacity-95">
                        {item.description}
                      </p>
                    </div>
                  </TouchFeedback>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default KioskHome;