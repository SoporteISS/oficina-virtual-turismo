import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import FeaturedSection from '../components/Home/FeaturedSection';
import QuickActions from '../components/Home/QuickActions';
import WeatherWidget from '../components/Home/WeatherWidget';
import NewsSection from '../components/Home/NewsSection';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <WeatherWidget />
      <QuickActions />
      <FeaturedSection />
      <NewsSection />
    </div>
  );
};

export default Home;