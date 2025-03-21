import React from "react";
import styles from "./SocialLogin.module.css";
import { Google } from "../common/Images";

const SocialLogin = () => {
  return (
    <div className={styles.socialLoginContainer}>
      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span className={styles.dividerText}>o usar una de estas opciones</span>
        <span className={styles.dividerLine} />
      </div>
      
      <div className={styles.socialButtons}>
        {/* <button className={`${styles.socialButton} ${styles.facebook}`}>
          <svg
            width="33"
            height="27"
            viewBox="0 0 33 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
           
          </svg>
        </button> */}
         <img
                    src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/0a010d4457c95f00c854c5d6f7e9f625de5e8b20?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                    alt="Login with Google"
                    className={styles.socialIcon}
                  />
        <button className={styles.socialButton}>
          <img src={Google}/>
        </button>
       <img
                   src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/7a85e1276dbb1f964a5470fa9883b0403ecb3ee0?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                   alt="Login with Facebook"
                   className={styles.socialIcon}
                 />
      </div>
    </div>
  );
};

export default SocialLogin;
