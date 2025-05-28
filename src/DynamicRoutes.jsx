import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FreePage from './pages/FreePages/FreePage';
import { fetchFreePages } from './features/cms/Pages/PagesAction';
import { useEffect, useContext } from 'react';
import { LanguageContext } from './context/LanguageContext';
import Loader from './components/common/Loader';
import PageNotFound from './components/common/PageNotFound';
import { useTranslation } from 'react-i18next';

const DynamicRoutes = () => {
  const dispatch = useDispatch();
  const { languageId } = useContext(LanguageContext);
  const freePages = useSelector((state) => state.cms.pages.freePages);
  const { freePagesLoading } = useSelector((state) => state.cms.pages);

  const { t } = useTranslation("PageNotFound");

  // Slug mapping for simplified URLs
  const slugMapping = {
    'terms-conditions': 'terms-and-conditions-of-use--local-secrets',
    'privacy-policy': 'local-secrets-privacy-policy',
    'cookie-settings': 'local-secrets-cookie-policy',
  };

  useEffect(() => {
    dispatch(fetchFreePages(languageId));
  }, [dispatch, languageId]);

  return (
    <Routes>
      {freePages?.[0]?.pages?.map((page) => {
        // Find if this page has a simplified slug
        const simpleSlug = Object.keys(slugMapping).find(
          key => slugMapping[key] === page.slug
        );

        const routeSlug = simpleSlug || page.slug;
        
        return (
          <Route
            key={page.id}
            path={`/${simpleSlug || page.slug}`}
            element={<FreePage routeSlug={routeSlug}/>}
          />
        );
      })}
      {!freePagesLoading &&  <Route path="*" element={<PageNotFound 
        type={t("pageNotFound.404")} 
        content={t("pageNotFound.content")}
        message={t("pageNotFound.message")}
      />} />
      }
    </Routes>
  );
};

export default DynamicRoutes;