// Rename from getTripsTypes.ts to useTripsTypes.ts
import { useTranslation } from 'react-i18next';

export const useTripsTypes = () => {
    const { t } = useTranslation("AddTrip");
    
    return {
        solo: t('AddTrip.types.solo'),
        familiar: t('AddTrip.types.familiar'),
        business: t('AddTrip.types.business'),
        romantic: t('AddTrip.types.romantic'),
        group: t('AddTrip.types.group')
    };
};