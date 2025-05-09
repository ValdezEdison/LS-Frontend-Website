import React from "react";
import styles from "../../pages/Blog/BlogPage.module.css";

function BlogPostCard({
  imageSrc,
  chipText,
  chipType = "default",
  title,
  description,
}) {
  const getChipClass = () => {
    if (chipType === "secret") {
      return {
        container: styles.chipContainerSecret,
        chip: styles.chipSecret,
        layer: styles.chipTextSecret,
      };
    }
    return {
      container: styles.chipContainer,
      chip: styles.chip,
      layer: styles.chipText,
    };
  };

  const chipClasses = getChipClass();

  return (
    <article className={styles.articleCardSmall}>
      <img src={imageSrc} alt={title} className={styles.articleImageSmall} />
      <div className={chipClasses.container}>
        <div className={chipClasses.chip}>
          <div className={chipClasses.layer}>{chipText}</div>
        </div>
      </div>
      <div className={styles.articleContentSmall}>
        <h3 className={styles.articleTitle}>{title}</h3>
        <p className={styles.articleDescription}>{description}</p>
      </div>
    </article>
  );
}

export default BlogPostCard;
