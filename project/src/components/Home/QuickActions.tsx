import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Bed, Utensils, Activity, Calendar, Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const { t } = useTranslation();

  const actions = [
    {
      icon: <Bed className="h-8 w-8" />,
      title: t('quickActions.accommodation'),
      description: t('quickActions.accommodationDesc'),
      link: '/accommodation',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <Mountain className="h-8 w-8" />,
      title: t('quickActions.routes'),
      description: t('quickActions.routesDesc'),
      link: '/routes',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: t('quickActions.gastronomy'),
      description: t('quickActions.gastronomyDesc'),
      link: '/gastronomy',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: t('quickActions.activities'),
      description: t('quickActions.activitiesDesc'),
      link: '/activities',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: t('quickActions.events'),
      description: t('quickActions.eventsDesc'),
      link: '/events',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: t('quickActions.map'),
      description: t('quickActions.mapDesc'),
      link: '/map',
      color: 'bg-teal-500 hover:bg-teal-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('quickActions.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('quickActions.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 ${action.color} text-white rounded-lg mb-4 transition-all duration-300 group-hover:scale-110`}>
                {action.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;