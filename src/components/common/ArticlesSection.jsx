import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ArticlesSection.module.css";
import { PlaceHolderImg2 } from "./Images";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const ArticlesSection = ({ title, posts, seeMore = true, handleNavActions, tags }) => {
  const { t } = useTranslation("Common");

  const location = useLocation();

  const isBlogPage = location.pathname === "/blog";

  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    // slidesToShow: Math.min(4, posts.length),
    slidesToShow: 4,
    centerMode:false,
    slidesToScroll: 1,
    arrows: posts.length > 4,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          // slidesToShow: Math.min(2, posts.length),
          slidesToShow: 2,
          arrows: posts.length > 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          // slidesToShow: Math.min(1, posts.length),
          slidesToShow:1,
          arrows: posts.length > 1,
        },
      },
    ],
  };

  // Function to get the featured image from yoast metadata
  const getFeaturedImage = (post) => {
    if (post.yoast_head_json?.og_image?.[0]?.url) {
      return post.yoast_head_json.og_image[0].url;
    }
    return '';
  };

  // Function to get the excerpt from yoast metadata
  const getExcerpt = (post) => {
    if (post.yoast_head_json?.description) {
      return post.yoast_head_json.description.replace(/<[^>]*>?/gm, '').trim();
    }
    if (post.excerpt?.rendered) {
      return post.excerpt.rendered.replace(/<[^>]*>?/gm, '').trim();
    }
    return '';
  };

  // Function to get the primary category/tag
  const getPrimaryTag = (postTag) => {


    return postTag
      .map(tagId => tags.find(tag => tag.id === tagId)) // Find matching tag objects
      .filter(Boolean) // Remove undefined (if a tag wasn't found)
      .map(tag => tag.name);

  };


  return (
    <section className={`${styles.articlesSection} ${isBlogPage ? styles.blogArticlesSection : ''}`}>
      <div className="page-center">
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.sectionTitle} ${isBlogPage ? styles.blogTitle : ''}`}>
            {title}
          </h2>
          {seeMore && posts.length > 4 && (
            <div
              className={styles.seeMoreLink}
              onClick={(e) => handleNavActions(e, null, "viewList")}
            >
              {t('seeMore')}
            </div>
          )}
        </div>

        {posts.length > 0 ? (
          <Slider {...settings} className={styles.articlesSlider}>
            {posts.map((post) => (
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
                      console.log(tag, 'tag');
                      return tag ? (
                        <span key={tagId} className={styles.articleTag}>
                          {tag.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}

                <h3 className={styles.articleTitle}>{post.yoast_head_json?.title || post.title.rendered}</h3>
                <p className={styles.articleExcerpt}>{getExcerpt(post)}</p>
              </div>
            ))}
          </Slider>
        ) : (
          <p>{t('noResults')}</p>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;