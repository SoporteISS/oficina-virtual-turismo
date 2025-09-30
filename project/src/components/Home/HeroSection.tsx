import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MapPin } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section 
      className="relative h-screen flex items-center justify-center bg-gradient-to-r from-green-800 to-blue-700"
      role="banner"
      aria-labelledby="hero-title"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
        role="img"
        aria-label={t('hero.backgroundAlt')}
      ></div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 
          id="hero-title"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          {t('hero.title')}
        </h1>
        <p 
          className="text-xl sm:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto leading-relaxed"
          aria-describedby="hero-title"
        >
          {t('hero.subtitle')}
        </p>
        
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          role="group"
          aria-label="Acciones principales"
        >
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 flex items-center space-x-2"
            aria-describedby="explore-desc"
          >
            <span>{t('hero.cta.explore')}</span>
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
            <span id="explore-desc" className="sr-only">
              Comenzar a explorar las atracciones y servicios del destino
            </span>
          </button>
          
          <button 
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 flex items-center space-x-2"
            aria-describedby="map-desc"
          >
            <MapPin className="h-5 w-5" aria-hidden="true" />
            <span>{t('hero.cta.map')}</span>
            <span id="map-desc" className="sr-only">
              Abrir mapa interactivo con ubicaciones de interés
            </span>
          </button>
        </div>

        {/* Quick Stats */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
          role="region"
          aria-label="Estadísticas del destino"
        >
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4" role="group">
            <div className="text-3xl font-bold" aria-label="15 o más">15+</div>
            <div className="text-sm text-gray-200">{t('hero.stats.municipalities')}</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4" role="group">
            <div className="text-3xl font-bold" aria-label="200 o más">200+</div>
            <div className="text-sm text-gray-200">{t('hero.stats.routes')}</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4" role="group">
            <div className="text-3xl font-bold" aria-label="50 o más">50+</div>
            <div className="text-sm text-gray-200">{t('hero.stats.accommodations')}</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4" role="group">
            <div className="text-3xl font-bold" aria-label="100 o más">100+</div>
            <div className="text-sm text-gray-200">{t('hero.stats.activities')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;