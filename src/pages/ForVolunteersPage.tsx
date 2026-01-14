import React from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  Heart, 
  Package, 
  Users, 
  Stethoscope, 
  Truck, 
  Home, 
  Shield, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  CheckCircle,
  Clock,
  Trophy,
  HandHeart,
  Search
} from 'lucide-react';

const volunteerOpportunities = [
  {
    id: 'humanitarian',
    title: 'Гуманітарна допомога',
    description: 'Участь у розподілі та доставці гуманітарних вантажів для постраждалих територій.',
    icon: Heart,
    urgent: true,
    count: 156,
    areas: ['Розподіл', 'Пакування', 'Облік'],
    color: 'text-red-500',
    bgLight: 'bg-red-50',
    bgDark: 'bg-red-500/10',
    borderLight: 'hover:border-red-500',
    borderDark: 'hover:border-red-500/50',
  },
  {
    id: 'logistics',
    title: 'Логістика та транспорт',
    description: 'Організація перевезень, координація маршрутів, управління складами.',
    icon: Truck,
    urgent: false,
    count: 89,
    areas: ['Водії', 'Координатори', 'Склад'],
    color: 'text-blue-500',
    bgLight: 'bg-blue-50',
    bgDark: 'bg-blue-500/10',
    borderLight: 'hover:border-blue-500',
    borderDark: 'hover:border-blue-500/50',
  },
  {
    id: 'medical',
    title: 'Медична допомога',
    description: 'Медичний супровід, психологічна підтримка, догляд за пораненими.',
    icon: Stethoscope,
    urgent: true,
    count: 67,
    areas: ['Медсестри', 'Парамедики', 'Психологи'],
    color: 'text-emerald-500',
    bgLight: 'bg-emerald-50',
    bgDark: 'bg-emerald-500/10',
    borderLight: 'hover:border-emerald-500',
    borderDark: 'hover:border-emerald-500/50',
  },
  {
    id: 'shelter',
    title: 'Підтримка переселенців',
    description: 'Допомога у влаштуванні, пошук житла, соціальна адаптація.',
    icon: Home,
    urgent: false,
    count: 134,
    areas: ['Житло', 'Супровід', 'Діти'],
    color: 'text-orange-500',
    bgLight: 'bg-orange-50',
    bgDark: 'bg-orange-500/10',
    borderLight: 'hover:border-orange-500',
    borderDark: 'hover:border-orange-500/50',
  },
  {
    id: 'cyber',
    title: 'Кібербезпека та IT',
    description: 'Захист інформації, розробка систем, технічна підтримка штабів.',
    icon: Shield,
    urgent: false,
    count: 45,
    areas: ['Dev', 'Security', 'Support'],
    color: 'text-purple-500',
    bgLight: 'bg-purple-50',
    bgDark: 'bg-purple-500/10',
    borderLight: 'hover:border-purple-500',
    borderDark: 'hover:border-purple-500/50',
  },
  {
    id: 'coordination',
    title: 'Координація та зв\'язок',
    description: 'Організація волонтерських груп, комунікація між штабами.',
    icon: Users,
    urgent: false,
    count: 78,
    areas: ['Оператори', 'Менеджери', 'Диспетчери'],
    color: 'text-indigo-500',
    bgLight: 'bg-indigo-50',
    bgDark: 'bg-indigo-500/10',
    borderLight: 'hover:border-indigo-500',
    borderDark: 'hover:border-indigo-500/50',
  },
  {
    id: 'communication',
    title: 'Інфо-підтримка',
    description: 'Ведення соцмереж, створення контенту, боротьба з фейками.',
    icon: MessageCircle,
    urgent: false,
    count: 52,
    areas: ['SMM', 'Дизайн', 'Копірайтинг'],
    color: 'text-pink-500',
    bgLight: 'bg-pink-50',
    bgDark: 'bg-pink-500/10',
    borderLight: 'hover:border-pink-500',
    borderDark: 'hover:border-pink-500/50',
  },
  {
    id: 'packaging',
    title: 'Пакування та сортування',
    description: 'Підготовка посилок на фронт, сортування гуманітарки.',
    icon: Package,
    urgent: true,
    count: 203,
    areas: ['Склад', 'Сортування', 'Вантажники'],
    color: 'text-yellow-500',
    bgLight: 'bg-yellow-50',
    bgDark: 'bg-yellow-500/10',
    borderLight: 'hover:border-yellow-500',
    borderDark: 'hover:border-yellow-500/50',
  },
];

