import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Link, useRouter } from '../lib/router';
import { toast } from 'sonner';
import {
  Menu,
  X,
  Home,
  Search,
  BookOpen,
  FileText,
  Info,
  User,
  Moon,
  Sun,
  Wifi,
  WifiOff,
  AlertTriangle,
  Eye,
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const {
    mode,
    toggleDarkMode,
    toggleLowBandwidth,
    toggleFrontlineMode,
    toggleEyeComfort,
    setEyeComfortAuto,
    markNightSuggestionShown,
    userProfile,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNightSuggestion, setShowNightSuggestion] = useState(false);
  const [timeTick, setTimeTick] = useState(0);

  const { currentPath } = useRouter();

  // періодичний тик, щоб реагувати на зміну часу без перезавантаження
  useEffect(() => {
    const id = window.setInterval(() => setTimeTick((t) => t + 1), 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  const getLocalDayKey = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  // адаптивний показ підказки: тільки вночі і тільки 1 раз
  useEffect(() => {
    const alreadyShown = localStorage.getItem('nightSuggestionShown') === '1';
    if (alreadyShown) return;

    const hour = new Date().getHours();
    const isNight = hour >= 20 || hour < 7;

    // показувати тільки якщо є сенс пропонувати
    const shouldSuggest = isNight && (!mode.dark || !mode.eyeComfort);

    setShowNightSuggestion(shouldSuggest);
  }, [mode.dark, mode.eyeComfort, timeTick]);

  const handleAcceptNightMode = () => {
    if (!mode.dark) toggleDarkMode();
    // це «підказка системи», не ручна фіксація
    if (!mode.eyeComfort) setEyeComfortAuto(true);

    markNightSuggestionShown();
    localStorage.setItem('nightSuggestionShown', '1');
    setShowNightSuggestion(false);
  };

  const handleDismissNightMode = () => {
    markNightSuggestionShown();
    localStorage.setItem('nightSuggestionShown', '1');
    setShowNightSuggestion(false);
  };
  useEffect(() => {
    // якщо користувач вручну перемикав — не лізти автоматом
    const manual = localStorage.getItem('eyeComfortManual') === '1';
    if (manual) return;

    const hour = new Date().getHours();
    const isNight = hour >= 20 || hour < 7;

    // логіка: вночі — вмикати, вдень — вимикати
    if (isNight && !mode.eyeComfort) setEyeComfortAuto(true);
    if (!isNight && mode.eyeComfort) setEyeComfortAuto(false);
  }, [mode.eyeComfort, setEyeComfortAuto, timeTick]);

  // повідомлення: вночі інформувати, що жовтий режим активний (1 раз на добу)
  useEffect(() => {
    const hour = new Date().getHours();
    const isNight = hour >= 20 || hour < 7;
    if (!isNight) return;
    if (!mode.eyeComfort) return;

    const dayKey = getLocalDayKey();
    const shownKey = 'eyeComfortNightToastDay';

    if (localStorage.getItem(shownKey) === dayKey) return;

    toast.info('Увімкнено жовтий режим для очей', {
      description:
        'Теплий фільтр активовано у нічний час, щоб зменшити навантаження на зір.',
      duration: 4500,
    });

    try {
      localStorage.setItem(shownKey, dayKey);
    } catch {}
  }, [mode.eyeComfort, timeTick]);

  const navItems = [
    { path: '/', label: 'Головна', icon: Home },
    { path: '/search', label: 'Можливості', icon: Search },
    { path: '/for-volunteers', label: 'Для волонтерів', icon: User },
    { path: '/for-organizations', label: 'Для організацій', icon: FileText },
    { path: '/learning', label: 'Навчання', icon: BookOpen },
    { path: '/about', label: 'Про нас', icon: Info },
  ];

  const NavItemRenderer = ({
    path,
    label,
    icon: Icon,
    isMobile = false,
  }: {
    path: string;
    label: string;
    icon: any;
    isMobile?: boolean;
  }) => {
    const isActive =
      path === '/' ? currentPath === '/' : currentPath.startsWith(path);

    const baseStyle = isMobile
      ? 'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors'
      : 'flex items-center gap-1.5 px-2 py-2 transition-colors text-sm rounded-md';

    const activeStyle = isMobile
      ? 'bg-[#FFD600]/10 text-black font-medium border-l-4 border-[#FFD600]'
      : 'text-[#0066FF] bg-blue-50 font-medium';

    const inactiveStyle = isMobile
      ? 'hover:bg-muted text-muted-foreground'
      : 'text-muted-foreground hover:text-[#0066FF] hover:bg-gray-50';

    return (
      <Link
        to={path}
        onClick={() => setMobileMenuOpen(false)}
        className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}
      >
        <Icon
          className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} ${
            isActive ? 'text-[#0066FF]' : ''
          }`}
        />
        <span className="whitespace-nowrap">{label}</span>
      </Link>
    );
  };

  return (
    <nav
      className={`sticky top-0 z-40 bg-background border-b border-border ${
        !mode.lowBandwidth ? 'backdrop-blur-sm bg-background/95' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FFD600] to-[#0066FF] rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">V+</span>
            </div>
            <span className="hidden sm:block font-semibold">Volunteer+</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavItemRenderer key={item.path} {...item} />
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Mode Toggles - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {/* Dark theme + night suggestion */}
              <div className="relative">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title={mode.dark ? 'Світлий режим' : 'Темний режим'}
                >
                  {mode.dark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>

                {showNightSuggestion && (
                  <div className="absolute right-0 mt-2 w-72 rounded-xl border border-border bg-card shadow-lg p-3 text-sm z-50">
                    <div className="font-medium mb-1">
                      Нічний режим для очей
                    </div>
                    <p className="text-muted-foreground mb-2">
                      Можемо увімкнути темну тему та теплий жовтий фільтр, щоб
                      зменшити навантаження на зір.
                    </p>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleDismissNightMode}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Не зараз
                      </button>
                      <button
                        onClick={handleAcceptNightMode}
                        className="text-xs px-2 py-1 rounded-md bg-[#FFD600] text-black hover:bg-[#FFED4E]"
                      >
                        Увімкнути
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Eye comfort manual toggle */}
              <button
                onClick={toggleEyeComfort}
                className={`p-2 hover:bg-muted rounded-lg transition-colors ${
                  mode.eyeComfort ? 'text-[#FFC857]' : ''
                }`}
                title="Режим комфорту для очей"
              >
                <Eye className="w-5 h-5" />
              </button>

              {/* Low bandwidth */}
              <button
                onClick={toggleLowBandwidth}
                className={`p-2 hover:bg-muted rounded-lg transition-colors ${
                  mode.lowBandwidth ? 'text-[#FFD600]' : ''
                }`}
                title="Економія трафіку"
              >
                {mode.lowBandwidth ? (
                  <WifiOff className="w-5 h-5" />
                ) : (
                  <Wifi className="w-5 h-5" />
                )}
              </button>

              {/* Frontline mode */}
              <button
                onClick={toggleFrontlineMode}
                className={`p-2 hover:bg-muted rounded-lg transition-colors ${
                  mode.frontline ? 'text-[#FF3B30]' : ''
                }`}
                title="Режим передової"
              >
                <AlertTriangle className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile / Cabinet */}
            <Link
              to={userProfile ? '/cabinet' : '/cabinet'}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#FFD600] text-black rounded-lg hover:bg-[#FFED4E] transition-colors font-medium"
            >
              <User className="w-4 h-4" />
              <span>Кабінет</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <NavItemRenderer key={item.path} {...item} isMobile={true} />
            ))}

            <div className="border-t border-border my-4 pt-4">
              <Link
                to="/cabinet"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 bg-[#FFD600] text-black rounded-lg hover:bg-[#FFED4E] transition-colors font-medium"
              >
                <User className="w-5 h-5" />
                <span>Мій кабінет</span>
              </Link>
            </div>

            {/* Mobile Toggles */}
            <div className="border-t border-border my-4 pt-4 space-y-2">
              <p className="px-4 py-2 text-sm text-muted-foreground">
                Налаштування
              </p>

              {/* Theme */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted rounded-lg transition-colors"
              >
                <span className="flex items-center gap-3">
                  {mode.dark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                  <span>Тема</span>
                </span>
                <span className="text-sm text-muted-foreground">
                  {mode.dark ? 'Темна' : 'Світла'}
                </span>
              </button>

              {/* Eye comfort */}
              <button
                onClick={toggleEyeComfort}
                className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted rounded-lg transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Eye className="w-5 h-5" />
                  <span>Комфорт для очей</span>
                </span>
                <span
                  className={`text-sm ${
                    mode.eyeComfort ? 'text-[#FFC857]' : 'text-muted-foreground'
                  }`}
                >
                  {mode.eyeComfort ? 'Увімк' : 'Вимк'}
                </span>
              </button>

              {/* Low bandwidth */}
              <button
                onClick={toggleLowBandwidth}
                className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted rounded-lg transition-colors"
              >
                <span className="flex items-center gap-3">
                  {mode.lowBandwidth ? (
                    <WifiOff className="w-5 h-5" />
                  ) : (
                    <Wifi className="w-5 h-5" />
                  )}
                  <span>Економія даних</span>
                </span>
                <span
                  className={`text-sm ${
                    mode.lowBandwidth
                      ? 'text-[#FFD600]'
                      : 'text-muted-foreground'
                  }`}
                >
                  {mode.lowBandwidth ? 'Увімк' : 'Вимк'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
