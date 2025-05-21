import React from "react";
import styles from "./FAQSection.module.css";
import FAQItem from "./FAQItem";

const FAQSection = () => {
  const faqItems = [
    {
      id: 1,
      question: "¿Puedo sugerir una ciudad?",
      expandIcon:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c7cd266b3805597181b3bafd6444be20ea4fa496?placeholderIfAbsent=true",
    },
    {
      id: 2,
      question: "¿Cómo puedo hacer un itinerario?",
      expandIcon:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/dc1b99f9573d745f0bb02a63148117d725bf9193?placeholderIfAbsent=true",
    },
    {
      id: 3,
      question: "¿Vais a publicar más ciudades?",
      expandIcon:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/ab685018dc342c1da2d6eed949bb4b475d54635b?placeholderIfAbsent=true",
    },
    {
      id: 4,
      question: "¿Puedo compartir mis favoritos?",
      expandIcon:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/22b35536f97f72c4a900487e2d81e7594500841e?placeholderIfAbsent=true",
    },
    {
      id: 5,
      question: "¿Cuál es la ubicación de las oficinas?",
      expandIcon:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/0d5053d4f52fd4c952897c5f7b5c5ca1bd031cbe?placeholderIfAbsent=true",
    },
  ];

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqTitle}>Preguntas frecuentes</div>
      <div className={styles.faqList}>
        {faqItems.map((item) => (
          <FAQItem
            key={item.id}
            question={item.question}
            expandIcon={item.expandIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
