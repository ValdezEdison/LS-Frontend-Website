import React from "react";
import styles from "./TopicsSection.module.css";
import TopicCard from "./TopicCard";
import FAQSection from "./FAQSection";

const TopicsSection = () => {
  const topics = [
    { id: 1, icon: "vectorIcon", title: "Itinerarios", isVector: true },
    { id: 2, icon: "ticketIcon", title: "Eventos" },
    {
      id: 3,
      icon: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/4e287afcd8c2d445c0070d815569ebe2cb78d91c?placeholderIfAbsent=true",
      title: "Actividades",
    },
    {
      id: 4,
      icon: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/fd79b17b58ea0b1ed50f819983f98dee981a0a1e?placeholderIfAbsent=true",
      title: "Lugares",
    },
    {
      id: 5,
      icon: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/8d16a9e91c9a292c65ff211254f76d783b60ea39?placeholderIfAbsent=true",
      title: "Preguntas frecuentes",
    },
    {
      id: 6,
      icon: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/07860fa5891a44ec099153108e39f5b25020c2f5?placeholderIfAbsent=true",
      title: "Destinos",
    },
    {
      id: 7,
      icon: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/106898fed6603c063eeb4457a4b8146d86a4e2dd?placeholderIfAbsent=true",
      title: "Mis viajes",
    },
    { id: 8, icon: "heartIcon", title: "Favoritos" },
  ];

  return (
    <div className={styles.topicsSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.leftDivider} />
        <div className={styles.sectionTitle}>Temas para los viajeros</div>
        <div className={styles.rightDivider} />
      </div>
      <div className={styles.topicsContainer}>
        <div className={styles.topicsGrid}>
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              icon={topic.icon}
              title={topic.title}
              isVector={topic.isVector}
            />
          ))}
        </div>
        <div className={styles.dividerContainer}>
          <div className={styles.fullDivider} />
          <FAQSection />
        </div>
      </div>
    </div>
  );
};

export default TopicsSection;
