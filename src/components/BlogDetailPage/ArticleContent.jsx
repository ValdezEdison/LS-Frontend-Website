"use client";
import React from "react";
import styles from "../../pages/BlogDetailPage/BlogDetail.module.css";
import { PlaceHolderImg2 } from "../common/Images";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ArticleContent({ currentPost, tags, loading, setState }) {


  const getFeaturedImage = (currentPost) => {
    
    if (currentPost?._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return currentPost._embedded['wp:featuredmedia'][0].source_url;
    }
    return '';
  };


  const  updateState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
 
  };

  if (loading) {
    return (
      <main className={styles.articleContainer}>
        <Skeleton height={40} width="80%" style={{ marginBottom: '20px' }} />
        
        <div className={styles.authorInfo}>
          <div className={styles.authorProfile}>
            <Skeleton circle height={48} width={48} />
            <div className={styles.authorDetails}>
              <Skeleton width={120} height={20} style={{ marginBottom: '5px' }} />
              <Skeleton width={200} height={16} />
            </div>
          </div>
          <Skeleton width={24} height={24} />
        </div>
        
        <hr className={styles.articleDivider} />
        
        <article>
          <Skeleton height={400} style={{ marginBottom: '30px' }} />
          
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <Skeleton count={Math.floor(Math.random() * 3) + 2} />
            </div>
          ))}
          
          <div className={styles.tagContainer}>
            <Skeleton width={80} height={30} style={{ marginRight: '10px', borderRadius: '20px' }} />
            <Skeleton width={80} height={30} style={{ borderRadius: '20px' }} />
          </div>
        </article>
      </main>
    );
  }


  return (
    <main className={styles.articleContainer}>
      <h1 className={styles.articleTitle}>
        {currentPost?.title?.rendered}
      </h1>

      <div className={styles.authorInfo}>
        <div className={styles.authorProfile}>
          <img
            src={currentPost?._embedded?.author[0]?.avatar_urls?.['96']}
            alt="Author avatar"
            className={styles.authorAvatar}
          />
          <div className={styles.authorDetails}>
            <p className={styles.authorName}>{currentPost?._embedded?.author[0]?.name}</p>
            <p className={styles.publicationInfo}>
              Publicado en {currentPost?.yoast_head_json?.site_name} · 3 minutos · 4 Junio, 2024
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
          dangerouslySetInnerHTML={{ __html: currentPost?.content.rendered }}
        />
     


        <div className={styles.tagContainer}>
          {currentPost?.tags?.length > 0 && currentPost.tags.map((tag) => {
            const matchingTag = tags.find((t) => t.id === tag);
            return matchingTag ? (
              <a key={tag} className={styles.tagCuriosidades} onClick={(e) => {updateState( "tag", matchingTag.id)
                updateState( "tagName", matchingTag.name)
              }}>
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
