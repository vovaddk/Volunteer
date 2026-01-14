import { useMemo } from 'react';
import { useApp } from '../contexts/AppContext';

// Пороги, щоб було видно ефект у реальному часі
const HOT_MIN_COUNT = 2;
const HOT_INTENSITY = 0.5; // 50% від найгарячішої зони
const COLD_INACTIVITY_MS = 30_000; // 30 секунд без кліків

export const useHeatZone = (zoneId: string) => {
  const { behavioralData, registerZoneClick } = useApp();
  const { clickHeatmap } = behavioralData;

  return useMemo(() => {
    const stats = clickHeatmap[zoneId];
    const zones = Object.values(clickHeatmap);

    const maxCount = zones.length ? Math.max(...zones.map((z) => z.count)) : 0;

    const intensity = stats && maxCount > 0 ? stats.count / maxCount : 0;

    const now = Date.now();

    const isHot =
      !!stats && stats.count >= HOT_MIN_COUNT && intensity >= HOT_INTENSITY;

    const isCold =
      !!stats &&
      stats.count <= 1 &&
      now - stats.lastClickAt > COLD_INACTIVITY_MS;

    return {
      stats,
      intensity,
      isHot,
      isCold,
      registerClick: () => registerZoneClick(zoneId),
    };
  }, [clickHeatmap, zoneId, registerZoneClick]);
};
