import React from "react";
import styles from "./BlogCard.module.css";

const BlogCard = ({ title, description, image, tag }) => {
  return (
    <article className={styles.blogCard}>
      <img src={image} alt="" className={styles.blogImage} />
      <div className={styles.blogContent}>
        <span className={styles.blogTag}>{tag}</span>
        <h3 className={styles.blogTitle}>{title}</h3>
        <p className={styles.blogDescription}>{description}</p>
      </div>
    </article>
  );
};

export default BlogCard;
