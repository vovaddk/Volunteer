import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { WhatWeDoSection } from '../components/home/WhatWeDoSection';
import { TopOpportunitiesSection } from '../components/home/TopOpportunitiesSection';
import { StatisticsSection } from '../components/home/StatisticsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FAQSection } from '../components/home/FAQSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <WhatWeDoSection />
      <TopOpportunitiesSection />
      <StatisticsSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
};

export default HomePage;
