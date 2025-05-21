import React from "react";
import styles from "../../../pages/footerBlockPages/lifeAtLocalSecret/LifeAtLocalSecrets.module.css";

function WorkPhilosophySection({
  imageUrl,
  title,
  description,
  imageLeft,
  containerClassName,
}) {
  if (imageLeft) {
    return (
      <section className={containerClassName}>
        <div className={imageLeft ? styles.projectsRow : styles.activitiesRow}>
          <div
            className={
              imageLeft ? styles.imageColumn : styles.imageColumnActivity
            }
          >
            <img
              src={imageUrl}
              alt={title}
              className={imageLeft ? styles.projectImage : styles.activityImage}
            />
          </div>
          <div
            className={
              imageLeft ? styles.textColumn : styles.textColumnActivity
            }
          >
            <div
              className={
                imageLeft ? styles.projectContent : styles.activityContent
              }
            >
              <h2
                className={
                  imageLeft ? styles.sectionTitle : styles.activityTitle
                }
              >
                {title}
              </h2>
              <p
                className={
                  imageLeft
                    ? styles.sectionDescription
                    : styles.activityDescription
                }
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className={containerClassName}>
        <div className={styles.travelersRow}>
          <div className={styles.textColumnWide}>
            <div className={styles.travelersContent}>
              <h2 className={styles.travelersTitle}>{title}</h2>
              <p className={styles.travelersDescription}>{description}</p>
            </div>
          </div>
          <div className={styles.imageColumnSmall}>
            <img src={imageUrl} alt={title} className={styles.travelersImage} />
          </div>
        </div>
      </section>
    );
  }
}

export default WorkPhilosophySection;
