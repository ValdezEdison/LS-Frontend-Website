"use client";
import React, { useState } from "react";
import styles from "../../../pages/footerBlockPages/lifeAtLocalSecret/LifeAtLocalSecrets.module.css";
import { useTranslation } from "react-i18next";
function FaqSection() {

  const { t } = useTranslation("LifeAtLocalSecrets");

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const faqItems = [
    {
      question: "¿Que beneficios ofrece Local Secrets a empleados?",
      answer:
        "Local Secrets ofrece diversos beneficios como flexibilidad laboral, seguro médico, fruta en la oficina, y la posibilidad de comprar días adicionales de vacaciones.",
    },
    {
      question: "¿Hay posiciones disponibles en remoto?",
      answer:
        "Sí, Local Secrets ofrece posiciones remotas dependiendo del rol y las necesidades del proyecto.",
    },
    {
      question: "¿Ofrecéis programas de prácticas?",
      answer:
        "Sí, ofrecemos programas de prácticas para estudiantes y recién graduados en diferentes departamentos.",
    },
    {
      question: "¿Hay oportunidad de crecimiento en la empresa?",
      answer:
        "Absolutamente. Fomentamos el desarrollo profesional y ofrecemos oportunidades de crecimiento dentro de la empresa.",
    },
    {
      question: "¿Cuál es la ubicación de las oficinas?",
      answer:
        "Nuestras oficinas principales están ubicadas en el centro de la ciudad, con fácil acceso al transporte público.",
    },
  ];

  // Map class names for different FAQ items
  const getRowClassName = (index) => {
    const classMap = {
      0: styles.faqQuestionRow,
      1: styles.faqQuestionRow2,
      2: styles.faqQuestionRow3,
      3: styles.faqQuestionRow4,
      4: styles.faqQuestionRow5,
    };
    return classMap[index] || styles.faqQuestionRow;
  };

  const getQuestionClassName = (index) => {
    const classMap = {
      0: styles.faqQuestion,
      1: styles.faqQuestion2,
      2: styles.faqQuestion3,
      3: styles.faqQuestion4,
      4: styles.faqQuestion5,
    };
    return classMap[index] || styles.faqQuestion;
  };

  const getIconClassName = (index) => {
    const classMap = {
      0: styles.faqToggleIcon,
      1: styles.faqToggleIcon2,
      2: styles.faqToggleIcon3,
      3: styles.faqToggleIcon4,
      4: styles.faqToggleIcon5,
    };
    return classMap[index] || styles.faqToggleIcon;
  };

  const getDividerClassName = (index) => {
    const classMap = {
      0: styles.faqDivider,
      1: styles.faqDivider2,
      2: styles.faqDivider3,
      3: styles.faqDivider4,
      4: styles.faqDivider5,
    };
    return classMap[index] || styles.faqDivider;
  };

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.faqTitle}>{t('faq.title')}</h2>
      <div className={styles.faqContainer}>
        {[0, 1, 2, 3, 4].map((index) => (
          <React.Fragment key={index}>
            <div className={getRowClassName(index)}>
              <h3 className={getQuestionClassName(index)}>
                {t(`faq.items.${index}.question`)}
              </h3>
              <button
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaq === index}
                aria-controls={`faq-answer-${index}`}
              >
                <img
                  src={
                    openFaq === index
                      ? "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/e8ac9d2e06e188ef6453c2b97a9661979d28a413?placeholderIfAbsent=true"
                      : index === 0
                        ? "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/2bcff13c65932cee7cac3408bf827e13127f4a97?placeholderIfAbsent=true"
                        : index === 1
                          ? "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c1f9d2aaf3813fbdd65aca270c0ad92458e251d9?placeholderIfAbsent=true"
                          : index === 2
                            ? "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/212295c414ffb46216909d47d11a162f2bf22a8d?placeholderIfAbsent=true"
                            : "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/948ce91a9c3c4cb050838a840974e4d233d36775?placeholderIfAbsent=true"
                  }
                  alt={openFaq === index ? t('faq.close') : t('faq.open')}
                  className={getIconClassName(index)}
                />
              </button>
            </div>
            {openFaq === index && (
              <div id={`faq-answer-${index}`} className={styles.faqAnswer}>
                {t(`faq.items.${index}.answer`)}
              </div>
            )}
            <div className={getDividerClassName(index)} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default FaqSection;
