import React from 'react';
import AppleSignin from 'react-apple-signin-auth';
import styles from './SocialLogin.module.css';
import { getSocialAuthAppleIdKey } from '../../utils/decryptSecrets';
import config from '../../config';

const AppleLoginButton = ({ onSuccess, onFailure }) => {
  const appleSignInRef = React.useRef(null);

  const handleClick = () => {
    // Programmatically trigger the Apple Sign-In
    if (appleSignInRef.current) {
      appleSignInRef.current.children[0].click();
    }
  };

  const clientId = getSocialAuthAppleIdKey();
  const baseURL  = config.api.baseUrl;

  return (
    <>
      {/* Hidden Apple Sign-In button */}
      <div ref={appleSignInRef} style={{ display: 'none' }}>
        <AppleSignin
          authOptions={{
            clientId: clientId,
            redirectURI: `${baseURL}/auth/apple/callback`,
            scope: 'name email',
            state: 'state',
            usePopup: true
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