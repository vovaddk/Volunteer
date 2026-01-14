import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Link } from '../../lib/router';
import { OpportunityCard, Opportunity } from '../cards/OpportunityCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AdaptiveButton } from '../AdaptiveButton';

export const TopOpportunitiesSection: React.FC = () => {
  const { mode, behavioralData } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const mockOpportunities: Opportunity[] = [
    {
      id: '1',
      title: 'Доставка медикаментів на передову',
      organization: 'Український Червоний Хрест',
      category: 'Medical support',
      location: 'frontline',
      format: 'offline',
      urgent: true,
      date: '22 лис, 2025',
      imageUrl:
        'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      description:
        'Термінова доставка медикаментів та обладнання до польових госпіталів в активних зонах бойових дій.',
      volunteersNeeded: 5,
    },
    {
      id: '2',
      title: 'Онлайн-репетиторство англійської для переміщених дітей',
      organization: 'Освіта Перш За Все',
      category: 'Education',
      location: 'online',
      format: 'online',
      urgent: false,
      date: '23-30 лис, 2025',
      imageUrl:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      description:
        'Допоможіть переміщеним дітям продовжити навчання через онлайн-заняття.',
      volunteersNeeded: 15,
    },
    {
      id: '3',
      title: 'Відбудова громадського центру на деокупованій території',
      organization: 'Будуємо Разом',
      category: 'Rebuilding',
      location: 'deoccupied',
      format: 'offline',
      urgent: false,
      date: '25 лис - 5 гру, 2025',
      imageUrl:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      description:
        'Приєднуйтесь до команди з відбудови громадського центру, пошкодженого під час окупації.',
      volunteersNeeded: 20,
    },
    {
      id: '4',
      title: 'Роздача гуманітарної допомоги - Київ',
      organization: 'Мережа Волонтерів',
      category: 'Humanitarian aid',
      location: 'rear',
      format: 'offline',
      urgent: false,
      date: 'Щотижня',
      imageUrl:
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      description:
        'Регулярна роздача продуктових пакетів та необхідних речей для родин, які потребують.',
      volunteersNeeded: 10,
    },
    {
      id: '5',
      title: 'Гаряча лінія психологічної підтримки',
      organization: "Ментальне Здоров'я України",
      category: 'Social support',
      location: 'online',
      format: 'online',
      urgent: true,
      date: 'Постійно',
      imageUrl: mode.lowBandwidth
        ? undefined
        : 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      description:
        'Надавайте емоційну підтримку та кризове втручання людям, постраждалим від війни.',
      volunteersNeeded: 8,
    },
  ];

  // Filter opportunities based on user behavior
  const displayOpportunities = mode.frontline
    ? mockOpportunities.filter((opp) => opp.urgent)
    : mockOpportunities;

  const itemsPerSlide = mode.compact ? 1 : mode.lowBandwidth ? 2 : 3;
  const totalSlides = Math.ceil(displayOpportunities.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleOpportunities = () => {
    const start = currentSlide * itemsPerSlide;
    const end = start + itemsPerSlide;
    return displayOpportunities.slice(start, end);
  };

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="mb-2">
              {mode.frontline ? 'Термінові можливості' : 'Топ можливостей'}
            </h2>
            {behavioralData.frequentCategories.length > 0 &&
              !mode.frontline && (
                <p className="text-sm text-[#0066FF]">
                  ✨ Рекомендовано на основі ваших інтересів
                </p>
              )}
          </div>

          <div className="flex items-center gap-4">
            {!mode.compact && totalSlides > 1 && (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-lg border border-border hover:border-[#FFD600] hover:bg-muted transition-colors"
                  aria-label="Попередня"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-muted-foreground">
                  {currentSlide + 1} / {totalSlides}
                </span>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-lg border border-border hover:border-[#FFD600] hover:bg-muted transition-colors"
                  aria-label="Наступна"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            <Link to="/search">
              <AdaptiveButton variant="outline" size="sm">
                Переглянути всі
              </AdaptiveButton>
            </Link>
          </div>
        </div>

        {/* Opportunities Grid/Slider */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleOpportunities().map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                onSelect={(id) => {
                  window.location.href = `/opportunity/${id}`;
                }}
              />
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          {totalSlides > 1 && (
            <div className="flex md:hidden items-center justify-center gap-2 mt-6">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-[#FFD600] w-8'
                      : 'bg-border hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );



  
};
