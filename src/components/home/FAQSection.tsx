import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ChevronDown, Users, Building, HelpCircle } from 'lucide-react';

type FAQCategory = 'volunteers' | 'organizations' | 'general';

interface FAQ {
  question: string;
  answer: string;
  category: FAQCategory;
}

export const FAQSection: React.FC = () => {
  const { mode } = useApp();
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('volunteers');
  const [openQuestions, setOpenQuestions] = useState<number[]>([0]);

  const faqs: FAQ[] = [
    {
      category: 'volunteers',
      question: 'Як мені почати волонтерити?',
      answer: 'Створіть обліковий запис, заповніть свій профіль з вашими навичками та доступністю, потім переглядайте можливості, які відповідають вашим інтересам. Ви можете фільтрувати за локацією, терміновістю та типом необхідної допомоги.',
    },
    {
      category: 'volunteers',
      question: 'Чи безпечно волонтерити на передовій?',
      answer: 'Безпека - наш головний пріоритет. Усі можливості на передовій включають детальні інструктажі з безпеки, обов\'язкове навчання та чіткі оцінки ризиків. Ніколи не приймайте завдання, з якими вам некомфортно, і завжди дотримуйтесь протоколів безпеки.',
    },
    {
      category: 'volunteers',
      question: 'Чи можу я волонтерити онлайн з-за кордону?',
      answer: 'Так! Багато можливостей є повністю віддаленими, включаючи репетиторство, переклад, адміністративну підтримку та навчання цифровим навичкам. Фільтруйте за форматом "Онлайн", щоб побачити ці можливості.',
    },
    {
      category: 'volunteers',
      question: 'Що якщо у мене обмежений час?',
      answer: 'У нас є можливості від одноразових завдань до постійних зобов\'язань. Ви можете вказати свою доступність у профілі, і система рекомендуватиме можливості, які підходять вашому графіку.',
    },
    {
      category: 'organizations',
      question: 'Як зареєструвати мою організацію?',
      answer: 'Створіть обліковий запис організації та надішліть документи для верифікації. Наша команда розглядає заявки протягом 48 годин. Верифіковані організації отримують доступ до бази волонтерів і можуть публікувати можливості.',
    },
    {
      category: 'organizations',
      question: 'Скільки це коштує?',
      answer: 'Volunteer+ абсолютно безкоштовний для всіх організацій, що працюють у сфері гуманітарної допомоги, освіти, відбудови та соціальної підтримки. Наша платформа фінансується за рахунок грантів та пожертв.',
    },
    {
      category: 'organizations',
      question: 'Чи можемо ми запросити конкретні навички?',
      answer: 'Так! Під час створення можливостей ви можете вказати необхідні навички, рівень досвіду, мови та сертифікати. Наша система підбору надаватиме пріоритет волонтерам, які відповідають вашим критеріям.',
    },
    {
      category: 'organizations',
      question: 'Як ми забезпечуємо безпеку волонтерів?',
      answer: 'Ви повинні надавати детальні інструктажі з безпеки, необхідне обладнання та чіткі оцінки ризиків для всіх можливостей. Для роботи на передовій мають прийматися лише верифіковані та навчені волонтери.',
    },
    {
      category: 'general',
      question: 'Що таке Режим Передової?',
      answer: 'Режим Передової - це спрощений інтерфейс, розроблений для нестабільних умов. Він зменшує використання трафіку, показує більші кнопки, надає пріоритет термінових запитів і забезпечує швидкий доступ до інформації про безпеку.',
    },
    {
      category: 'general',
      question: 'Як працює режим низької пропускної здатності?',
      answer: 'Режим низької пропускної здатності зменшує використання даних шляхом видалення зображень, спрощення макетів і кешування контенту. Ідеально підходить для районів з поганим інтернет-з\'єднанням.',
    },
    {
      category: 'general',
      question: 'Чи захищені мої дані?',
      answer: 'Так. Ми використовуємо шифрування для всієї передачі даних, ніколи не ділимося особистою інформацією без згоди та дотримуємось суворих протоколів захисту даних. Волонтери на передовій можуть використовувати анонімні режими для додаткової безпеки.',
    },
  ];

  const categories = [
    { id: 'volunteers' as FAQCategory, label: 'Для волонтерів', icon: Users },
    { id: 'organizations' as FAQCategory, label: 'Для організацій', icon: Building },
    { id: 'general' as FAQCategory, label: 'Загальне', icon: HelpCircle },
  ];

  const filteredFaqs = faqs.filter(faq => faq.category === activeCategory);

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  if (mode.frontline) {
    return null; // Skip FAQ in frontline mode
  }

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Часті запитання</h2>
          <p className="text-lg text-muted-foreground">
            Все, що вам потрібно знати про Volunteer+
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setOpenQuestions([0]);
              }}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activeCategory === category.id
                  ? 'bg-[#FFD600] text-black'
                  : 'bg-card border border-border hover:border-[#FFD600]'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-card border border-border rounded-lg overflow-hidden ${
                !mode.lowBandwidth ? 'shadow-sm' : ''
              }`}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              >
                <h4 className="pr-4">{faq.question}</h4>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    openQuestions.includes(index) ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openQuestions.includes(index) && (
                <div className="px-6 pb-4 pt-2">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">Залишились питання?</p>
          <a
            href="mailto:support@volunteerplus.ua"
            className="text-[#0066FF] hover:underline"
          >
            Зв'яжіться з нашою командою підтримки
          </a>
        </div>
      </div>
    </section>
  );
};