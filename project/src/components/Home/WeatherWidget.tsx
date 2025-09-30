import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Cloud, CloudRain, Thermometer, Wind, Droplets } from 'lucide-react';

const WeatherWidget: React.FC = () => {
  const { t } = useTranslation();

  // Mock weather data - in real app this would come from an API
  const weatherData = {
    current: {
      temp: 18,
      condition: 'partly-cloudy',
      humidity: 65,
      windSpeed: 12,
      feelsLike: 20
    },
    forecast: [
      { day: 'today', temp: 18, condition: 'partly-cloudy' },
      { day: 'tomorrow', temp: 22, condition: 'sunny' },
      { day: 'day-after', temp: 16, condition: 'rainy' }
    ]
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'partly-cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  return (
    <section className="bg-white py-6 sm:py-8 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600" />
            {t('weather.title')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {/* Current Weather */}
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 font-medium">{t('weather.now')}</span>
                {getWeatherIcon(weatherData.current.condition)}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {weatherData.current.temp}°C
              </div>
              <div className="text-sm text-gray-500">
                {t('weather.feelsLike')} {weatherData.current.feelsLike}°C
              </div>
            </div>

            {/* Wind & Humidity */}
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Wind className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">{t('weather.wind')}</span>
                  </div>
                  <span className="font-medium">{weatherData.current.windSpeed} km/h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Droplets className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">{t('weather.humidity')}</span>
                  </div>
                  <span className="font-medium">{weatherData.current.humidity}%</span>
                </div>
              </div>
            </div>

            {/* 3-day Forecast */}
            <div className="sm:col-span-2 bg-white rounded-lg p-3 sm:p-4 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-3">{t('weather.forecast')}</h3>
              <div className="grid grid-cols-3 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm text-gray-600 mb-2">{t(`weather.${day.day}`)}</div>
                    <div className="flex justify-center mb-2">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div className="font-semibold">{day.temp}°C</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {t('weather.recommendation')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherWidget;