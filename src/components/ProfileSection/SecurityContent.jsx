import React from "react";
import styles from "./SecurityContent.module.css";

const SecurityContent = ({ 
  user, 
  securityData, 
  editingField, 
  onEdit, 
  onSave, 
  onCancel, 
  onChange 
}) => {
  const sections = [
    {
      id: "password",
      title: "Password",
      description: "Update your password to keep your account secure",
      action: "edit", // Only password is editable
      buttonText: "Edit",
      fields: [
        {
          label: "Current Password",
          name: "currentPassword",
          type: "password",
          placeholder: "Enter current password"
        },
        {
          label: "New Password",
          name: "newPassword",
          type: "password",
          placeholder: "Enter new password"
        },
        {
          label: "Confirm New Password",
          name: "confirmPassword",
          type: "password",
          placeholder: "Confirm new password"
        }
      ]
    },
    {
      id: "twoFactor",
      title: "Two-Factor Authentication",
      description: "This feature is currently unavailable",
      action: "none", // Disabled
      buttonText: "Unavailable",
      fields: []
    },
    {
      id: "sessions",
      title: "Active Sessions",
      description: "This feature is currently unavailable",
      action: "none", // Disabled
      buttonText: "Unavailable",
      fields: []
    },
    {
      id: "delete",
      title: "Delete Account",
      description: "Permanently delete your account",
      action: "edit", // Only delete is available
      buttonText: "Delete Account",
      fields: [
        {
          label: "I understand this action is irreversible",
          name: "accountDeletionConfirmed",
          type: "checkbox",
          checked: securityData.accountDeletionConfirmed
        }
      ]
    }
  ];

  return (
    <main className={styles.securityContent}>
      <h1 className={styles.title}>Security</h1>
      <p className={styles.description}>
        Change your security settings or delete your account
      </p>
      <hr className={styles.divider} />

      {sections.map((section, index) => (
        <React.Fragment key={section.id}>
          <section className={styles.securitySection}>
            <div className={styles.sectionContent}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <p className={styles.sectionDescription}>{section.description}</p>
              
             
            </div>

            
            
            {section.action === "none" ? null : editingField === section.id ? (
              <div className={styles.editActions}>
                <button 
                  className={`${styles.actionButton} ${styles.cancelButton}`}
                  onClick={onCancel}
                >
                  Cancel
                </button>
               
              </div>
            ) : (
              <button 
                className={styles.actionButton}
                onClick={() => onEdit(section.id)}
                disabled={section.action !== "edit"}
              >
                {section.buttonText}
              </button>
            )}
          </section>
          <div className="editFormWrapper">
            {editingField === section.id && section.fields.length > 0 && (
              <>
                <div className={styles.editFields}>
                  {section.fields.map(field => (
                    <div key={field.name} className={styles.valueRowFormGroup}>
                      {field.type === "checkbox" ? (
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            name={field.name}
                            checked={securityData[field.name]}
                            onChange={(e) => onChange(field.name, e.target.checked)}
                            className={styles.checkboxInput}
                          />
                          {field.label}
                        </label>
                      ) : (
                        <>
                          <label className={styles.fieldLabel}>{field.label}</label>
                          <input
                            type={field.type}
                            name={field.name}
                            value={securityData[field.name] || ""}
                            onChange={(e) => onChange(field.name, e.target.value)}
                            placeholder={field.placeholder}
                            className={styles.editInput}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className={styles.saveButtonWrapper}>
                    <button 
                  className={styles.saveButton}
                  onClick={() => onSave(section.id)}
                >
                  Save
                </button>
                  </div>
              </>
              )}
            </div>
          {index < sections.length - 1 && <hr className={styles.divider} />}
        </React.Fragment>
      ))}
    </main>
  );
};

export default SecurityContent;