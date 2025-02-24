import React from "react";
import styles from "./ArticlesSection.module.css";

const articles = [
  {
    id: 1,
    title: "Imprescindibles para recorrer el País Vasco",
    excerpt:
      "Si tu próximo destino es el noreste de la Península estás en el lugar indicado, pirata. Te traemos una mini-guía con los imprescindibles para...",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/75c8659ba194c06dbcfd2d8504b3e1987974a90eeeff392e894c3ddbb4a94007?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    tag: "Destino",
  },
  {
    id: 2,
    title: "5 curiosidades que no sabías sobre Ámsterdam",
    excerpt:
      'Mal llamada la "Venecia del Norte", porque es una ciudad que brilla con luz propia y no una spin-off, Ámsterdam es una ciudad famosa por sus canales...',
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/320ab1374a7c716c36ed8a0e3e0d0640962d8d6640f4ac7167d08791ba7da4db?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    tag: "Destino",
  },
  {
    id: 3,
    title: "Los 10 mercados de navidad más bonitos de Europa",
    excerpt:
      "Mariah Carey ya ha cantado, diciembre y el Adviento han llegado, y se acerca la cena con tu cuñado. Para Navidad estamos todos preparados, pero...",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/4f9f81041e7c5d8a53884202318991c2ee54876c2455a0683f356b95a7f02f0d?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    tag: "Local secret",
  },
  {
    id: 4,
    title: "Los lugares más curiosos del mundo",
    excerpt:
      "Un observatorio que luce como R2-D2, una guardería en forma de gato o un árbol hecho con astas de ciervo. Estos son algunos de los lugares más...",
    image:
    "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/4f9f81041e7c5d8a53884202318991c2ee54876c2455a0683f356b95a7f02f0d?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    tag: "Destino",
  },
];

const ArticlesSection = () => {
  return (
    <section className={styles.articlesSection}>
      <div className="page-center">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Inspiración para tus próximos viajes
        </h2>
        <a href="#more-articles" className={styles.seeMoreLink}>
          Ver más
        </a>
      </div>
      <div className={styles.articlesList}>
        {articles.map((article) => (
          <article key={article.id} className={styles.articleCard}>
            <img
              src={article.image}
              alt={article.title}
              className={styles.articleImage}
            />
            <div className={styles.articleTag}>{article.tag}</div>
            <h3 className={styles.articleTitle}>{article.title}</h3>
            <p className={styles.articleExcerpt}>{article.excerpt}</p>
          </article>
        ))}
      </div>
      </div>
      
    </section>
  );
};

export default ArticlesSection;
