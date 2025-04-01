export const loadFacebookSDK = () => {
    return new Promise((resolve) => {
      if (window.FB) {
        resolve();
        return;
      }
  
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        window.fbAsyncInit = function() {
          window.FB.init({
            appId: import.meta.env.VITE_FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v18.0'
          });
          resolve();
        };
      };
      document.body.appendChild(script);
    });
  };
  
  export const handleFacebookLogin = async () => {
    try {
      await loadFacebookSDK();
      
      return new Promise((resolve, reject) => {
        window.FB.getLoginStatus((response) => {
          if (response.status === 'connected') {
            // Already logged in
            fetchUserProfile(response.authResponse.accessToken)
              .then(resolve)
              .catch(reject);
          } else {
            // Need to login
            window.FB.login((loginResponse) => {
              if (loginResponse.authResponse) {
                fetchUserProfile(loginResponse.authResponse.accessToken)
                  .then(resolve)
                  .catch(reject);
              } else {
                reject(new Error('User cancelled login or did not fully authorize.'));
              }
            }, { scope: 'public_profile,email' });
          }
        });
      });
    } catch (error) {
      throw new Error(`Facebook SDK failed to load: ${error.message}`);
    }
  };
  
  const fetchUserProfile = (accessToken) => {
    return new Promise((resolve, reject) => {
      window.FB.api('/me', { fields: 'name,email,picture' }, (userData) => {
        if (userData.error) {
          reject(new Error(userData.error.message));
        } else {
          resolve({
            ...userData,
            accessToken
          });
        }
      });
    });
  };