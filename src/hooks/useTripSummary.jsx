import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useTripSummary = (items, travelTime) => {

  const { t: tCommon } = useTranslation('Common');

  return useMemo(() => {
    const stopsText = items.length > 0 
      ? tCommon('stopsCount', { count: items.length })
      : null;

    // Calculate total duration
    let durationText = null;
    if (travelTime?.routes?.[0]?.legs) {
      const totalSeconds = travelTime.routes[0].legs.reduce(
        (sum, leg) => sum + (leg.duration?.value || 0),
        0
      );
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.round((totalSeconds % 3600) / 60);
      
      durationText = `${hours}h ${tCommon('and')} ${minutes} min`;
    }

    // Combine with conditional comma
    if (stopsText && durationText) {
      return `${stopsText}, ${durationText}`;
    }
    return stopsText || durationText || tCommon('noStops');
  }, [items, travelTime, tCommon]);
};