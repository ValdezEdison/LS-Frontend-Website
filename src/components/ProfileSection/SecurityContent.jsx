import React from "react";
import styles from "./SecurityContent.module.css";
import { useTranslation } from "react-i18next";

const SecurityContent = ({ 
  user, 
  securityData, 
  editingField, 
  onEdit, 
  onSave, 
  onCancel, 
  onChange 
}) => {
  const { t } = useTranslation('ProfileSection');

  const sections = [
    {
      id: "password",
      title: t('security.sections.password.title'),
      description: t('security.sections.password.description'),
      action: "edit",
      buttonText: t('security.sections.password.buttonText'),
      fields: [
        {
          label: t('security.sections.password.fields.currentPassword.label'),
          name: "currentPassword",
          type: "password",
          placeholder: t('security.sections.password.fields.currentPassword.placeholder')
        },
        {
          label: t('security.sections.password.fields.newPassword.label'),
          name: "newPassword",
          type: "password",
          placeholder: t('security.sections.password.fields.newPassword.placeholder')
        },
        {
          label: t('security.sections.password.fields.confirmPassword.label'),
          name: "confirmPassword",
          type: "password",
          placeholder: t('security.sections.password.fields.confirmPassword.placeholder')
        }
      ]
    },
    {
      id: "twoFactor",
      title: t('security.sections.twoFactor.title'),
      description: t('security.sections.twoFactor.description'),
      action: "none",
      buttonText: t('security.sections.twoFactor.buttonText'),
      fields: []
    },
    {
      id: "sessions",
      title: t('security.sections.sessions.title'),
      description: t('security.sections.sessions.description'),
      action: "none",
      buttonText: t('security.sections.sessions.buttonText'),
      fields: []
    },
    {
      id: "delete",
      title: t('security.sections.delete.title'),
      description: t('security.sections.delete.description'),
      action: "edit",
      buttonText: t('security.sections.delete.buttonText'),
      fields: [
        {
          label: t('security.sections.delete.fields.accountDeletionConfirmed.label'),
          name: "accountDeletionConfirmed",
          type: "checkbox",
          checked: securityData.accountDeletionConfirmed
        }
      ]
    }
  ];

  return (
    <main className={styles.securityContent}>
      <h1 className={styles.title}>{t('security.title')}</h1>
      <p className={styles.description}>
        {t('security.description')}
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
                  {t('security.actions.cancel')}
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
                          <div className={styles.passwordInput}>
                            <div className={styles.showPassword }></div>
                            <input
                              type={field.type}
                              name={field.name}
                              value={securityData[field.name] || ""}
                              onChange={(e) => onChange(field.name, e.target.value)}
                              placeholder={field.placeholder}
                              className={styles.editInput}
                            />
                          </div>
                         
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
                    {t('security.actions.save')}
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