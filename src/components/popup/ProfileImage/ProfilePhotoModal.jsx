import React, { useState, useRef, useEffect } from "react";
import styles from "./ProfilePhotoModal.module.css";

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
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
            {selectedFile ? "Change Photo" : "Select Photo"}
          </button>
       </div>
        
        
        <div className={styles.profileImageUploadWrapperRight}>
          <h3>Sube una foto</h3>
          <button 
            className={styles.saveButton} 
            onClick={handleSave}
            disabled={!selectedFile || loading}
          >
            {loading ? "Uploading..." : "Save Changes"}
          </button>
        </div>
      </div>
    // </div>
  );
}

export default ProfilePhotoPopup;