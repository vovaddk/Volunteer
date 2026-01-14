import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Link } from '../../lib/router';
import { AdaptiveButton } from '../AdaptiveButton';
import { Users, Building } from 'lucide-react';
import translations from '../../lib/translations';

export const HeroSection: React.FC = () => {
  const { mode } = useApp();
  const t = translations.hero;

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD600]/10 via-transparent to-[#0066FF]/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl">
              {mode.frontline ? t.titleFrontline : t.title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              {mode.frontline ? t.descriptionFrontline : t.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/for-volunteers">
                <AdaptiveButton
                  size={mode.frontline ? 'xl' : 'lg'}
                  variant="primary"
                  fullWidth
                  className="sm:w-auto"
                >
                  <Users className="w-5 h-5" />
                  {t.forVolunteers}
                </AdaptiveButton>
              </Link>

              <Link to="/for-organizations">
                <AdaptiveButton
                  size={mode.frontline ? 'xl' : 'lg'}
                  variant="secondary"
                  fullWidth
                  className="sm:w-auto"
                >
                  <Building className="w-5 h-5" />
                  {t.forOrganizations}
                </AdaptiveButton>
              </Link>
            </div>

            {mode.frontline && (
              <div className="p-4 bg-[#FF3B30]/10 border border-[#FF3B30]/30 rounded-lg">
                <p className="text-sm text-[#FF3B30] dark:text-red-400">
                  🔥 <strong>{t.frontlineActive}</strong> - {t.frontlineDescription}
                </p>
              </div>
            )}
          </div>

          {/* Right: Hero Image */}
          {!mode.lowBandwidth && (
            <div className="relative">
              <div className="aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.pixabay.com/photo/2022/03/01/06/20/flag-7040685_1280.jpg"
                  alt="Волонтери допомагають громаді"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FFD600] rounded-full blur-3xl opacity-50" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#0066FF] rounded-full blur-3xl opacity-50" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};