const ForVolunteersPage: React.FC = () => {
  const { mode } = useApp();
  const isDark = mode.dark;

  // --- COLOR THEMES HELPERS (Strict Mode) ---
  // Використовуємо явні змінні, щоб уникнути плутанини класів
  const pageBg = isDark ? 'bg-[#0B1121]' : 'bg-slate-50';
  const textMain = isDark ? 'text-white' : 'text-slate-900';
  const textSec = isDark ? 'text-slate-400' : 'text-slate-600';
  
  // Card Styles
  const cardBg = isDark ? 'bg-[#1e293b]' : 'bg-white';
  const cardBorder = isDark ? 'border-slate-700' : 'border-slate-200';
  const cardShadow = isDark ? 'hover:shadow-none' : 'hover:shadow-xl hover:shadow-slate-200/50';

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300`}>
      
      {/* --- HERO SECTION --- */}
      <div className={`relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#0F172A]' : 'bg-white'}`}>
        
        {/* Background Gradients (Adaptive) */}
        <div className={`absolute top-0 left-0 w-1/2 h-full pointer-events-none ${isDark ? 'bg-gradient-to-br from-[#0066FF]/10 to-transparent' : 'bg-gradient-to-br from-blue-50 to-transparent'}`} />
        <div className={`absolute bottom-0 right-0 w-1/3 h-full pointer-events-none ${isDark ? 'bg-gradient-to-tl from-[#FFD600]/5 to-transparent' : 'bg-gradient-to-tl from-yellow-50 to-transparent'}`} />
        
        <div className="container mx-auto px-4 pt-24 pb-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-sm text-sm mb-6 ${
              isDark 
                ? 'bg-white/10 border-white/20 text-white' 
                : 'bg-blue-50 border-blue-100 text-[#0066FF]'
            }`}>
              <Sparkles className="w-4 h-4 text-[#FFD600]" />
              <span>Твій час може врятувати життя</span>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight ${textMain}`}>
              Стань частиною <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] to-[#FFA500]">Великої Перемоги</span>
            </h1>
            
            <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${textSec}`}>
              Обирай напрямок, який тобі близький. Ми допоможемо знайти команду, 
              навчимо необхідному та забезпечимо підтримку на кожному етапі.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-[#FFD600] hover:bg-[#FFED4E] text-black px-8 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 flex items-center gap-2 shadow-lg shadow-yellow-500/20">
                Знайти завдання
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className={`px-8 py-4 rounded-xl font-medium transition-colors border ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/20' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
              }`}>
                Як це працює?
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar (Adaptive) */}
        <div className={`border-t backdrop-blur-sm ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white/50'}`}>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Stat 1 */}
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                    <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                    <div className={`text-2xl font-bold ${textMain}`}>12,438</div>
                    <div className={`text-xs uppercase tracking-wider ${textSec}`}>Волонтерів</div>
                </div>
              </div>
              {/* Stat 2 */}
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-yellow-500/20' : 'bg-yellow-100'}`}>
                    <Clock className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                    <div className={`text-2xl font-bold ${textMain}`}>824</div>
                    <div className={`text-xs uppercase tracking-wider ${textSec}`}>Активних запитів</div>
                </div>
              </div>
              {/* Stat 3 */}
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                    <div className={`text-2xl font-bold ${textMain}`}>45k+</div>
                    <div className={`text-xs uppercase tracking-wider ${textSec}`}>Виконано завдань</div>
                </div>
              </div>
              {/* Stat 4 */}
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                    <Trophy className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                    <div className={`text-2xl font-bold ${textMain}`}>Top 1%</div>
                    <div className={`text-xs uppercase tracking-wider ${textSec}`}>Ефективності</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- OPPORTUNITIES GRID --- */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textMain}`}>
            Напрямки діяльності
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${textSec}`}>
            Тут знайдеться місце для кожного таланту. Обирайте категорію, 
            що відповідає вашим навичкам.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {volunteerOpportunities.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className={`group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col ${cardBg} ${cardBorder} ${cardShadow} ${
                  item.urgent 
                    ? isDark ? item.borderDark : item.borderLight
                    : isDark ? 'hover:border-slate-500' : 'hover:border-[#0066FF]'
                }`}
              >
                {/* Urgent Badge */}
                {item.urgent && (
                   <div className="absolute top-4 right-4 flex h-3 w-3">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                   </div>
                )}

                <div className="mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${isDark ? item.bgDark : item.bgLight}`}>
                    <Icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 group-hover:text-[#0066FF] transition-colors ${textMain}`}>
                    {item.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed mb-4 min-h-[60px] ${textSec}`}>
                    {item.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.areas.map(area => (
                      <span key={area} className={`text-[10px] font-medium px-2 py-1 rounded uppercase tracking-wide ${
                        isDark 
                          ? 'bg-[#2A3241] text-slate-300' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`mt-auto pt-4 border-t flex items-center justify-between ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                   <span className={`text-xs font-medium ${item.urgent ? 'text-red-500' : 'text-slate-500'}`}>
                     {item.count} вакансій
                   </span>
                   
                   {/* Arrow Button */}
                   <div className={`p-2 rounded-full transition-colors ${
                     isDark 
                       ? 'bg-slate-800 group-hover:bg-blue-600 text-slate-400 group-hover:text-white' 
                       : 'bg-slate-100 group-hover:bg-[#0066FF] text-slate-500 group-hover:text-white'
                   }`}>
                     <ArrowRight className="w-4 h-4" />
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- CTA SECTION (Strictly Adaptive) --- */}
      <div className={`py-16 border-t transition-colors duration-300 ${isDark ? 'bg-[#0B1121] border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="container mx-auto px-4">
          
          <div className={`relative overflow-hidden  transition-all duration-300 ${
            isDark 
              ? 'bg-[#111827] border-slate-700' 
              : 'bg-white border-slate-200 shadow-blue-900/5'
          }`}>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] ${isDark ? 'opacity-20' : 'opacity-10'}`}></div>
            </div>

            {/* Glows */}
            <div className={`absolute -top-24 -right-24 w-96 h-96 bg-[#0066FF] rounded-full blur-[128px] pointer-events-none ${isDark ? 'opacity-20' : 'opacity-5'}`}></div>
            <div className={`absolute -bottom-24 -left-24 w-96 h-96 bg-[#FFD600] rounded-full blur-[128px] pointer-events-none ${isDark ? 'opacity-10' : 'opacity-5'}`}></div>

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
              
              <div className="max-w-2xl">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-6 ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700 text-[#FFD600]' 
                    : 'bg-blue-50 border-blue-100 text-[#0066FF]'
                }`}>
                  <HandHeart className="w-3 h-3 fill-current" />
                  <span>Потрібна допомога?</span>
                </div>

                {/* Explicit Color Logic */}
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${textMain}`}>
                  Готові приєднатися до команди? <br/>
                  <span className={textSec}>Почніть свій шлях волонтера сьогодні.</span>
                </h2>
                
                <p className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Зареєструйтеся, заповніть профіль та отримайте доступ до тисяч актуальних 
                  завдань. Ваша допомога потрібна саме зараз.
                </p>
                
                <div className={`flex flex-wrap gap-6 text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></div>
                        Швидка верифікація
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FFD600]"></div>
                        Офіційний стаж
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></div>
                        Спільнота однодумців
                    </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full md:w-auto min-w-[200px]">
                 <button className="group relative px-8 py-4 bg-[#0066FF] hover:bg-[#0055D4] text-white font-bold rounded-xl transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-blue-500/20">
                   <span className="flex items-center justify-center gap-2">
                     Стати волонтером
                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                   </span>
                 </button>
                 
                 {/* Explicit Secondary Button Colors */}
                 <button className={`px-8 py-4 font-bold rounded-xl border transition-colors flex items-center justify-center gap-2 ${
                   isDark 
                     ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-600' 
                     : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
                 }`}>
                   Зв'язатися з нами
                 </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForVolunteersPage;