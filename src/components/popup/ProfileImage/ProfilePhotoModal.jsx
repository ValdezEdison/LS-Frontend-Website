import React, { useState, useRef, useEffect } from "react";
import styles from "./ProfilePhotoModal.module.css";
import { useTranslation } from "react-i18next";

function ProfilePhotoPopup({ 
  onClose, 
  onSave, 
  currentPhoto, 
  loading, 
  error 
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentPhoto || "/profile-placeholder.jpg");
  const [croppedImage, setCroppedImage] = useState(null);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const { t } = useTranslation('ProfileSection');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert(t('profilePhoto.validation.fileType'));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert(t('profilePhoto.validation.fileSize'));
        return;
      }

      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    if (selectedFile) {
      // Here you could implement actual cropping logic before saving
      onSave(selectedFile);
    } else {
      onClose();
    }
  };

  const handleCropChange = (crop) => {
    setCrop(crop);
  };

  const handleZoomChange = (e) => {
    setZoom(e.target.value);
  };

  return (
    // <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${styles.profileImageUploadWrapper}`}>
        {/* <h2 className={styles.modalTitle}>Update Profile Photo</h2> */}
       <div className={styles.profileImageUploadWrapperLeft}>
       <div className={styles.profileImageContainer}>
          <div className={styles.imagePreviewWrapper}>
            <img
              src={previewUrl}
              alt="Profile preview"
              className={styles.profileImage}
              ref={imageRef}
              onError={(e) => {
                e.target.src = "/profile-placeholder.jpg";
              }}
            />
          </div>
          
       
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
       <button 
            className={styles.changeButton} 
            onClick={handleChangeClick}
            disabled={loading}
          >
           {selectedFile ? t('profilePhoto.buttons.change') : t('profilePhoto.buttons.select')}
          </button>
       </div>
        
        
        <div className={styles.profileImageUploadWrapperRight}>
        <h3>{t('profilePhoto.uploadTitle')}</h3>
          <button 
            className={styles.saveButton} 
            onClick={handleSave}
            disabled={!selectedFile || loading}
          >
            {loading ? t('profilePhoto.buttons.uploading') : t('profilePhoto.buttons.save')}
          </button>
        </div>
      </div>
    // </div>
  );
}

export default ProfilePhotoPopup;