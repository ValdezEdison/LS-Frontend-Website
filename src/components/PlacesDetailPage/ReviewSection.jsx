import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ReviewSection.module.css";
import { Star, StarFill } from "../common/Images"
import { startsWith } from "lodash";
import { useSelector } from "react-redux";

const ReviewSection = ({ handleClickSeeAllComments, handleClickAddComment, handleClickEditComment, handleClickDeleteComment, comments, placeDetails }) => {

  const { isAuthenticated, user } = useSelector((state) => state.auth)
console.log("user", user);
console.log(comments, "comments");
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

  // const reviews = [
  //   {
  //     "id": 347,
  //     "user": {
  //       "username": "robertosanesteban1@gmail.com",
  //       "profile_picture": {
  //         "original": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg",
  //         "thumbnail": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.128x128_q90.jpg",
  //         "midsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.720x720_q90.jpg",
  //         "fullsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.1080x1080_q90.jpg"
  //       }
  //     },
  //     "body": "La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada. La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada.La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada.La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada.La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada.La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada.La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada.La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada.La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada.",
  //     "rating": 5,
  //     "created_at": "2024-02-07T18:32:34.667290+01:00"
  //   },
  //   {
  //     "id": 347,
  //     "user": {
  //       "username": "robertosanesteban1@gmail.com",
  //       "profile_picture": {
  //         "original": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg",
  //         "thumbnail": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.128x128_q90.jpg",
  //         "midsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.720x720_q90.jpg",
  //         "fullsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.1080x1080_q90.jpg"
  //       }
  //     },
  //     "body": "La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada. ",
  //     "rating": 5,
  //     "created_at": "2024-02-07T18:32:34.667290+01:00"
  //   },
  //   {
  //     "id": 347,
  //     "user": {
  //       "username": "robertosanesteban1@gmail.com",
  //       "profile_picture": {
  //         "original": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg",
  //         "thumbnail": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.128x128_q90.jpg",
  //         "midsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.720x720_q90.jpg",
  //         "fullsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.1080x1080_q90.jpg"
  //       }
  //     },
  //     "body": "La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada. ",
  //     "rating": 5,
  //     "created_at": "2024-02-07T18:32:34.667290+01:00"
  //   },
  //   {
  //     "id": 347,
  //     "user": {
  //       "username": "robertosanesteban1@gmail.com",
  //       "profile_picture": {
  //         "original": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg",
  //         "thumbnail": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.128x128_q90.jpg",
  //         "midsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.720x720_q90.jpg",
  //         "fullsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.1080x1080_q90.jpg"
  //       }
  //     },
  //     "body": "La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada. ",
  //     "rating": 5,
  //     "created_at": "2024-02-07T18:32:34.667290+01:00"
  //   }, {
  //     "id": 347,
  //     "user": {
  //       "username": "robertosanesteban1@gmail.com",
  //       "profile_picture": {
  //         "original": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg",
  //         "thumbnail": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.128x128_q90.jpg",
  //         "midsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.720x720_q90.jpg",
  //         "fullsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.1080x1080_q90.jpg"
  //       }
  //     },
  //     "body": "La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada. ",
  //     "rating": 5,
  //     "created_at": "2024-02-07T18:32:34.667290+01:00"
  //   }, {
  //     "id": 347,
  //     "user": {
  //       "username": "robertosanesteban1@gmail.com",
  //       "profile_picture": {
  //         "original": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg",
  //         "thumbnail": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.128x128_q90.jpg",
  //         "midsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.720x720_q90.jpg",
  //         "fullsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.1080x1080_q90.jpg"
  //       }
  //     },
  //     "body": "La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada. ",
  //     "rating": 5,
  //     "created_at": "2024-02-07T18:32:34.667290+01:00"
  //   }, {
  //     "id": 347,
  //     "user": {
  //       "username": "robertosanesteban1@gmail.com",
  //       "profile_picture": {
  //         "original": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg",
  //         "thumbnail": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.128x128_q90.jpg",
  //         "midsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.720x720_q90.jpg",
  //         "fullsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.1080x1080_q90.jpg"
  //       }
  //     },
  //     "body": "La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada. ",
  //     "rating": 5,
  //     "created_at": "2024-02-07T18:32:34.667290+01:00"
  //   }, {
  //     "id": 347,
  //     "user": {
  //       "username": "robertosanesteban1@gmail.com",
  //       "profile_picture": {
  //         "original": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg",
  //         "thumbnail": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.128x128_q90.jpg",
  //         "midsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.720x720_q90.jpg",
  //         "fullsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.1080x1080_q90.jpg"
  //       }
  //     },
  //     "body": "La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada. ",
  //     "rating": 5,
  //     "created_at": "2024-02-07T18:32:34.667290+01:00"
  //   }, {
  //     "id": 347,
  //     "user": {
  //       "username": "robertosanesteban1@gmail.com",
  //       "profile_picture": {
  //         "original": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg",
  //         "thumbnail": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.128x128_q90.jpg",
  //         "midsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.720x720_q90.jpg",
  //         "fullsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.1080x1080_q90.jpg"
  //       }
  //     },
  //     "body": "La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada. ",
  //     "rating": 5,
  //     "created_at": "2024-02-07T18:32:34.667290+01:00"
  //   }, {
  //     "id": 347,
  //     "user": {
  //       "username": "robertosanesteban1@gmail.com",
  //       "profile_picture": {
  //         "original": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg",
  //         "thumbnail": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.128x128_q90.jpg",
  //         "midsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.720x720_q90.jpg",
  //         "fullsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.1080x1080_q90.jpg"
  //       }
  //     },
  //     "body": "La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada. ",
  //     "rating": 5,
  //     "created_at": "2024-02-07T18:32:34.667290+01:00"
  //   }, {
  //     "id": 347,
  //     "user": {
  //       "username": "robertosanesteban1@gmail.com",
  //       "profile_picture": {
  //         "original": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg",
  //         "thumbnail": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.128x128_q90.jpg",
  //         "midsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.720x720_q90.jpg",
  //         "fullsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.1080x1080_q90.jpg"
  //       }
  //     },
  //     "body": "La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada. ",
  //     "rating": 5,
  //     "created_at": "2024-02-07T18:32:34.667290+01:00"
  //   }, {
  //     "id": 347,
  //     "user": {
  //       "username": "robertosanesteban1@gmail.com",
  //       "profile_picture": {
  //         "original": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg",
  //         "thumbnail": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.128x128_q90.jpg",
  //         "midsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.720x720_q90.jpg",
  //         "fullsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.1080x1080_q90.jpg"
  //       }
  //     },
  //     "body": "La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada. ",
  //     "rating": 5,
  //     "created_at": "2024-02-07T18:32:34.667290+01:00"
  //   }, {
  //     "id": 347,
  //     "user": {
  //       "username": "robertosanesteban1@gmail.com",
  //       "profile_picture": {
  //         "original": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg",
  //         "thumbnail": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.128x128_q90.jpg",
  //         "midsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.720x720_q90.jpg",
  //         "fullsize": "https://localsecrets-staging.rudo.es/media/pfp/47327BEA-9E0F-4B04-AA26-B965EDA46869.jpg.1080x1080_q90.jpg"
  //       }
  //     },
  //     "body": "La Plaza de Santo Domingo es el sitio alrededor del cual gira la vida nocturna de la ciudad amurallada. ",
  //     "rating": 5,
  //     "created_at": "2024-02-07T18:32:34.667290+01:00"
  //   }
  // ];

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
          <h2 className={styles.reviewTitle}>Comentarios de los viajeros</h2>
          <div className={styles.ratingBlock}>
            <span className={styles.ratingScore}>{placeDetails?.rating}</span>
            <div className={styles.stars}>
              {renderStars(placeDetails?.rating)}
            </div>
            <span className={styles.reviewCount}>{comments?.length} reseñas</span>
          </div>
        </div>
        <button className={styles.addReviewButton} onClick={handleClickAddComment}>Añadir un comentario</button>
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
          Ver todos los comentarios
        </button>
      )}
    </section>
  );
};

export default ReviewSection;