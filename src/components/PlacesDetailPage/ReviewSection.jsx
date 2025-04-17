import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ReviewSection.module.css";
import { Star, StarFill } from "../common/Images"
import { startsWith } from "lodash";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ReviewSection = ({ handleClickSeeAllComments, handleClickAddComment, handleClickEditComment, handleClickDeleteComment, comments, placeDetails }) => {

  const { isAuthenticated, user } = useSelector((state) => state.auth)

  const { t } = useTranslation("DetailsPage");

  const sliderSettings = {
    // dots: true,
    infinite: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768, // Mobile
        settings: { slidesToShow: 1 }
      },
    ],
  };

  

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.starFilled : styles.starEmpty}>
          {i <= rating ? <img src={StarFill} alt="filled star" /> : <img src={Star} alt="empty star" />}
        </span>
      );
    }
    return stars;
  };

  return (
    <section className={styles.reviewSection}>
      <div className={styles.reviewHeader}>
        <div>
          <h2 className={styles.reviewTitle}>{t('reviews.title')}</h2>
          <div className={styles.ratingBlock}>
            <span className={styles.ratingScore}>{placeDetails?.rating}</span>
            <div className={styles.stars}>
              {renderStars(placeDetails?.rating)}
            </div>
            <span className={styles.reviewCount}>{t('reviews.reviewsCount', { count: comments?.length })}</span>
          </div>
        </div>
        <button className={styles.addReviewButton} onClick={handleClickAddComment}>{t('reviews.addReview')}</button>
      </div>
      <div className={styles.tagContainer}>
        {placeDetails?.tags?.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag.title}
          </span>
        ))}
      </div>
      <div className={styles.reviewWrapper}>
        <Slider {...sliderSettings}>
          {comments?.map((comment, index) => (
            <div className={styles.reviewCardWrapper}>
              <div key={comment.id || index} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewHeaderLeft}>
                  <img
                    src={comment.user?.profile_picture?.thumbnail || "default-avatar.png"}
                    alt="User avatar"
                    className={styles.avatar}
                  />
                  <div className={styles.reviewerNameDetails}>
                    <h3 className={styles.reviewerName}>{comment.user?.username}</h3>
                    <span className={styles.reviewDate}>{new Date(comment.created_at).toLocaleDateString()}</span>
                  </div>
                  </div>
                  {comment.user?.username === user?.username &&
                  <div className={styles.reviewHeaderRight}>
                    <div className={styles.editIcon} onClick={() => handleClickEditComment(comment)}></div>
                    <div className={styles.deleteIcon} onClick={() => handleClickDeleteComment(comment.id)}></div>
                  </div>
                  }
                </div>
                <div className={styles.stars}>
                  {renderStars(comment?.rating)}
                </div>
                <p className={styles.reviewContent}>{comment.body}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {comments?.length > 4 && (


        <button className={styles.viewAllButton} onClick={handleClickSeeAllComments}>
           {t('reviews.seeAll')}
        </button>
      )}
    </section>
  );
};

export default ReviewSection;