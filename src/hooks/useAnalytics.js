import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import ReactPixel from 'react-facebook-pixel';

const useAnalytics = (config) => {
  const location = useLocation();

  useEffect(() => {
    if (!config?.enable_tracking) return;

    const ga = config.tracking_code?.googleAnalytics;
    const fb = config.tracking_code?.facebookPixel;

    // Google Analytics
    if (ga?.enabled && ga?.id) {
      ReactGA.initialize(ga.id);
      ReactGA.send({ hitType: "pageview", page: location.pathname });
    }

    // Facebook Pixel
    if (fb?.enabled && fb?.id) {
      ReactPixel.init(fb.id, {}, { autoConfig: true, debug: false });
      ReactPixel.pageView();
    }

    // Custom Scripts
    if (config.custom_scripts) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = config.custom_scripts;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [location.pathname, config]);
};

export default useAnalytics;
