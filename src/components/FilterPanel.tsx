import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { useHeatZone } from '../hooks/useHeatZone';

export type FilterOptions = {
  categories: string[];
  locations: string[];
  formats: string[];
  urgency: boolean;
  safety: string[];
};

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

/**
 * ОКРЕМИЙ рядок фільтра з власною heat-зоною.
 * Видно, що саме ця опція часто/рідко використовується.
 */
const HeatFilterOptionRow: React.FC<{
  zoneId: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
}> = ({ zoneId, label, checked, onToggle }) => {
  const { isHot, isCold, registerClick } = useHeatZone(zoneId);

  let rowClasses =
    'flex items-center gap-3 cursor-pointer p-2 rounded transition-colors border border-transparent';

  // Базовий hover
  rowClasses += ' hover:bg-muted/50';

  // Гаряча опція: підсвічена, обрамлена, трохи “важча”
  if (isHot) {
    rowClasses += ' bg-[#FFD600]/10 border-[#FFD600] font-medium';
  }

  // Холодна опція: тьмяна
  if (isCold) {
    rowClasses += ' opacity-60';
  }

  return (
    <label
      className={rowClasses}
      onClick={() => {
        registerClick();
        onToggle();
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="w-5 h-5 rounded border-2 border-border"
      />
      <span className="flex-1">{label}</span>
    </label>
  );
};

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  isMobileOpen = false,
  onMobileClose,
}) => {
  const { behavioralData } = useApp();
  const complexity = behavioralData.uiComplexityLevel ?? 1;

  const [expandedSections, setExpandedSections] = useState<string[]>([
    'categories',
    'locations',
    ...(complexity >= 2 ? ['formats'] : []),
    ...(complexity >= 3 ? ['safety'] : []),
  ]);

  // heat для ВСІЄЇ панелі
  const { isHot, isCold, registerClick } = useHeatZone('search-filters');

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  // Значення мають відповідати категоріям у SearchPage
  const categoryOptions = [
    'Допомога захисникам',
    'Регулярне волонтерство',
    'Онлайн-волонтерство',
    'Соціальна підтримка',
    'Гуманітарна допомога',
    'Відбудова',
    'Медична допомога',
    'Освіта',
  ];

  const locationOptions = [
    'Прифронтові регіони',
    'Тилові регіони',
    'Деокуповані території',
    'Онлайн',
  ];

  const formatOptions = ['Онлайн', 'Офлайн'];

  const safetyOptions = [
    'Лише відносно безпечні райони',
    'Допускаю поїздки ближче до фронту',
  ];

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleLocationToggle = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter((l) => l !== location)
      : [...filters.locations, location];
    onFilterChange({ ...filters, locations: newLocations });
  };

  const handleFormatToggle = (format: string) => {
    const newFormats = filters.formats.includes(format)
      ? filters.formats.filter((f) => f !== format)
      : [...filters.formats, format];
    onFilterChange({ ...filters, formats: newFormats });
  };

  const handleSafetyToggle = (safety: string) => {
    const newSafety = filters.safety.includes(safety)
      ? filters.safety.filter((s) => s !== safety)
      : [...filters.safety, safety];
    onFilterChange({ ...filters, safety: newSafety });
  };

  const handleClearAll = () => {
    onFilterChange({
      categories: [],
      locations: [],
      formats: [],
      urgency: false,
      safety: [],
    });
  };

  const activeCount =
    filters.categories.length +
    filters.locations.length +
    filters.formats.length +
    filters.safety.length +
    (filters.urgency ? 1 : 0);

  const FilterSection = ({
    title,
    options,
    selected,
    onToggle,
    sectionKey,
  }: {
    title: string;
    options: string[];
    selected: string[];
    onToggle: (option: string) => void;
    sectionKey: string;
  }) => {
    const isExpanded = expandedSections.includes(sectionKey);

    // Динамічна складність
    if (
      complexity === 1 &&
      sectionKey !== 'categories' &&
      sectionKey !== 'locations'
    ) {
      return null;
    }
    if (complexity === 2 && sectionKey === 'safety') {
      return null;
    }

    return (
      <div className="border-b border-border pb-4 mb-4">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full mb-3 hover:text-[#0066FF] transition-colors"
        >
          <h4>{title}</h4>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {isExpanded && (
          <div className="space-y-2">
            {options.map((option) => {
              const zoneId = `search-filters:${sectionKey}:${option}`;
              const checked = selected.includes(option);

              return (
                <HeatFilterOptionRow
                  key={option}
                  zoneId={zoneId}
                  label={option}
                  checked={checked}
                  onToggle={() => onToggle(option)}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const basePanelClasses =
    'space-y-4 rounded-2xl border bg-card p-4 md:p-5 transition-all duration-300';
  const hotClasses = isHot ? ' scale-[1.03] shadow-lg' : '';
  const coldClasses = isCold
    ? ' opacity-60 max-h-16 overflow-hidden hover:max-h-[600px]'
    : '';

  const panelContent = (
    <aside
      data-heat-zone="search-filters"
      className={basePanelClasses + hotClasses + coldClasses}
      onClick={registerClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Фільтри</h3>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#FFD600] text-xs text-black">
              {activeCount}
            </span>
          )}
        </div>

        <button
          onClick={handleClearAll}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Очистити
        </button>
      </div>

      <FilterSection
        title="Категорія"
        options={categoryOptions}
        selected={filters.categories}
        onToggle={handleCategoryToggle}
        sectionKey="categories"
      />

      <FilterSection
        title="Локація"
        options={locationOptions}
        selected={filters.locations}
        onToggle={handleLocationToggle}
        sectionKey="locations"
      />

      <FilterSection
        title="Формат участі"
        options={formatOptions}
        selected={filters.formats}
        onToggle={handleFormatToggle}
        sectionKey="formats"
      />

      <FilterSection
        title="Рівень безпеки"
        options={safetyOptions}
        selected={filters.safety}
        onToggle={handleSafetyToggle}
        sectionKey="safety"
      />

      <div className="pb-4 mb-4">
        <label className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={filters.urgency}
            onChange={(e) =>
              onFilterChange({ ...filters, urgency: e.target.checked })
            }
            className="w-5 h-5 rounded border-2 border-border"
          />
          <span className="flex-1">Показувати лише термінові запити</span>
        </label>
      </div>
    </aside>
  );

  // desktop
  if (!isMobileOpen) {
    return (
      <div className="hidden md:block md:w-80 lg:w-96 flex-shrink-0">
        {panelContent}
      </div>
    );
  }

  // mobile overlay
  return (
    <div className="fixed inset-0 z-40 flex md:hidden">
      <div
        className="flex-1 bg-black/40"
        onClick={onMobileClose}
        aria-hidden="true"
      />
      <div className="w-[80%] max-w-xs bg-background border-l border-border p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Фільтри</h3>
          </div>
          <button
            onClick={onMobileClose}
            className="p-2 hover:bg-muted rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{panelContent}</div>
      </div>
    </div>
  );
};

export const FilterButton: React.FC<{
  onClick: () => void;
  count: number;
}> = ({ onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:border-[#FFD600] transition-colors"
    >
      <SlidersHorizontal className="w-5 h-5" />
      <span>Фільтри</span>
      {count > 0 && (
        <span className="px-2 py-0.5 bg-[#FFD600] text-black text-sm rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};
