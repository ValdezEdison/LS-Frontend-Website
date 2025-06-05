// src/components/AnalyticsTracker.jsx
import { useSelector } from 'react-redux';
import { selectAnalyticsSettings } from '../features/cms/Blocks/BlocksSelectors';
import useAnalytics from '../hooks/useAnalytics';

const AnalyticsTracker = () => {
  const analyticsConfig = useSelector(selectAnalyticsSettings);
  useAnalytics(analyticsConfig);

  return null;
};

export default AnalyticsTracker;
