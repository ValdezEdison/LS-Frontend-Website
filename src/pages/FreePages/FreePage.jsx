import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchFreePages } from '../../features/cms/Pages/PagesAction';
import { LanguageContext } from '../../context/LanguageContext';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Loader from '../../components/common/Loader';
import { useTranslation } from 'react-i18next';


const FreePage = ({ routeSlug }) => {

    const { t: tCommon } = useTranslation('Common');
    
    const dispatch = useDispatch();
    const { languageId } = useContext(LanguageContext);
    const { slug } = useParams(); // This will be the actual URL parameter
    const { freePagesLoading, freePages } = useSelector((state) => state.cms.pages);
    const [currentPage, setCurrentPage] = useState(null);
  
    // Slug mapping for simplified URLs
    const slugMapping = {
      'terms-conditions': 'terms-and-conditions-of-use--local-secrets',
      'privacy-policy': 'local-secrets-privacy-policy',
      'cookie-settings': 'local-secrets-cookie-policy',
    };
  
    useEffect(() => {
      dispatch(fetchFreePages(languageId));
    }, [dispatch, languageId]);
  
    useEffect(() => {
      if (freePages?.[0]?.pages) {
        // Use the actual URL parameter (slug) first, then fallback to routeSlug prop
        const activeSlug = slug || routeSlug;
        
        // Check both original and simplified slugs
        const matchedPage = freePages[0].pages.find(
          page => page.slug === activeSlug || 
                 page.slug === slugMapping[activeSlug]
        );
        setCurrentPage(matchedPage || null);
      }
    }, [freePages, slug, routeSlug]);
  
    if (freePagesLoading) return <Loader />;
    
    if (!currentPage) return <div>{tCommon('pageNotFound')}</div>;
   
    return (
      <>
        <Header />
        <main className="page-center">
          <div className="container">
            <h1 className="page-title">{currentPage.title}</h1>
            <div 
              className="page-content" 
              dangerouslySetInnerHTML={{ __html: currentPage.content }} 
            />
          </div>
        </main>
        <Footer />
      </>
    );
  };
  
  export default FreePage;

