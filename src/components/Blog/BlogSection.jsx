import React from "react";
import styles from "../../pages/Blog/BlogPage.module.css";

function BlogSection({
  title,
  imageSrc,
  chipText,
  postTitle,
  postDescription,
}) {
  return (
    <section className={styles.sectionWrapper}>
      <h2 className={styles.sectionHeading}>{title}</h2>
      <article className={styles.sectionArticle}>
        <img src={imageSrc} alt={postTitle} className={styles.sectionImage} />
        <div className={styles.chipContainer}>
          <div className={styles.chip}>
            <div className={styles.chipText}>{chipText}</div>
          </div>
        </div>
        <div className={styles.sectionArticleContent}>
          <h3 className={styles.articleTitle}>{postTitle}</h3>
          <p className={styles.articleDescription}>{postDescription}</p>
        </div>
      </article>
    </section>
  );
}

export default BlogSection;
