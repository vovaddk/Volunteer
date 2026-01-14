import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Building, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { mode } = useApp();

  const testimonials = [
    {
      organization: 'Український Червоний Хрест',
      quote: 'Volunteer+ допоміг нам зв\'язатися з сотнями відданих волонтерів, роблячи наші гуманітарні місії ефективнішими та скоординованими.',
      author: 'Марія Соколова',
      role: 'Координатор волонтерів',
    },
    {
      organization: 'Будуємо Разом',
      quote: 'Фокус платформи на безпеці та чіткій комунікації був критичним для нашої роботи на деокупованих територіях. Ми швидко знаходимо кваліфікованих волонтерів, які розуміють ризики.',
      author: 'Дмитро Коваленко',
      role: 'Менеджер проєкту',
    },
    {
      organization: 'Освіта Перш За Все',
      quote: 'Знаходити кваліфікованих волонтерів для онлайн-репетиторства завжди було складно. Volunteer+ зробив простим зв\'язок з викладачами, які бажають допомогти переміщеним дітям.',
      author: 'Олена Петрова',
      role: 'Директорка',
    },
  ];

  if (mode.frontline) {
    return null; // Skip testimonials in frontline mode
  }

  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Нам довіряють організації по всій Україні</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Послухайте відгуки організацій, які використовують Volunteer+ для координації волонтерської діяльності
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-card border border-border rounded-lg p-6 ${
                !mode.lowBandwidth ? 'shadow-md hover:shadow-lg transition-shadow' : ''
              }`}
            >
              <div className="mb-4">
                <Quote className="w-10 h-10 text-[#FFD600]" />
              </div>

              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.quote}"
              </p>

              <div className="flex items-start gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD600] to-[#0066FF] flex items-center justify-center flex-shrink-0">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="mb-0.5 truncate">{testimonial.organization}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};