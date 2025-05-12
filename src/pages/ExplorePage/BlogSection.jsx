import React from "react";
import BlogCard from "./BlogCard";
import styles from "./BlogSection.module.css";

const blogPosts = [
  {
    title: "Imprescindibles para recorrer el País Vasco",
    description:
      "Si tu próximo destino es el noreste de la Península estás en el lugar indicado, pirata. Te traemos una mini-guía con los imprescindibles para...",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/cd20990d34ee822458ea3e9a3e5a255b5668c80d?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    tag: "Destino",
  },
  {
    title: "5 curiosidades que no sabías sobre Ámsterdam",
    description:
      'Mal llamada la "Venecia del Norte", porque es una ciudad que brilla con luz propia y no una spin-off, Ámsterdam es una ciudad famosa por sus canales...',
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/18c0f504552b541d764c3344dfaf82afe82d9645?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    tag: "Destino",
  },
  {
    title: "Los 10 mercados de navidad más bonitos de Europa",
    description:
      "Mariah Carey ya ha cantado, diciembre y el Adviento han llegado, y se acerca la cena con tu cuñado. Para Navidad estamos todos preparados, pero...",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/84fca17662cbfff282805552376d8d40ea7ad4f9?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    tag: "Local secret",
  },
  {
    title: "Los lugares más curiosos del mundo",
    description:
      "Un observatorio que luce como R2-D2, una guardería en forma de gato o un árbol hecho con astas de ciervo. Estos son algunos de los lugares más...",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/e199095ecf9fd0b0afaaccfccc8d00a7208e2f76?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    tag: "Destino",
  },
];

const BlogSection = () => {
  return (
    <section className={styles.blogSection}>
      <div className={styles.blogHeader}>
        <h2 className={styles.blogTitle}>
          Inspiración para tus próximos viajes
        </h2>
        <a href="/blog-list" className={styles.viewMoreLink}>
          Ver más
        </a>
      </div>
      <div className={styles.blogGrid}>
        {blogPosts.map((post, index) => (
          <BlogCard
            key={index}
            title={post.title}
            description={post.description}
            image={post.image}
            tag={post.tag}
          />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
