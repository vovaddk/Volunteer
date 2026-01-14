import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import {
  FilterPanel,
  FilterButton,
  FilterOptions,
} from '../components/FilterPanel';
import {
  OpportunityCard,
  Opportunity,
} from '../components/cards/OpportunityCard';
import { Search, MapPin, Sparkles } from 'lucide-react';

const SearchPage: React.FC = () => {
  const { mode, behavioralData } = useApp();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    locations: [],
    formats: [],
    urgency: false,
    safety: [],
  });

  // Mock data – в реальному застосунку має приходити з API
  const allOpportunities: Opportunity[] = [
    {
      id: '1',
      title: 'Доставка медикаментів для стабілізаційного пункту',
      organization: 'Український Червоний Хрест',
      category: 'Медична допомога',
      location: 'frontline',
      format: 'offline',
      urgent: true,
      date: '22 лис, 2025',
      imageUrl: !mode.lowBandwidth
        ? 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
        : undefined,
      description:
        'Термінова доставка медикаментів та витратних матеріалів до стабілізаційного пункту поблизу лінії фронту.',
      volunteersNeeded: 4,
    },
    {
      id: '2',
      title: 'Онлайн-репетиторство для дітей ВПО',
      organization: 'Освіта Перш За Все',
      category: 'Освіта',
      location: 'online',
      format: 'online',
      urgent: false,
      date: '23–30 лис, 2025',
      imageUrl: !mode.lowBandwidth
        ? 'https://images.unsplash.com/photo-1584697964190-880aedf23f55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
        : undefined,
      description:
        'Допоможіть дітям, які виїхали з прифронтових регіонів, продовжити навчання через онлайн-заняття.',
      volunteersNeeded: 15,
    },
    {
      id: '3',
      title: 'Відновлення сільського клубу на деокупованій території',
      organization: 'Будуємо Разом',
      category: 'Відбудова',
      location: 'deoccupied',
      format: 'offline',
      urgent: false,
      date: '25 лис – 5 гру, 2025',
      imageUrl: !mode.lowBandwidth
        ? 'https://images.unsplash.com/photo-1605515298945-8f8f5f8c702c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
        : undefined,
      description:
        'Приєднуйтесь до команди, що відновлює сільський клуб, пошкоджений обстрілами на деокупованій території.',
      volunteersNeeded: 18,
    },
    {
      id: '4',
      title: 'Роздача гуманітарної допомоги — Київ',
      organization: 'Мережа Волонтерів Києва',
      category: 'Гуманітарна допомога',
      location: 'rear',
      format: 'offline',
      urgent: false,
      date: 'Щотижня',
      imageUrl: !mode.lowBandwidth
        ? 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
        : undefined,
      description:
        'Видача продуктових наборів, гігієнічних засобів та одягу для вразливих категорій населення.',
      volunteersNeeded: 10,
    },
    {
      id: '5',
      title: 'Гаряча лінія психологічної підтримки',
      organization: 'Ментальне здоровʼя України',
      category: 'Соціальна підтримка',
      location: 'online',
      format: 'online',
      urgent: true,
      date: 'Постійно',
      imageUrl: !mode.lowBandwidth
        ? 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
        : undefined,
      description:
        'Надавайте емоційну підтримку та кризове консультування людям, які постраждали від війни.',
      volunteersNeeded: 8,
    },
    {
      id: '6',
      title: 'Логістична підтримка підрозділів на передовій',
      organization: 'Фонд Підтримки Захисників',
      category: 'Допомога захисникам',
      location: 'frontline',
      format: 'offline',
      urgent: true,
      date: 'Негайно',
      imageUrl: !mode.lowBandwidth
        ? 'https://images.unsplash.com/photo-1526481280695-3c687fd543c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
        : undefined,
      description:
        'Координація відправки бронежилетів, дронів, генераторів та інших необхідних речей до підрозділів на нулі.',
      volunteersNeeded: 3,
    },
    {
      id: '7',
      title: 'IT-підтримка для родин ВПО',
      organization: 'Технології заради добра',
      category: 'Онлайн-волонтерство',
      location: 'online',
      format: 'online',
      urgent: false,
      date: 'Гнучкий графік',
      imageUrl: !mode.lowBandwidth
        ? 'https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
        : undefined,
      description:
        'Допомога з налаштування техніки, доступом до «Дії», онлайн-банкінгу та освітніх платформ для родин, що виїхали.',
      volunteersNeeded: 12,
    },
    {
      id: '8',
      title: 'Будівництво тимчасових укриттів — Львівщина',
      organization: 'Ініціатива «Безпечний притулок»',
      category: 'Відбудова',
      location: 'rear',
      format: 'offline',
      urgent: false,
      date: '1–15 гру, 2025',
      imageUrl: !mode.lowBandwidth
        ? 'https://images.unsplash.com/photo-1600585154340-0ef3c08c0632?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
        : undefined,
      description:
        'Допомога у зведенні тимчасових укриттів та модульного житла для родин, які втратили домівки.',
      volunteersNeeded: 20,
    },
  ];

  // Фільтрація
  const filterOpportunities = () => {
    let filtered = allOpportunities;

    // Пошук
    if (searchQuery) {
      filtered = filtered.filter(
        (opp) =>
          opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.organization.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Категорії
    if (filters.categories.length > 0) {
      filtered = filtered.filter((opp) =>
        filters.categories.includes(opp.category)
      );
    }

    // Локації (UI — укр, внутрішні коди — англ)
    if (filters.locations.length > 0) {
      const locationMap: Record<string, string> = {
        'Прифронтові регіони': 'frontline',
        'Тилові регіони': 'rear',
        'Деокуповані території': 'deoccupied',
        Онлайн: 'online',
      };
      const selectedLocations = filters.locations.map(
        (loc) => locationMap[loc]
      );
      filtered = filtered.filter((opp) =>
        selectedLocations.includes(opp.location)
      );
    }

    // Формат
    if (filters.formats.length > 0) {
      const formatMap: Record<string, string> = {
        Онлайн: 'online',
        Офлайн: 'offline',
      };
      const selectedFormats = filters.formats.map((fmt) => formatMap[fmt]);
      filtered = filtered.filter((opp) => selectedFormats.includes(opp.format));
    }

    // Терміновість
    if (filters.urgency) {
      filtered = filtered.filter((opp) => opp.urgent);
    }

    return filtered;
  };

  const displayOpportunities = filterOpportunities();
  const activeFilterCount =
    filters.categories.length +
    filters.locations.length +
    filters.formats.length +
    (filters.urgency ? 1 : 0);

  const hasRecommendations =
    behavioralData.frequentCategories.length > 0 ||
    behavioralData.preferredUrgency;

  const countLabel =
    displayOpportunities.length === 1
      ? 'можливість'
      : displayOpportunities.length >= 2 && displayOpportunities.length <= 4
      ? 'можливості'
      : 'можливостей';

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1>Знайти волонтерські можливості</h1>
            {hasRecommendations && !mode.frontline && (
              <span className="px-2 py-1 bg-[#0066FF]/10 text-[#0066FF] text-sm rounded flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Персоналізовано
              </span>
            )}
          </div>
          <p className="text-muted-foreground">
            {displayOpportunities.length} {countLabel} доступно зараз
          </p>
        </div>

        {/* Пошук */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Пошук за назвою можливості, організацією чи ключовими словами…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:border-transparent"
            />
          </div>
        </div>

        {/* Кнопка фільтрів (мобільна) */}
        <div className="mb-6 md:hidden">
          <FilterButton
            onClick={() => setMobileFilterOpen(true)}
            count={activeFilterCount}
          />
        </div>

        {/* Основний контент */}
        <div className="flex gap-6 lg:gap-8">
          {/* Бокова панель фільтрів (desktop) */}
          <FilterPanel filters={filters} onFilterChange={setFilters} />

          {/* Мобільна панель фільтрів */}
          {mobileFilterOpen && (
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              isMobileOpen={mobileFilterOpen}
              onMobileClose={() => setMobileFilterOpen(false)}
            />
          )}

          {/* Результати */}
          <div className="flex-1">
            {hasRecommendations &&
              displayOpportunities.length > 0 &&
              !mode.frontline && (
                <div className="mb-4 p-3 sm:p-4 bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-lg text-sm">
                  <p className="text-[#0066FF] flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Показано можливості, що відповідають вашим інтересам та
                    попередній активності.
                  </p>
                </div>
              )}

            {displayOpportunities.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {displayOpportunities.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    variant="compact"
                    onSelect={(id) => {
                      window.location.href = `/opportunity/${id}`;
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="mb-2">Можливостей не знайдено</h3>
                <p className="text-muted-foreground mb-6">
                  Спробуйте змінити фільтри або пошуковий запит.
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      categories: [],
                      locations: [],
                      formats: [],
                      urgency: false,
                      safety: [],
                    });
                    setSearchQuery('');
                  }}
                  className="text-[#0066FF] hover:underline"
                >
                  Очистити всі фільтри
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
