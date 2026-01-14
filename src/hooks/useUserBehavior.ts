import { useEffect, useRef, useState } from 'react';

export type ClickZoneStats = {
  id: string;
  count: number;
  lastClickAt: number;
};

export type BehaviorPattern = {
  chaoticScrolling: boolean;
  longBrowsing: boolean;
  clickDifficulty: boolean;
  scrollCount: number;
  timeOnPage: number;
  missedClicks: number;
  consecutiveMisses: number;
  uiScaleFactor: number;
  clickHeatmap: Record<string, ClickZoneStats>;
  complexityLevel: 1 | 2 | 3;
};

const INITIAL_BEHAVIOR: BehaviorPattern = {
  chaoticScrolling: false,
  longBrowsing: false,
  clickDifficulty: false,
  scrollCount: 0,
  timeOnPage: 0,
  missedClicks: 0,
  consecutiveMisses: 0,
  uiScaleFactor: 1.0,
  clickHeatmap: {},
  complexityLevel: 2,
};

const MISS_RADIUS_PX = 30;
const MISSES_FOR_SCALE = 3;
const UI_SCALE_STEP = 0.15;
const UI_SCALE_MAX = 1.75;

const isClickableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return !!target.closest('button, a, [role="button"]');
};

const distancePointToRect = (x: number, y: number, r: DOMRect): number => {
  const dx = x < r.left ? r.left - x : x > r.right ? x - r.right : 0;
  const dy = y < r.top ? r.top - y : y > r.bottom ? y - r.bottom : 0;
  return Math.hypot(dx, dy);
};

const findNearestClickable = (
  x: number,
  y: number,
  radius: number
): HTMLElement | null => {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>('button, a, [role="button"]')
  ).filter((el) => {
    // не враховувати приховані/відключені
    if (el.hasAttribute('disabled')) return false;
    if (el.getAttribute('aria-disabled') === 'true') return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    return true;
  });

  let best: { el: HTMLElement; dist: number } | null = null;

  for (const el of candidates) {
    const rect = el.getBoundingClientRect();
    const dist = distancePointToRect(x, y, rect);

    if (dist > radius) continue;

    if (!best || dist < best.dist) {
      best = { el, dist };
    }
  }

  return best?.el ?? null;
};

const recomputeComplexity = (
  prev: BehaviorPattern,
  updatedHeatmap: Record<string, ClickZoneStats>
): 1 | 2 | 3 => {
  const { missedClicks, chaoticScrolling, timeOnPage } = prev;

  let score = 0;

  if (missedClicks <= 2) score += 2;
  else if (missedClicks <= 5) score += 1;
  else score -= 2;

  if (!chaoticScrolling) score += 2;
  else score -= 2;

  if (timeOnPage < 60_000) score += 1;
  else if (timeOnPage > 180_000) score -= 1;

  const zones = Object.values(updatedHeatmap);
  const hotZones = zones.filter((z) => z.count >= 5);
  if (hotZones.length >= 2) score += 1;

  if (prev.complexityLevel === 3) score += 1;
  if (prev.complexityLevel === 1) score -= 1;

  if (score <= 0) return 1;
  if (score <= 3) return 2;
  return 3;
};

