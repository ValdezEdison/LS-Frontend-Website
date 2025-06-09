import React from "react";
import styles from "./HeroSection.module.css"; // Ensure this import is working

function HeroSection({ title, description, heroImage, heroTextColor }) {
  // Better loading state handling
  if (!title || !heroImage) {
    return (
      <section className={styles.heroSection}>
        <div className={styles.skeletonLoader}></div>
      </section>
    );
  }

  return (
    <section className={styles.heroSection}>
      {/* The banner now contains the image and the title */}
      <div className={styles.banner} style={{ zIndex:-2}}>
        <img
         style={{ zIndex:-2}}
          src={heroImage.url}
          alt={heroImage.alt || "Hero banner"}
          loading="lazy"
          width={heroImage.width}
          height={heroImage.height}
          className={styles.bannerImage} // Use bannerImage for the image
        />
        {/* Title placed inside the banner, on top of the image */}
        <h1
          className={styles.bannerTitleText} // New class for the title over the banner
          style={heroTextColor ? { color: heroTextColor } : {}} // Apply text color here
        >
          {title}
        </h1>
      </div>

      {/* Description as text below the hero image/title */}
      {description && (
        <div className={styles.descriptionSection}> {/* New section for description */}
          <div
            className={styles.descriptionText} // New class for the description text
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}
    </section>
  );
}

export default HeroSection;