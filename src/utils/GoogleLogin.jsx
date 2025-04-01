export const initializeGoogleSDK = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };
  
  export const handleGoogleLogin = () => {
    return new Promise((resolve, reject) => {
      try {
        const client = google.accounts.oauth2.initTokenClient({
          client_id: import.meta.env.VITE_GOOGLE_AUTH_ID,
          scope: 'profile email',
          callback: (response) => {
            if (response.error) {
              reject(new Error(response.error));
              return;
            }
            resolve(response.access_token);
          },
        });
        client.requestAccessToken();
      } catch (error) {
        reject(error);
      }
    });
  };