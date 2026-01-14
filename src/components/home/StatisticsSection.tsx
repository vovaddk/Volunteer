import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Users, Clock, Building, Heart } from 'lucide-react';

export const StatisticsSection: React.FC = () => {
  const { mode } = useApp();

  const stats = [
    {
      icon: Users,
      value: '45,230',
      label: 'Активних волонтерів',
      subtitle: '+12% цього місяця',
    },
    {
      icon: Clock,
      value: '1.2M',
      label: 'Годин волонтерства',
      subtitle: 'Загальний внесок',
    },
    {
      icon: Building,
      value: '2,847',
      label: 'Організацій',
      subtitle: 'Перевірених партнерів',
    },
    {
      icon: Heart,
      value: '385K',
      label: 'Людей отримали допомогу',
      subtitle: 'Змінених життів',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-[#0066FF] to-[#0052CC] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-white">Наш вплив</h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Разом ми робимо реальні зміни по всій Україні
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 ${
                !mode.lowBandwidth ? 'hover:bg-white/20 transition-all' : ''
              }`}
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className={`${mode.frontline ? 'text-5xl' : 'text-4xl'} mb-2`}>
                {stat.value}
              </div>
              
              <h3 className="mb-1 text-white">{stat.label}</h3>
              
              <p className="text-sm text-white/80">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {!mode.compact && !mode.frontline && (
          <div className="mt-12 text-center">
            <p className="text-white/90 text-lg">
              Приєднуйтесь до нашої спільноти та допоможіть нам охопити ще більше людей, яким потрібна допомога
            </p>
          </div>
        )}
      </div>
    </section>
  );
};