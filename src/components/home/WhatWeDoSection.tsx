import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Users, BookOpen, Search, Heart } from 'lucide-react';

export const WhatWeDoSection: React.FC = () => {
  const { mode } = useApp();

  const features = [
    {
      icon: Heart,
      title: 'Знання про допомогу',
      description: 'Дізнайтеся про різні способи допомоги під час війни - від підтримки фронту до гуманітарної допомоги та відбудови.',
      color: 'text-[#FF3B30]',
    },
    {
      icon: BookOpen,
      title: 'Навчання волонтерів',
      description: 'Отримайте доступ до навчальних матеріалів, правил безпеки та кращих практик для ефективного волонтерства в складних умовах.',
      color: 'text-[#0066FF]',
    },
    {
      icon: Users,
      title: 'Знайдіть волонтерів',
      description: 'Організації можуть знайти та зв\'язатися з перевіреними волонтерами, які мають потрібні навички та готові допомогти.',
      color: 'text-[#FFD600]',
    },
    {
      icon: Search,
      title: 'Всі можливості в одному місці',
      description: 'Переглядайте тисячі перевірених волонтерських можливостей по всій Україні - фільтруйте за локацією, терміновістю та типом допомоги.',
      color: 'text-[#34C759]',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Що може ця платформа?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Volunteer+ з'єднує людей, які хочуть допомогти, з організаціями, яким потрібна підтримка
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-card border border-border rounded-lg p-6 hover:border-[#FFD600] transition-all ${
                !mode.lowBandwidth ? 'shadow-sm hover:shadow-md' : ''
              } ${mode.compact ? 'p-4' : ''}`}
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                  feature.color === 'text-[#FFD600]'
                    ? 'from-[#FFD600] to-[#C7A600]'
                    : feature.color === 'text-[#0066FF]'
                    ? 'from-[#0066FF] to-[#0052CC]'
                    : feature.color === 'text-[#FF3B30]'
                    ? 'from-[#FF3B30] to-red-700'
                    : 'from-[#34C759] to-green-700'
                } flex items-center justify-center mb-4`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};