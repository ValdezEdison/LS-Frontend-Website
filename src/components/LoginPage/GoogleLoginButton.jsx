import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Google } from '../common/Images';
import React from 'react';

const GoogleLoginButton = ({ onSuccess, onFailure, styles }) => {
  const googleLoginRef = React.useRef(null);

  const handleCustomClick = () => {
    googleLoginRef.current.click();
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_ID}>
      <div style={{ position: 'relative' }}>
        {/* Hidden Google Login Button */}
        <div style={{
          position: 'absolute',
          opacity: 0,
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}>
          <GoogleLogin
            ref={googleLoginRef}
            onSuccess={credentialResponse => {
              try {
                const decoded = jwtDecode(credentialResponse.credential);
                onSuccess({
                  token: credentialResponse.credential,
                  user: {
                    email: decoded.email,
                    name: decoded.name,
                    picture: decoded.picture,
                    sub: decoded.sub
                  }
                });
              } catch (error) {
                onFailure(new Error('Failed to decode Google token'));
              }
            }}
            onError={() => {
              onFailure(new Error('Google login failed'));
            }}
            useOneTap
            auto_select
          />
        </div>
        
        {/* Your Custom Button */}
        <button 
          onClick={handleCustomClick}
         className={styles.socialButton}
        >
          <img src={Google} alt="Google logo" />
          
        </button>
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;