export const useUserBehavior = () => {
  const [behavior, setBehavior] = useState<BehaviorPattern>(INITIAL_BEHAVIOR);
  const pageLoadTime = useRef<number>(Date.now());
  const scrollCountRef = useRef(0);

  // Трекінг часу на сторінці
  useEffect(() => {
    pageLoadTime.current = Date.now();

    const interval = window.setInterval(() => {
      setBehavior((prev) => {
        const nextTime = Date.now() - pageLoadTime.current;
        return {
          ...prev,
          timeOnPage: nextTime,
          scrollCount: scrollCountRef.current,
          longBrowsing: nextTime > 5 * 60_000,
        };
      });
    }, 5_000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  // Детекція хаотичного скролу
  useEffect(() => {
    const lastYRef = { current: window.scrollY };
    const calmTimerRef = { current: 0 as number | undefined };

    let events: Array<{ t: number; dir: -1 | 1 }> = [];

    const markCalmLater = () => {
      if (calmTimerRef.current) window.clearTimeout(calmTimerRef.current);
      calmTimerRef.current = window.setTimeout(() => {
        events = [];
        setBehavior((prev) =>
          prev.chaoticScrolling ? { ...prev, chaoticScrolling: false } : prev
        );
      }, 1200);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastYRef.current;
      lastYRef.current = y;

      // дрібний шум не враховуємо
      if (Math.abs(dy) < 4) {
        markCalmLater();
        return;
      }

      // scrollCount — лічильник подій, але без ререндеру на кожен scroll
      scrollCountRef.current += 1;

      const dir: -1 | 1 = dy > 0 ? 1 : -1;
      const now = Date.now();

      events.push({ t: now, dir });
      events = events.filter((e) => now - e.t <= 2000);

      let reversals = 0;
      for (let i = 1; i < events.length; i++) {
        if (events[i].dir !== events[i - 1].dir) reversals++;
      }

      const tooManyEvents = events.length >= 22;
      const tooManyReversals = reversals >= 6;

      if (tooManyEvents && tooManyReversals) {
        setBehavior((prev) =>
          prev.chaoticScrolling ? prev : { ...prev, chaoticScrolling: true }
        );
      }

      markCalmLater();
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (calmTimerRef.current) window.clearTimeout(calmTimerRef.current);
    };
  }, []);

  // Детекція промахів біля інтерактивних елементів (кнопки/посилання)
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      // мишка: тільки ЛКМ; тач/пен: e.button часто 0 або -1
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      if (isClickableTarget(e.target)) {
        // успішний клік по інтерактивному — збиваємо серію промахів
        setBehavior((prev) =>
          prev.consecutiveMisses
            ? { ...prev, consecutiveMisses: 0 }
            : prev
        );
        return;
      }

      const nearest = findNearestClickable(e.clientX, e.clientY, MISS_RADIUS_PX);
      if (!nearest) return;

      setBehavior((prev) => {
        const nextConsecutive = prev.consecutiveMisses + 1;
        const nextMissed = prev.missedClicks + 1;

        let nextScale = prev.uiScaleFactor;
        let nextDifficulty = prev.clickDifficulty;
        let finalConsecutive = nextConsecutive;

        if (nextConsecutive >= MISSES_FOR_SCALE) {
          const bumped = Math.min(
            UI_SCALE_MAX,
            Number((prev.uiScaleFactor + UI_SCALE_STEP).toFixed(2))
          );

          if (bumped > prev.uiScaleFactor) {
            nextScale = bumped;
          }

          nextDifficulty = true;
          finalConsecutive = 0; // наступне збільшення — після нових 3 промахів
        }

        return {
          ...prev,
          missedClicks: nextMissed,
          consecutiveMisses: finalConsecutive,
          uiScaleFactor: nextScale,
          clickDifficulty: nextDifficulty,
        };
      });
    };

    // capture=true — щоб ловити промахи навіть якщо десь stopPropagation
    window.addEventListener('pointerdown', onPointerDown, {
      passive: true,
      capture: true,
    });

    return () => {
      window.removeEventListener('pointerdown', onPointerDown, true);
    };
  }, []);

  const updateBehavior = (patch: Partial<BehaviorPattern>) => {
    setBehavior((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  const resetBehavior = () => {
    pageLoadTime.current = Date.now();
    scrollCountRef.current = 0;
    setBehavior(INITIAL_BEHAVIOR);
  };

  const registerZoneClick = (zoneId: string) => {
    if (!zoneId) return;

    setBehavior((prev) => {
      const prevZone = prev.clickHeatmap[zoneId];

      const updatedZone: ClickZoneStats = {
        id: zoneId,
        count: (prevZone?.count ?? 0) + 1,
        lastClickAt: Date.now(),
      };

      const updatedHeatmap: Record<string, ClickZoneStats> = {
        ...prev.clickHeatmap,
        [zoneId]: updatedZone,
      };

      const nextComplexity = recomputeComplexity(prev, updatedHeatmap);

      return {
        ...prev,
        clickHeatmap: updatedHeatmap,
        complexityLevel: nextComplexity,
      };
    });
  };

  return {
    behavior,
    updateBehavior,
    resetBehavior,
    registerZoneClick,
  };
};
