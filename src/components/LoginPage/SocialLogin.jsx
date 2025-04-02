import React from "react";
import styles from "./SocialLogin.module.css";
import { Google } from "../common/Images";
import GoogleLoginButton from "./GoogleLoginButton";
import FacebookLogin from '@greatsumini/react-facebook-login';

const SocialLogin = ({ onSocialLogin }) => {

  const handleGoogleSuccess = (response) => {
    onSocialLogin('google', response.token);
  };

  const handleGoogleFailure = (error) => {
    onSocialLogin('google', null, error);
  };

  const handleFacebookSuccess = (response) => {
    onSocialLogin('facebook', response.accessToken);
  };

  const handleFacebookFailure = (error) => {
    onSocialLogin('facebook', null, error);
  };

  return (
    <div className={styles.socialLogin}>
      <div className={styles.divider}>
        <span className={styles.dividerLine}></span>
        <span className={styles.dividerText}>o usar una de estas opciones</span>
        <span className={styles.dividerLine}></span>
      </div>
      <div className={styles.socialButtons}>
        {/* <button className={styles.socialButton} onClick={() => onSocialLogin('facebook')}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/0a010d4457c95f00c854c5d6f7e9f625de5e8b20?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Login with Google"
            className={styles.socialIcon}
          />
        </button> */}
        {/* <button className={styles.socialButton} onClick={() => onSocialLogin('google')}>
          <img src={Google}/>
        </button> */}
          <FacebookLogin
          appId={import.meta.env.VITE_FACEBOOK_ID} // Add this to your .env
          onSuccess={handleFacebookSuccess}
          onFail={handleFacebookFailure}
          className={styles.socialButton}
        
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/0a010d4457c95f00c854c5d6f7e9f625de5e8b20?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Login with Facebook"
            className={styles.socialIcon}
          />
        </FacebookLogin>
          <GoogleLoginButton 
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
          // disabled={loading}
        />
        <button className={styles.socialButton} >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/7a85e1276dbb1f964a5470fa9883b0403ecb3ee0?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Login with Facebook"
            className={styles.socialIcon}
          />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
