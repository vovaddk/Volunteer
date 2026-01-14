import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Shield, 
  Star, 
  Users, 
  CheckCircle, 
  Search,
  ArrowRight,
  Globe,
  Zap,
  LayoutGrid
} from 'lucide-react';

// --- MOCK DATA ---
const organizations = [
  {
    id: 'come-back-alive',
    name: 'Повернись живим',
    nameEn: 'Come Back Alive',
    description: 'Найбільший фонд допомоги українській армії. Займається постачанням техніки та навчанням.',
    logo: '🛡️',
    verified: true,
    rating: 4.9,
    categories: ['Армія', 'Обладнання'],
    address: 'Київ, вул. В. Васильківська, 100',
    phone: '+380 44 299 74 99',
    email: 'info@savelife.in.ua',
    website: 'https://savelife.in.ua',
    volunteers: 2340,
    projects: 156,
    impact: 'Допомогли 80,000+ військових',
    color: 'blue'
  },
  {
    id: 'serhiy-prytula',
    name: 'Фонд Сергія Притули',
    nameEn: 'Prytula Foundation',
    description: 'Масштабні збори на байрактари, супутники та військову техніку для захисників.',
    logo: '⭐',
    verified: true,
    rating: 4.8,
    categories: ['Армія', 'Техніка'],
    address: 'Київ, вул. Басейна, 23',
    phone: '+380 63 471 47 14',
    email: 'contact@prytulafoundation.org',
    website: 'https://prytulafoundation.org',
    volunteers: 1890,
    projects: 203,
    impact: 'Зібрано понад 2 млрд грн',
    color: 'yellow'
  },
  {
    id: 'hospitallers',
    name: 'Госпітальєри',
    nameEn: 'Hospitallers',
    description: 'Медичний батальйон. Невідкладна допомога на передовій та евакуація поранених.',
    logo: '🏥',
    verified: true,
    rating: 4.9,
    categories: ['Медицина', 'Евакуація'],
    address: 'Київ, вул. Лук\'янівська, 75',
    phone: '+380 50 689 34 56',
    email: 'contact@hospitallers.life',
    website: 'https://hospitallers.life',
    volunteers: 856,
    projects: 89,
    impact: 'Врятовано 15,000+ життів',
    color: 'green'
  },
  {
    id: 'united24',
    name: 'UNITED24',
    nameEn: 'United 24',
    description: 'Глобальна ініціатива Президента України. Оборона, розмінування, медична допомога.',
    logo: '🇺🇦',
    verified: true,
    rating: 5.0,
    categories: ['Держава', 'Відбудова'],
    address: 'Київ, Офіс Президента',
    phone: '0 800 500 000',
    email: 'info@u24.gov.ua',
    website: 'https://u24.gov.ua',
    volunteers: 3450,
    projects: 412,
    impact: 'Залучено понад $500 млн',
    color: 'slate'
  },
  {
    id: 'razom',
    name: 'Razom for Ukraine',
    nameEn: 'Razom',
    description: 'Міжнародна підтримка демократії та надання гуманітарної допомоги.',
    logo: '🤝',
    verified: true,
    rating: 4.7,
    categories: ['Гуманітарка', 'Освіта'],
    address: 'Київ / Нью-Йорк',
    phone: '+380 44 334 78 90',
    email: 'contact@razom.org',
    website: 'https://razomforukraine.org',
    volunteers: 1234,
    projects: 178,
    impact: '450 тонн гуманітарки',
    color: 'orange'
  },
  {
    id: 'nova-poshta',
    name: 'Гуманітарна пошта',
    nameEn: 'Nova Poshta Hub',
    description: 'Логістична допомога. Безкоштовна доставка для волонтерських організацій.',
    logo: '📦',
    verified: true,
    rating: 4.8,
    categories: ['Логістика'],
    address: 'Київ, вул. Чудновська, 3А',
    phone: '0 800 500 609',
    email: 'help@novaposhta.ua',
    website: 'https://novaposhta.ua',
    volunteers: 5670,
    projects: 892,
    impact: '12,000 тонн вантажів',
    color: 'red'
  },
];

const categories = ['Всі', 'Армія', 'Медицина', 'Гуманітарка', 'Діти', 'Тварини'];

