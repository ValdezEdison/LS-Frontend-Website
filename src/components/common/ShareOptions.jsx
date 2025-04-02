import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon
  } from 'react-share';
  import { CopyToClipboard } from 'react-copy-to-clipboard';
  import { useState, useEffect } from 'react';
  import styles from "../../pages/placesDetail/PlaceDetails.module.css";
  
  const ShareOptions = ({ url, title, description, onClose }) => {
    const [copied, setCopied] = useState(false);
  
    useEffect(() => {
      if (copied) {
        const timer = setTimeout(() => setCopied(false), 3000);
        return () => clearTimeout(timer);
      }
    }, [copied]);
  
    return (
      <div className={styles.shareOptions}>
        <div className={styles.shareOption}>
          <FacebookShareButton url={url} quote={description}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          {/* <span>Facebook</span> */}
        </div>
{/*         
        <div className={styles.shareOption}>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div> */}
        
        <div className={styles.shareOption}>
          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          {/* <span>WhatsApp</span> */}
        </div>
        
        <div className={styles.shareOption}>
          <EmailShareButton url={url} subject={title} body={description}>
            <EmailIcon size={32} round />
          </EmailShareButton>
          {/* <span>Email</span> */}
        </div>
        
        <div className={styles.shareOption}>
          <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
            <button className={styles.copyButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </CopyToClipboard>
          <span className={styles.copyText}>{copied ? 'Copied!' : ''}</span>
        </div>
        
        <button className={styles.closeShareButton} onClick={onClose}>
        </button>
      </div>
    );
  };

  export default ShareOptions;