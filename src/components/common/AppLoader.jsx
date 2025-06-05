import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAnalyticsSettingsList } from '../../features/cms/Blocks/BlocksAction';
import { LanguageContext } from '../../context/LanguageContext';

const AppLoader = () => {
  const dispatch = useDispatch();
  const { language, languageId } = useContext(LanguageContext);

  useEffect(() => {
    if (languageId) {
      dispatch(fetchAnalyticsSettingsList(languageId));
    }
  }, [dispatch, language]);

  return null;
};

export default AppLoader;