const ForOrganizationsPage: React.FC = () => {
  const { mode } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('Всі');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          org.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Всі' || org.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // --- COLOR THEMES HELPERS ---
  const isDark = mode.dark;
  
  const pageBg = isDark ? 'bg-[#0B1121]' : 'bg-slate-50';
  const cardBg = isDark ? 'bg-[#151e32]' : 'bg-white';
  const cardBorder = isDark ? 'border-[#2A3241]' : 'border-slate-200';
  const textMain = isDark ? 'text-white' : 'text-slate-900';
  const textSec = isDark ? 'text-slate-400' : 'text-slate-500';
  const shadowHover = isDark ? 'hover:shadow-none' : 'hover:shadow-xl hover:shadow-slate-200/50';

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300`}>
      
      {/* --- HERO SECTION (Always Dark Style) --- */}
      <div className="relative bg-[#0F172A] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#0066FF]/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-tr from-[#FFD600]/10 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 pt-24 pb-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white text-sm mb-6">
              <Shield className="w-4 h-4 text-[#FFD600]" />
              <span>Тільки перевірені фонди та організації</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Об'єднуємо зусилля задля <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] to-[#FFA500]">Перемоги</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Знайдіть надійну організацію для волонтерства або фінансової підтримки. 
              Всі учасники платформи пройшли сувору верифікацію.
            </p>

            {/* Search Box */}
            <div className={`max-w-xl mx-auto rounded-2xl p-2 flex items-center transition-colors duration-300 ${isDark ? 'bg-[#1E293B] shadow-none' : 'bg-white shadow-2xl shadow-blue-900/20'}`}>
              <div className="pl-4 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text"
                placeholder="Пошук за назвою або напрямком..."
                className={`flex-1 px-4 py-3 outline-none bg-transparent ${textMain} placeholder:text-slate-400`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-[#0066FF] hover:bg-[#0055D4] text-white px-6 py-3 rounded-xl font-medium transition-colors">
                Знайти
              </button>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">240+</div>
                <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">Організацій</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#FFD600] mb-1">15k+</div>
                <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">Волонтерів</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">₴2B+</div>
                <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">Зібрано коштів</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#4ADE80] mb-1">4.9</div>
                <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">Середній рейтинг</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-4 py-12">
        
        {/* Categories / Filter */}
        <div className="flex overflow-x-auto gap-2 pb-8 mb-4 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-lg shadow-blue-600/30'
                  : `${isDark ? 'bg-[#1E293B] text-slate-300 border-slate-700 hover:border-[#0066FF]' : 'bg-white text-slate-600 border-slate-200 hover:border-[#0066FF] hover:text-[#0066FF]'}`
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrgs.map((org) => (
            <div 
              key={org.id}
              className={`group ${cardBg} ${cardBorder} rounded-2xl border overflow-hidden ${shadowHover} hover:-translate-y-1 transition-all duration-300 flex flex-col`}
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  {/* Logo Container */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
                    {org.logo}
                  </div>
                  {org.verified && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-[#0066FF]'}`}>
                      <CheckCircle className="w-3 h-3" />
                      <span>Верифіковано</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold mb-1 group-hover:text-[#0066FF] transition-colors ${textMain}`}>
                  {org.name}
                </h3>
                <p className={`text-sm mb-4 ${textSec}`}>{org.nameEn}</p>
                
                {/* Description */}
                <p className={`text-sm line-clamp-2 mb-4 h-10 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {org.description}
                </p>

                {/* Categories Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {org.categories.map(cat => (
                    <span key={cat} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-[#2A3241] text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Impact Box */}
                <div className={`rounded-xl p-3 flex items-center gap-3 mb-6 border ${isDark ? 'bg-[#1E293B] border-slate-700' : 'bg-[#FFD600]/10 border-transparent'}`}>
                  <div className="bg-[#FFD600] w-1 h-8 rounded-full shadow-[0_0_10px_rgba(255,214,0,0.5)]" />
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#FFD600]' : 'text-[#b39600]'}`}>
                      Вплив
                    </div>
                    <div className={`text-sm font-medium ${textMain}`}>
                      {org.impact}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className={`grid grid-cols-2 gap-4 mb-6 border-t pt-4 ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                   <div>
                     <div className={`flex items-center gap-1.5 mb-1 ${textSec}`}>
                        <Users className="w-3.5 h-3.5" />
                        <span className="text-xs">Волонтерів</span>
                     </div>
                     <span className={`text-sm font-semibold ${textMain}`}>{org.volunteers.toLocaleString()}</span>
                   </div>
                   <div>
                     <div className={`flex items-center gap-1.5 mb-1 ${textSec}`}>
                        <Star className="w-3.5 h-3.5 text-orange-400" />
                        <span className="text-xs">Рейтинг</span>
                     </div>
                     <span className={`text-sm font-semibold ${textMain}`}>{org.rating}/5.0</span>
                   </div>
                </div>
              </div>

              {/* Card Footer (Actions) */}
              <div className={`mt-auto p-4 border-t flex items-center justify-between gap-3 ${isDark ? 'bg-[#0f1623] border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                
                <div className="flex gap-3">
                  <a href={org.website} target="_blank" rel="noreferrer" className={`p-2 rounded-full transition-colors ${isDark ? 'text-slate-400 hover:text-[#0066FF] hover:bg-white/5' : 'text-slate-500 hover:text-[#0066FF] hover:bg-blue-50'}`} title="Вебсайт">
                    <Globe className="w-5 h-5" />
                  </a>
                  <a href={`mailto:${org.email}`} className={`p-2 rounded-full transition-colors ${isDark ? 'text-slate-400 hover:text-[#0066FF] hover:bg-white/5' : 'text-slate-500 hover:text-[#0066FF] hover:bg-blue-50'}`} title="Email">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>

                <button className="flex items-center gap-2 bg-[#0066FF] hover:bg-[#0055D4] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-blue-500/30 border border-transparent">
                  Долучитися
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrgs.length === 0 && (
          <div className="text-center py-20">
             <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isDark ? 'bg-[#1E293B]' : 'bg-slate-100'}`}>
               <Search className="w-8 h-8 text-slate-400" />
             </div>
             <h3 className={`text-lg font-medium mb-1 ${textMain}`}>Нічого не знайдено</h3>
             <p className={textSec}>Спробуйте змінити параметри пошуку</p>
          </div>
        )}

      </div>

      {/* --- CTA SECTION (FULLY ADAPTIVE NOW) --- */}
      <div className={`py-16 border-t transition-colors duration-300 ${isDark ? 'bg-[#0B1121] border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="container mx-auto px-4 py-4">
          
          <div className={`relative rounded-3xl overflow-hidden  ${
            isDark 
              ? 'bg-[#111827] border-slate-700' // Dark Theme Card
              : 'bg-white border-slate-200 shadow-blue-900/5' // Light Theme Card
          }`}>
            
            {/* Grid Pattern Background (Adapts Opacity) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] ${isDark ? 'opacity-20' : 'opacity-10'}`}></div>
            </div>

            {/* Glowing Effects (Softened for Light Mode) */}
            <div className={`absolute -top-24 -right-24 w-96 h-96 bg-[#0066FF] rounded-full blur-[128px] pointer-events-none ${isDark ? 'opacity-20' : 'opacity-5'}`}></div>
            <div className={`absolute -bottom-24 -left-24 w-96 h-96 bg-[#FFD600] rounded-full blur-[128px] pointer-events-none ${isDark ? 'opacity-10' : 'opacity-5'}`}></div>

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
              
              {/* Left Content */}
              <div className="max-w-2xl">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-6 ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700 text-[#FFD600]' 
                    : 'bg-blue-50 border-blue-100 text-[#0066FF]'
                }`}>
                  <Zap className="w-3 h-3 fill-current" />
                  <span>Для партнерів</span>
                </div>

                {/* Adaptive Text Color */}
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Ваша організація змінює світ? <br/>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Давайте робити це разом.</span>
                </h2>
                
                <p className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Платформа Volunteer+ надає інструменти для координації волонтерів, 
                  ведення обліку допомоги та прозорої звітності. Приєднуйтесь до екосистеми довіри.
                </p>
                
                <div className={`flex flex-wrap gap-6 text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></div>
                        Доступ до бази волонтерів
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FFD600]"></div>
                        CRM для благодійних фондів
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></div>
                        Верифікація та безпека
                    </div>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex flex-col gap-4 w-full md:w-auto min-w-[200px]">
                 <button className="group relative px-8 py-4 bg-[#FFD600] hover:bg-[#FFED4E] text-black font-bold rounded-xl transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-yellow-500/20">
                   <span className="flex items-center justify-center gap-2">
                     Зареєструвати фонд
                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                   </span>
                 </button>
                 
                 {/* Adaptive Secondary Button */}
                 <button className={`px-8 py-4 font-bold rounded-xl border transition-colors flex items-center justify-center gap-2 ${
                   isDark 
                     ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-600' 
                     : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
                 }`}>
                   <LayoutGrid className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                   Дізнатись більше
                 </button>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ForOrganizationsPage;