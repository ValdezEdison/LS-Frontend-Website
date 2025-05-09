"use client";
import React from "react";
import styles from "../../pages/BlogDetailPage/BlogDetail.module.css";
import { PlaceHolderImg2 } from "../common/Images";

function ArticleContent({ currentPost, tags }) {


  const getFeaturedImage = (currentPost) => {
    console.log(currentPost, 'currentPost');
    if (currentPost.yoast_head_json?.og_image?.[0]?.url) {
      return currentPost.yoast_head_json.og_image[0].url;
    }
    return '';
  };
  return (
    <main className={styles.articleContainer}>
      <h1 className={styles.articleTitle}>
        {currentPost?.yoast_head_json?.title}
      </h1>

      <div className={styles.authorInfo}>
        <div className={styles.authorProfile}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c9d628dd2c11b2deab41954d483662f44788b680?placeholderIfAbsent=true"
            alt="Author avatar"
            className={styles.authorAvatar}
          />
          <div className={styles.authorDetails}>
            <p className={styles.authorName}>Pablo Pérez</p>
            <p className={styles.publicationInfo}>
              Publicado en Localsecrets.com · 3 minutos · 4 Junio, 2024
            </p>
          </div>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/8506b23d947127f99aee39846e8ed855ecc557b4?placeholderIfAbsent=true"
          alt="Share icon"
          className={styles.shareIcon}
        />
      </div>

      <hr className={styles.articleDivider} />

      <article>
        <img
          src={getFeaturedImage(currentPost) || PlaceHolderImg2}
          alt="Amsterdam canals"
          className={styles.featuredImage}
        />

        <div
          className={styles.articleContent}
          dangerouslySetInnerHTML={{ __html: currentPost.content.rendered }}
        />
     


        <div className={styles.tagContainer}>
          {currentPost.tags?.length > 0 && currentPost.tags.map((tag) => {
            const matchingTag = tags.find((t) => t.id === tag);
            return matchingTag ? (
              <a key={tag} className={styles.tagCuriosidades}>
                {matchingTag.name}
              </a>
            ) : null;
          })}
          {/* <a href="#" className={styles.tagCuriosidades}>
            Curiosidades
          </a>
          <a href="#" className={styles.tagDestino}>
            Destino
          </a> */}
        </div>
      </article>
    </main>
  );
}

export default ArticleContent;
