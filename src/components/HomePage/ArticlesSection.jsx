import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ArticlesSection.module.css";
import { PlaceHolderImg2 } from "../common/Images";
import { useTranslation } from "react-i18next";

const ArticlesSection = ({ posts, seeMore = true, handleNavActions }) => {
  const { t } = useTranslation("Common");

  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default number of slides to show
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
      return post.yoast_head_json.description;
    }
    if (post.excerpt?.rendered) {
      return post.excerpt.rendered.replace(/<[^>]*>?/gm, '').trim();
    }
    return '';
  };

  // Function to get the primary category/tag
  const getPrimaryTag = (post) => {
    if (post.yoast_head_json?.author) {
      return post.yoast_head_json.author;
    }
    return post.categories?.length ? 'Destino' : 'Local secret';
  };

  return (
    <section className={styles.articlesSection}>
      <div className="page-center">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Inspiración para tus próximos viajes
          </h2>
          {seeMore && (
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
                <div className={styles.articleTag}>
                  {getPrimaryTag(post)}
                </div>
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