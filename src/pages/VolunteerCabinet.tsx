import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { StatCard } from '../components/cards/StatCard';
import { AdaptiveButton } from '../components/AdaptiveButton';
import {
  User,
  Clock,
  Package,
  Star,
  CheckCircle,
  AlertCircle,
  Calendar,
  MapPin,
  Settings,
  Moon,
  Sun,
  Wifi,
  WifiOff,
  AlertTriangle,
  Shield,
  LogOut
} from 'lucide-react';

const VolunteerCabinet: React.FC = () => {
  const { mode, toggleDarkMode, toggleLowBandwidth, toggleFrontlineMode, userProfile, setUserProfile } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'opportunities' | 'settings'>('overview');

  // Імітація даних користувача (в реальному додатку це приходить з API)
  useEffect(() => {
    if (!userProfile) {
      setUserProfile({
        name: 'Олена Коваленко',
        role: 'volunteer',
        location: 'rear',
        verified: true,
        stats: {
          hours: 127,
          deliveries: 23,
          rating: 4.9,
        },
        preferences: ['Медична допомога', 'Гуманітарна допомога'],
      });
    }
  }, [userProfile, setUserProfile]);

  const myOpportunities = [
    {
      id: '1',
      title: 'Роздача гуманітарної допомоги',
      organization: 'Мережа Волонтерів',
      status: 'confirmed' as const,
      date: '24 лист, 2025',
      location: 'Київ',
    },
    {
      id: '2',
      title: 'Сортування медичних вантажів',
      organization: 'Червоний Хрест',
      status: 'pending' as const,
      date: '26 лист, 2025',
      location: 'Київ',
    },
    {
      id: '3',
      title: 'Онлайн-репетиторство',
      organization: 'Освіта для всіх',
      status: 'completed' as const,
      date: '20 лист, 2025',
      location: 'Онлайн',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      case 'completed':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Підтверджено';
      case 'pending': return 'Очікування';
      case 'completed': return 'Завершено';
      default: return status;
    }
  };

  const translateRole = (role: string) => {
    const roles: Record<string, string> = {
      volunteer: 'Волонтер',
      organization: 'Організація',
      admin: 'Адміністратор'
    };
    return roles[role] || role;
  };

  const translateLocation = (loc: string) => {
    const locs: Record<string, string> = {
      rear: 'Тил',
      frontline: 'Передова',
    };
    return locs[loc] || loc;
  };

  if (!userProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Мій кабінет</h1>
              <p className="text-muted-foreground">Вітаємо, {userProfile.name}</p>
            </div>
            {userProfile.verified && (
              <div className="flex items-center gap-2 px-4 py-2 bg-[#34C759]/10 text-[#34C759] rounded-lg border border-[#34C759]/20 w-fit">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Верифікований волонтер</span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 border-b border-border pb-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#FFD600] text-foreground font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Огляд
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'opportunities'
                ? 'border-[#FFD600] text-foreground font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Мої можливості
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-3 border-b-2 transition-colors whitespace-nowrap flex items-center ${
              activeTab === 'settings'
                ? 'border-[#FFD600] text-foreground font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Налаштування
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Годин волонтерства"
                value={userProfile.stats.hours}
                subtitle="Загальний внесок"
                icon={Clock}
                variant="yellow"
              />
              <StatCard
                title="Доставок"
                value={userProfile.stats.deliveries}
                subtitle="Завершено успішно"
                icon={Package}
                variant="blue"
              />
              <StatCard
                title="Рейтинг"
                value={userProfile.stats.rating}
                subtitle="З 5.0"
                icon={Star}
              />
              <StatCard
                title="Активних"
                value={myOpportunities.filter(o => o.status !== 'completed').length}
                subtitle="Можливостей"
                icon={Calendar}
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Швидкі дії</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <AdaptiveButton variant="primary" size="lg" fullWidth onClick={() => window.location.href = '/search'}>
                  Знайти можливості
                </AdaptiveButton>
                <AdaptiveButton variant="outline" size="lg" fullWidth>
                  Оновити профіль
                </AdaptiveButton>
                <AdaptiveButton variant="outline" size="lg" fullWidth>
                  Корисні ресурси
                </AdaptiveButton>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Остання активність</h3>
              <div className="space-y-3">
                {myOpportunities.slice(0, 3).map(opportunity => (
                  <div
                    key={opportunity.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50"
                  >
                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                      {getStatusIcon(opportunity.status)}
                      <div>
                        <h4 className="text-sm font-medium">{opportunity.title}</h4>
                        <p className="text-xs text-muted-foreground">{opportunity.organization}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:text-right">
                      <p className="text-xs text-muted-foreground">{opportunity.date}</p>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(opportunity.status)}`}>
                        {getStatusLabel(opportunity.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Мої заявки</h3>
              <AdaptiveButton variant="primary" onClick={() => window.location.href = '/search'}>
                Знайти ще
              </AdaptiveButton>
            </div>

            <div className="grid gap-4">
              {myOpportunities.map(opportunity => (
                <div
                  key={opportunity.id}
                  className="bg-card border border-border rounded-lg p-6 hover:border-[#FFD600] transition-colors shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-medium">{opportunity.title}</h4>
                        {getStatusIcon(opportunity.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{opportunity.organization}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{opportunity.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{opportunity.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 min-w-[120px]">
                      <span className={`text-sm px-3 py-1 rounded text-center font-medium ${getStatusColor(opportunity.status)}`}>
                        {getStatusLabel(opportunity.status)}
                      </span>
                      {opportunity.status !== 'completed' && (
                        <AdaptiveButton variant="outline" size="sm" fullWidth>
                          Детальніше
                        </AdaptiveButton>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Налаштування відображення</h3>

            <div className="bg-card border border-border rounded-lg p-6 space-y-4 shadow-sm">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  {mode.dark ? <Moon className="w-5 h-5 text-[#FFD600]" /> : <Sun className="w-5 h-5 text-orange-500" />}
                  <div>
                    <h4 className="text-sm font-medium mb-1">Темна тема</h4>
                    <p className="text-xs text-muted-foreground">Зменшує навантаження на очі вночі</p>
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:ring-offset-2 ${
                    mode.dark ? 'bg-[#FFD600]' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                      mode.dark ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Low Bandwidth Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  {mode.lowBandwidth ? <WifiOff className="w-5 h-5 text-red-500" /> : <Wifi className="w-5 h-5 text-green-500" />}
                  <div>
                    <h4 className="text-sm font-medium mb-1">Економія трафіку</h4>
                    <p className="text-xs text-muted-foreground">Вимкнення важких зображень та анімацій</p>
                  </div>
                </div>
                <button
                  onClick={toggleLowBandwidth}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:ring-offset-2 ${
                    mode.lowBandwidth ? 'bg-[#FFD600]' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                      mode.lowBandwidth ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Frontline Mode Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`w-5 h-5 ${mode.frontline ? 'text-[#FF3B30]' : 'text-muted-foreground'}`} />
                  <div>
                    <h4 className="text-sm font-medium mb-1">Режим передової</h4>
                    <p className="text-xs text-muted-foreground">Максимально спрощений інтерфейс</p>
                  </div>
                </div>
                <button
                  onClick={toggleFrontlineMode}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:ring-offset-2 ${
                    mode.frontline ? 'bg-[#FF3B30]' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                      mode.frontline ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-semibold">Налаштування профілю</h3>
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFD600] to-[#0066FF] flex items-center justify-center shrink-0">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold mb-1">{userProfile.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {translateRole(userProfile.role)}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Локація: {translateLocation(userProfile.location)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                 <AdaptiveButton variant="outline" fullWidth>
                  Редагувати профіль
                </AdaptiveButton>
                 <AdaptiveButton variant="outline" fullWidth className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30">
                  <LogOut className="w-4 h-4 mr-2" />
                  Вийти
                </AdaptiveButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerCabinet;