import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_ID}>
      <GoogleLogin
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
        shape="pill"
        size="large"
        text="continue_with"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;