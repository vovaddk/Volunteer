import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserRole =
  | 'volunteer'
  | 'organization'
  | 'coordinator'
  | 'deliverer'
  | 'displaced'
  | null;

export type AppMode = {
  dark: boolean;
  lowBandwidth: boolean;
  frontline: boolean;
  compact: boolean;
  largeUI: boolean;

  eyeComfort: boolean;
  nightSuggestionShown: boolean;
};

export type UserProfile = {
  name: string;
  role: UserRole;
  location: 'frontline' | 'rear' | 'deoccupied' | 'online';
  verified: boolean;
  stats: {
    hours: number;
    deliveries: number;
    rating: number;
  };
  preferences: string[];
};

export type ClickZoneStats = {
  id: string;
  count: number;
  lastClickAt: number;
};

export type BehavioralData = {
  frequentCategories: string[];
  recentSearches: string[];
  preferredUrgency: boolean;

  clickHeatmap: Record<string, ClickZoneStats>;
  uiComplexityLevel: 1 | 2 | 3;
};

type AppContextType = {
  mode: AppMode;
  setMode: (patch: Partial<AppMode>) => void;
  toggleDarkMode: () => void;
  toggleLowBandwidth: () => void;
  toggleFrontlineMode: () => void;
  toggleLargeUI: () => void;

  toggleEyeComfort: () => void;
  // автоматичне керування (без фіксації manual-прапорця)
  setEyeComfortAuto: (enabled: boolean) => void;
  markNightSuggestionShown: () => void;

  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;

  behavioralData: BehavioralData;
  updateBehavior: (data: Partial<BehavioralData>) => void;

  registerZoneClick: (zoneId: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const recomputeComplexity = (
  prev: BehavioralData,
  heatmap: Record<string, ClickZoneStats>
): 1 | 2 | 3 => {
  const zones = Object.values(heatmap);
  if (zones.length === 0) return 1;

  const totalClicks = zones.reduce((sum, z) => sum + z.count, 0);
  const maxCount = zones.reduce((m, z) => (z.count > m ? z.count : m), 0);

  let level: 1 | 2 | 3 = 1;

  if (totalClicks < 3) {
    level = 1;
  } else if (maxCount >= 3 && maxCount < 7) {
    level = 2;
  } else if (maxCount >= 7) {
    level = 3;
  } else {
    level = 2;
  }

  if (level > prev.uiComplexityLevel && totalClicks < 5) {
    return prev.uiComplexityLevel;
  }

  return level;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setModeState] = useState<AppMode>({
    dark: false,
    lowBandwidth: false,
    frontline: false,
    compact: false,
    largeUI: false,
    eyeComfort: false,
    nightSuggestionShown: false,
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const [behavioralData, setBehavioralData] = useState<BehavioralData>({
    frequentCategories: [],
    recentSearches: [],
    preferredUrgency: false,
    clickHeatmap: {},
    uiComplexityLevel: 1,
  });

  // авто-компакт для мобільних + low bandwidth
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setModeState((prev) => ({ ...prev, compact: true }));
    }

    const connection = (navigator as any).connection;
    if (
      connection &&
      (connection.effectiveType === 'slow-2g' ||
        connection.effectiveType === '2g')
    ) {
      setModeState((prev) => ({ ...prev, lowBandwidth: true }));
    }
  }, []);

  // темна тема: клас на <html>
  useEffect(() => {
    if (mode.dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode.dark]);

  // великий UI: масштаб
  useEffect(() => {
    if (mode.largeUI) {
      document.documentElement.style.setProperty('--scale-factor', '1.3');
      document.documentElement.classList.add('large-ui');
    } else {
      document.documentElement.style.setProperty('--scale-factor', '1');
      document.documentElement.classList.remove('large-ui');
    }
  }, [mode.largeUI]);

  // жовтий фільтр: клас на <body>
  useEffect(() => {
    if (mode.eyeComfort) {
      document.body.classList.add('eye-comfort');
    } else {
      document.body.classList.remove('eye-comfort');
    }
  }, [mode.eyeComfort]);

  const setMode = (patch: Partial<AppMode>) => {
    setModeState((prev) => ({ ...prev, ...patch }));
  };

  const toggleDarkMode = () => {
    setModeState((prev) => ({ ...prev, dark: !prev.dark }));
  };

  const toggleLowBandwidth = () => {
    setModeState((prev) => ({
      ...prev,
      lowBandwidth: !prev.lowBandwidth,
    }));
  };

  const toggleFrontlineMode = () => {
    setModeState((prev) => ({ ...prev, frontline: !prev.frontline }));
  };

  const toggleLargeUI = () => {
    setModeState((prev) => ({ ...prev, largeUI: !prev.largeUI }));
  };

  const toggleEyeComfort = () => {
    // якщо користувач перемикав вручну — автомат не має «відкотити» назад
    try {
      localStorage.setItem('eyeComfortManual', '1');
    } catch {}

    setModeState((prev) => ({ ...prev, eyeComfort: !prev.eyeComfort }));
  };

  const setEyeComfortAuto = (enabled: boolean) => {
    // авто-режим не повинен виставляти eyeComfortManual
    setModeState((prev) =>
      prev.eyeComfort === enabled ? prev : { ...prev, eyeComfort: enabled }
    );
  };

  const markNightSuggestionShown = () => {
    setModeState((prev) => ({ ...prev, nightSuggestionShown: true }));
  };

  const updateBehavior = (data: Partial<BehavioralData>) => {
    setBehavioralData((prev) => ({ ...prev, ...data }));
  };

  const registerZoneClick = (zoneId: string) => {
    if (!zoneId) return;

    setBehavioralData((prev) => {
      const prevZone = prev.clickHeatmap[zoneId];
      const updatedZone: ClickZoneStats = {
        id: zoneId,
        count: (prevZone?.count ?? 0) + 1,
        lastClickAt: Date.now(),
      };

      const heatmap = {
        ...prev.clickHeatmap,
        [zoneId]: updatedZone,
      };

      const nextLevel = recomputeComplexity(prev, heatmap);

      return {
        ...prev,
        clickHeatmap: heatmap,
        uiComplexityLevel: nextLevel,
      };
    });
  };

  const value: AppContextType = {
    mode,
    setMode,
    toggleDarkMode,
    toggleLowBandwidth,
    toggleFrontlineMode,
    toggleLargeUI,
    toggleEyeComfort,
    setEyeComfortAuto,
    markNightSuggestionShown,
    userProfile,
    setUserProfile,
    behavioralData,
    updateBehavior,
    registerZoneClick,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
