import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Link } from '../lib/router';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { mode } = useApp();

  if (mode.frontline) {
    return (
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Volunteer+ © 2025 • Екстрена підтримка: +380 800 123 456</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFD600] to-[#0066FF] rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">V+</span>
              </div>
              <span>Volunteer+</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Єднаємо волонтерів та організації по всій Україні для реальних змін.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Heart className="w-4 h-4 text-[#FF3B30]" />
              <span className="text-muted-foreground">Створено з любов'ю до України</span>
            </div>
          </div>

          {/* For Volunteers */}
          <div>
            <h4 className="mb-4">Для волонтерів</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-[#0066FF] transition-colors">
                  Знайти можливості
                </Link>
              </li>
              <li>
                <Link to="/learning" className="text-muted-foreground hover:text-[#0066FF] transition-colors">
                  Навчання та ресурси
                </Link>
              </li>
              <li>
                <Link to="/cabinet" className="text-muted-foreground hover:text-[#0066FF] transition-colors">
                  Мій кабінет
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-muted-foreground hover:text-[#0066FF] transition-colors">
                  Правила безпеки
                </Link>
              </li>
            </ul>
          </div>

          {/* For Organizations */}
          <div>
            <h4 className="mb-4">Для організацій</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/organizations/register" className="text-muted-foreground hover:text-[#0066FF] transition-colors">
                  Зареєструвати організацію
                </Link>
              </li>
              <li>
                <Link to="/organizations/find-volunteers" className="text-muted-foreground hover:text-[#0066FF] transition-colors">
                  Знайти волонтерів
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-[#0066FF] transition-colors">
                  Ресурси
                </Link>
              </li>
              <li>
                <Link to="/organizations/best-practices" className="text-muted-foreground hover:text-[#0066FF] transition-colors">
                  Кращі практики
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="mb-4">Контакти та підтримка</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <a href="mailto:support@volunteerplus.ua" className="text-muted-foreground hover:text-[#0066FF] transition-colors">
                  support@volunteerplus.ua
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <a href="tel:+380800123456" className="text-muted-foreground hover:text-[#0066FF] transition-colors">
                  +380 800 123 456
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Київ, Україна
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 Volunteer+. Всі права захищені.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-[#0066FF] transition-colors">
                Політика конфіденційності
              </Link>
              <Link to="/terms" className="hover:text-[#0066FF] transition-colors">
                Умови використання
              </Link>
              <Link to="/about" className="hover:text-[#0066FF] transition-colors">
                Про нас
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};