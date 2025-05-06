import React, { useState } from "react";
import styles from "./PersonalDetails.module.css";
import { ProfilePlaceholder } from "../common/Images";

const PersonalDetails = ({ user }) => {
  const [editingField, setEditingField] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  
  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEditClick = (label, currentValue) => {
    setEditingField(label);
    setEditedValue(currentValue);
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    console.log(`Saving ${editingField}: ${editedValue}`);
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const details = [
    { 
      label: "Profile Type", 
      value: user.current_trip.type || "Not provided", 
      action: "Info" 
    },
    { 
      label: "Name", 
      value: `${user.first_name} ${user.last_name}` || "Not provided", 
      action: "Edit" 
    },
    {
      label: "Email Address",
      value: user.email || "Not provided",
      action: "Edit",
      verified: true,
    },
    { 
      label: "Phone Number", 
      value: user.phone ? `+${user.phone_prefix} ${user.phone}` : "Not provided", 
      action: "Edit" 
    },
    {
      label: "Member Since",
      value: formatDate(user.date_joined),
      action: "Info"
    },
    {
      label: "Current Trip",
      value: user.current_trip ? user.current_trip.title : "Not traveling now",
      action: "View"
    },
    {
      label: "Past Travels",
      value: user.num_of_past_travels || "0",
      action: "View"
    },
  ];

  return (
    <div className={styles.personalDetails}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Personal Details</h2>
          <p className={styles.subtitle}>
            Update your personal information by editing the profile
          </p>
        </div>
        <div className={styles.profileImageWrapper}>
          <div className={styles.galleryEditOverlay}>
            <div className={styles.galleryEdit}></div>
          </div>
          <img
            src={user.profile_picture?.fullsize || ProfilePlaceholder}
            alt="Profile"
            className={styles.profileImage}
          />
        </div>
        
      </div>
      {details.map((detail, index) => (
        <React.Fragment key={index}>
          <div className={styles.detailRow}>
            <div className={styles.labelValue}>
              <span className={styles.label}>{detail.label}</span>
              <div className={styles.valueRow}>
                <div className={styles.valueRowTop}>
                  {editingField === detail.label ? (
                    <div className={styles.formNameGroup}>
                    <div className={styles.valueRowFormGroup}>
                    <label>Nombre*</label>
                    <input
                      type="text"
                      value={editedValue}
                      onChange={handleInputChange}
                      className={styles.editInput}
                    />
                    </div>
                    <div className={styles.valueRowFormGroup}>
                    <label>Apellido*</label>
                    <input
                      type="text"
                      value={editedValue}
                      onChange={handleInputChange}
                      className={styles.editInput}
                    />
                    </div>
                    </div>
                  ) : (
                    <span className={styles.value}>{detail.value}</span>
                  )}
                  {detail.verified && !editingField && (
                    <span className={styles.verifiedBadge}>Verified</span>
                  )}
                </div>
                <div className={styles.valueRowBottom}>
                  {detail.verified && !editingField && (
                    <p className={styles.emailNote}>
                      This email address is used for login and receiving all notifications
                    </p>
                  )}
                </div>
              </div>
            </div>
            {editingField === detail.label ? (
              <div className={styles.editActions}>
                
                <button 
                  className={`${styles.actionButton} ${styles.cancelButton}`}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button 
                className={styles.actionButton}
                onClick={() => handleEditClick(detail.label, detail.value)}
                disabled={detail.action === "Info" || detail.action === "View"}
              >
                {detail.action}
              </button>
            )}
          </div>
          <div className={styles.saveButtonWrapper}>
            <button 
                    className={`${styles.actionButton} ${styles.saveButton}`}
                    onClick={handleSave}
                  >
                    Save
            </button>
          </div>
         
          {index < details.length - 1 && <div className={styles.separator} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PersonalDetails;