import React, { useState } from 'react';
import {
  Search,
  Heart,
  Package,
  Users,
  AlertCircle,
  X,
  Send,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

type QuickAccessSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const QuickAccessSidebar: React.FC<QuickAccessSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'request'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [requestType, setRequestType] = useState<string>('');
  const [requestDetails, setRequestDetails] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const quickSearchCategories = [
    { id: 'humanitarian', label: 'Гуманітарна допомога', icon: Heart },
    { id: 'logistics', label: 'Логістика та доставка', icon: Package },
    { id: 'volunteer', label: 'Волонтерство', icon: Users },
    { id: 'urgent', label: 'Терміново', icon: AlertCircle },
  ];

  const handleQuickSearch = (category: string) => {
    setSearchQuery(category);
    // Перехід на сторінку пошуку з фільтром
    window.location.href = `/search?category=${category}`;
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();

    if (!requestType || !requestDetails || !contactInfo) {
      toast.error('Будь ласка, заповніть всі поля');
      return;
    }

    // Логіка відправки заявки
    console.log('Нова заявка:', { requestType, requestDetails, contactInfo });

    toast.success('Вашу заявку успішно відправлено!');

    // Очистка форми
    setRequestType('');
    setRequestDetails('');
    setContactInfo('');
    setActiveTab('search');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-background border-l-2 border-[#0066FF] shadow-2xl z-40 animate-in slide-in-from-right duration-200">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-[#0066FF] text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white">Швидкий доступ</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Закрити"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setActiveTab('search')}
              variant={activeTab === 'search' ? 'default' : 'outline'}
              className={`flex-1 ${
                activeTab === 'search'
                  ? 'bg-[#FFD600] text-[#0066FF] hover:bg-[#FFD600]/90'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
              size="sm"
            >
              <Search className="w-4 h-4 mr-1" />
              Пошук
            </Button>
            <Button
              onClick={() => setActiveTab('request')}
              variant={activeTab === 'request' ? 'default' : 'outline'}
              className={`flex-1 ${
                activeTab === 'request'
                  ? 'bg-[#FFD600] text-[#0066FF] hover:bg-[#FFD600]/90'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
              size="sm"
            >
              <Send className="w-4 h-4 mr-1" />
              Заявка
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'search' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Швидкий пошук</label>
                <Input
                  type="text"
                  placeholder="Введіть запит..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery) {
                      window.location.href = `/search?q=${searchQuery}`;
                    }
                  }}
                  className="w-full"
                />
              </div>

              <div>
                <p className="text-sm mb-3">Популярні категорії:</p>
                <div className="space-y-2">
                  {quickSearchCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleQuickSearch(category.id)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-accent hover:border-[#FFD600] transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-[#0066FF]/10 group-hover:bg-[#FFD600] transition-colors">
                          <Icon className="w-5 h-5 text-[#0066FF]" />
                        </div>
                        <span className="text-sm">{category.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  onClick={() => (window.location.href = '/search')}
                  className="w-full bg-[#0066FF] hover:bg-[#0066FF]/90"
                >
                  Розширений пошук
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Тип запиту *</label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-background"
                  required
                >
                  <option value="">Оберіть тип запиту</option>
                  <option value="help">Потрібна допомога</option>
                  <option value="volunteer">Хочу волонтерити</option>
                  <option value="donate">Хочу допомогти ресурсами</option>
                  <option value="logistics">Логістика/транспорт</option>
                  <option value="other">Інше</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Опис *</label>
                <Textarea
                  value={requestDetails}
                  onChange={(e) => setRequestDetails(e.target.value)}
                  placeholder="Розкажіть детальніше про ваш запит..."
                  className="w-full min-h-[120px]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Контактна інформація *
                </label>
                <Input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Телефон або email"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FFD600] text-[#0066FF] hover:bg-[#FFD600]/90"
              >
                <Send className="w-4 h-4 mr-2" />
                Відправити заявку
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
