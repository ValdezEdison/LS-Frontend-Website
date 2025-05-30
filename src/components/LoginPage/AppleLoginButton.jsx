import React from 'react';
import AppleSignin from 'react-apple-signin-auth';
import styles from './SocialLogin.module.css';
import { getSocialAuthAppleId, getSocialAuthAppleRedirectUri } from '../../utils/decryptSecrets';
import config from '../../config';

const AppleLoginButton = ({ onSuccess, onFailure }) => {
  const appleSignInRef = React.useRef(null);

  const handleClick = () => {
    // Programmatically trigger the Apple Sign-In
    if (appleSignInRef.current) {
      appleSignInRef.current.children[0].click();
    }
  };

  const clientId = getSocialAuthAppleId();
  const redirectURI = getSocialAuthAppleRedirectUri();

  // Generate secure random state parameter
  // Corrected secure random state parameter generator
  const generateStateParameter = () => {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('').substring(0, 16);
  };


  return (
    <>
      {/* Hidden Apple Sign-In button */}
      <div ref={appleSignInRef} style={{ display: 'none' }}>
        <AppleSignin
          authOptions={{
            clientId: clientId,
            redirectURI: redirectURI,
            scope: 'name email',
            state: generateStateParameter(),
            usePopup: true,
            responseType: 'code id_token'
          }}
          uiType="dark"
          noDefaultStyle={true}
          onSuccess={(response) => {
            if (response?.authorization?.id_token) {
              const user = {
                email: response.user?.email,
                name: response.user?.name
                  ? `${response.user.name.firstName || ''} ${response.user.name.lastName || ''}`.trim()
                  : response.user?.email || 'Apple User'
              };
              onSuccess(response.authorization.id_token, user);
            }
          }}
          onError={(error) => {
            console.log(error, 'errrrrrrrrrrrrr vc');
            onFailure(error);
          }}
          skipScript={false}
        />
      </div>

      {/* Your custom button */}
      <button 
        onClick={handleClick}
        className={styles.socialButton}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/7a85e1276dbb1f964a5470fa9883b0403ecb3ee0?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Login with Apple"
          className={styles.socialIcon}
        />
      </button>
    </>
  );
};

export default AppleLoginButton;