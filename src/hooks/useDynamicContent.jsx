import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

/**
 * Dynamically selects content based on localStorage('tagDetails')
 * @param {string} type - 'events' | 'places' | 'itineraries' (matches Redux state structure)
 * @returns {Object} { loading, error, data, next, count, source }
 */
const useDynamicContent = (type) => {
  const [useTagData, setUseTagData] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const tagDetails = localStorage.getItem('tagDetails');
    setUseTagData(!!tagDetails);
  }, []);

  // Get both data sources from Redux
  const defaultData = useSelector((state) => {
    switch (type) {
      case 'events':
        return state.eventsByCity;
      case 'places':
        return state.placesInCity;
      case 'itineraries':
        return state.itineraries;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  });

  const tagData = useSelector((state) => state.tags);

  return useTagData
    ? {
        loading: tagData.loading,
        error: tagData.error,
        data: tagData.data, // Tags data is always in `data`
        next: tagData.next,
        count: tagData.count,
        source: 'tags'
      }
    : {
        loading: defaultData.loading,
        error: defaultData.error,
        data: defaultData[type], // e.g., events, places, etc.
        next: defaultData.next,
        count: defaultData.count,
        source: 'default'
      };
};

export default useDynamicContent;