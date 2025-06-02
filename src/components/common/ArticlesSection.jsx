import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ArticlesSection.module.css";
import { PlaceHolderImg2 } from "./Images";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { update } from "lodash";

const ArticlesSection = ({ title, posts, seeMore = true, handleNavActions, tags, layout = 'carousel', setState }) => {
  const { t } = useTranslation("Common");
  const location = useLocation();
  const isBlogPage = location.pathname === "/blog-list";

  // Slider settings for carousel layout
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    centerMode: false,
    slidesToScroll: 1,
    arrows: posts.length > 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          arrows: posts.length > 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: posts.length > 1,
        },
      },
    ],
  };

  // Function to get the featured image from yoast metadata
  const getFeaturedImage = (post) => {
    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return '';
  };

  // Function to get the excerpt from yoast metadata
  const getExcerpt = (post) => {
    if (post.excerpt?.rendered) {
      return post.excerpt.rendered.replace(/<[^>]*>?/gm, '').trim();
    }
    return '';
  };

  // Function to get the primary category/tag
  const getPrimaryTag = (postTag) => {
    return postTag
      .map(tagId => tags.find(tag => tag.id === tagId))
      .filter(Boolean)
      .map(tag => tag.name);
  };

 const  updateState = (e, key, value) => {
    e.stopPropagation();
    setState((prev) => ({ ...prev, [key]: value }));
 
  };

  const handleTagClick = (e, tag) => {
    e.stopPropagation();
  
    setState((prev) => ({
      ...prev,
      tag: tag.id,
      tagName: tag.name,
      category: null,
      categoryName: null
    }));
  };

  // Render individual post card
  const renderPostCard = (post) => {
    return (
      <div
        key={post.id}
        className={styles.articleCard}
        onClick={(e) => handleNavActions(e, post.id, "viewDetail")}
      >
        <img
          src={getFeaturedImage(post) || PlaceHolderImg2}
          alt={post.title.rendered}
          className={styles.articleImage}
          onError={(e) => {
            e.target.src = PlaceHolderImg2;
          }}
        />
        {post.tags?.length > 0 && (
          <div className={styles.tagsContainer}>
            {post.tags.map(tagId => {
              const tag = tags.find(t => t.id === tagId);
              return tag ? (
                <span key={tagId} className={styles.articleTag} onClick={(e) => handleTagClick(e, tag)}>
                  {tag.name}
                </span>
              ) : null;
            })}
          </div>
        )}
        <h3 className={styles.articleTitle}>{post.title.rendered}</h3>
        <p className={styles.articleExcerpt}>{getExcerpt(post)}</p>
      </div>
    );
  };

  return (
    <section className={`${styles.articlesSection} ${isBlogPage ? styles.blogArticlesSection : ''}`}>
      <div className="page-center">
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.sectionTitle} ${isBlogPage ? styles.blogTitle : ''}`}>
            {title}
          </h2>
          {seeMore && posts.length > (layout === 'grid' ? 8 : 4) && (
            <div
              className={styles.seeMoreLink}
              onClick={(e) => handleNavActions(e, null, "viewList")}
            >
              {t('seeMore')}
            </div>
          )}
        </div>

        {posts.length > 0 ? (
          layout === 'grid' ? (
            // Grid layout - 4 items per row
            <div className={styles.articlesGrid}>
              {posts.map(renderPostCard)}
            </div>
          ) : (
            // Carousel layout
            <Slider {...settings} className={styles.articlesSlider}>
              {posts.map(renderPostCard)}
            </Slider>
          )
        ) : (
          <p>{t('noResults')}</p>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;