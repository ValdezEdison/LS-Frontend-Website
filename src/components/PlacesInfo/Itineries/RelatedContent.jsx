import React from "react";
import styles from "./RelatedContent.module.css";

const RelatedContent = () => {
  const relatedItems = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/4916cdf9cb17ddef1e4ad7dbaaf1c89024cc97611b134b14a23062d9123ae362?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
      title: "Las Artes y las Ciencias",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/f9acaf96f5ad9aaea5498a023804ae3686edc4aa7e51a8338af63bfb445bd6df?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
      title: "Praça do Comércio",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/8b26986555462676c202b43b45a9a9772bfd08cf881aab3118d4ee9c7b8985df?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
      title: "Gendarmenmarkt",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/505edea46418a6c61db45ce434fe208a3b2c89ef800ed90149a6a6dff1ffc69e?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
      title: "Ámsterdam",
    },
  ];

  return (
    <section className={styles.relatedContent}>
      <h2 className={styles.sectionTitle}>Otras personas también han visto</h2>
      <div className={styles.relatedItems}>
        {relatedItems.map((item, index) => (
          <div key={index} className={styles.relatedItem}>
            <img
              src={item.image}
              alt={item.title}
              className={styles.relatedImage}
            />
            <p className={styles.relatedTitle}>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedContent;
