"use client";
import React, { useState } from "react";
import styles from "./CentroDeAyudaDesplegado.module.css";
import { Activity, Itinerarios, Ticket } from "./common/Images";

// Header component for the help center
const HelpCenterHeader = () => {
  return (
    <header className={styles.headerSection}>
      <h1 className={styles.helpCenterTitle}>Centro de ayuda</h1>
    </header>
  );
};

// Search section with background image
const SearchSection = () => {
  return (
    <section className={styles.searchSection}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/ea6293f033f08032d2882d828aba7d446ee18c7c?placeholderIfAbsent=true"
        alt="Background"
        className={styles.backgroundImage}
      />
      <h2 className={styles.searchTitle}>¿Cómo podemos ayudarte?</h2>
      <div className={styles.searchBar}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/62b8e5f360d5a22bb96f10410d97dc0772f7cbec?placeholderIfAbsent=true"
          alt="Search icon"
          className={styles.searchIcon}
        />
        <input
          type="text"
          placeholder="Busca por palabras clave"
          className={styles.searchPlaceholder}
        />
      </div>
    </section>
  );
};

// Topic card component
const TopicCard = ({ icon, title, className }) => {
  // Map title to the corresponding text class name
  const getTextClassName = (title) => {
    const titleMap = {
      Itinerarios: "itineraryText",
      Eventos: "eventsText",
      Actividades: "activitiesText",
      Lugares: "placesText",
      "Preguntas frecuentes": "faqCardText",
      Destinos: "destinationsText",
      "Mis viajes": "myTripsText",
      Favoritos: "favoritesText",
    };
    return styles[titleMap[title]];
  };

  // Map icon to the corresponding icon class name
  const getIconClassName = (title) => {
    const iconMap = {
       Itinerarios: {Itinerarios},
       Eventos: {Ticket},
       Actividades:{Activity},
      Lugares:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/fd79b17b58ea0b1ed50f819983f98dee981a0a1e?placeholderIfAbsent=true",
      "Preguntas frecuentes":
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/8d16a9e91c9a292c65ff211254f76d783b60ea39?placeholderIfAbsent=true",
      Destinos:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/07860fa5891a44ec099153108e39f5b25020c2f5?placeholderIfAbsent=true",
      "Mis viajes":
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/106898fed6603c063eeb4457a4b8146d86a4e2dd?placeholderIfAbsent=true",
      Favoritos: { className: styles.heartIcon, content: null },
    };
    return iconMap[title];
  };

  const iconElement =
    typeof icon === "string" ? (
      <img src={icon} alt={title} className={styles.cardIcon} />
    ) : (
      <div className={icon.className}>{icon.content}</div>
    );

  return (
    <article className={className}>
      {iconElement}
      <h3 className={getTextClassName(title)}>{title}</h3>
    </article>
  );
};

// Topics section with all category cards
const TopicsSection = () => {
  return (
    <section className={styles.topicsSection}>
      <div className={styles.topicsHeader}>
        <div className={styles.leftDivider} />
        <h2 className={styles.topicsTitle}>Temas para los viajeros</h2>
        <div className={styles.rightDivider} />
      </div>
      <div className={styles.topicsGrid}>
        <div className={styles.topicsCardContainer}>
          <TopicCard
            icon={{
              className: styles.iconWrapper,
              content: <div className={styles.vectorIcon} />,
            }}
            title="Itinerarios"
            className={styles.itineraryCard}
          />
          <TopicCard
            icon={{ className: styles.ticketIcon, content: null }}
            title="Eventos"
            className={styles.eventsCard}
          />
          <TopicCard
            icon="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/61ad17e2b1c12c15c35aa3e6dad9a813d2a2074c?placeholderIfAbsent=true"
            title="Actividades"
            className={styles.activitiesCard}
          />
          <TopicCard
            icon="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/fd79b17b58ea0b1ed50f819983f98dee981a0a1e?placeholderIfAbsent=true"
            title="Lugares"
            className={styles.placesCard}
          />
          <TopicCard
            icon="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/8d16a9e91c9a292c65ff211254f76d783b60ea39?placeholderIfAbsent=true"
            title="Preguntas frecuentes"
            className={styles.faqCard}
          />
          <TopicCard
            icon="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/07860fa5891a44ec099153108e39f5b25020c2f5?placeholderIfAbsent=true"
            title="Destinos"
            className={styles.destinationsCard}
          />
          <TopicCard
            icon="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/106898fed6603c063eeb4457a4b8146d86a4e2dd?placeholderIfAbsent=true"
            title="Mis viajes"
            className={styles.myTripsCard}
          />
          <TopicCard
            icon={{ className: styles.heartIcon, content: null }}
            title="Favoritos"
            className={styles.favoritesCard}
          />
        </div>
      </div>
    </section>
  );
};

// FAQ item component
const FAQItem = ({
  question,
  answer,
  imgSrc,
  className,
  answerClassName,
  isOpen,
  toggleOpen,
}) => {
  // Map question to the corresponding question class name
  const getQuestionClassName = (index) => {
    const questionMap = {
      0: "faqQuestion",
      1: "itineraryQuestion",
      2: "citiesQuestion",
      3: "favoritesQuestion",
      4: "officeQuestion",
    };
    return styles[questionMap[index]];
  };

  // Map toggle icon to the corresponding icon class name
  const getToggleIconClassName = (index) => {
    const iconMap = {
      0: "toggleIcon",
      1: "toggleIcon2",
      2: "toggleIcon3",
      3: "toggleIcon4",
      4: "toggleIcon5",
    };
    return styles[iconMap[index]];
  };

  // Map divider to the corresponding divider class name
  const getDividerClassName = (index) => {
    const dividerMap = {
      0: "faqDivider",
      1: "faqDivider2",
      2: "faqDivider3",
      3: "faqDivider4",
      4: "faqDivider5",
    };
    return styles[dividerMap[index]];
  };

  // Extract index from className (e.g., "faqItem" -> 0, "faqItem2" -> 1)
  const index =
    className === styles.faqItem
      ? 0
      : parseInt(className.replace(styles.faqItem, "")) - 1;

  return (
    <article className={className}>
      <div
        className={
          index === 0
            ? styles.faqQuestionRow
            : styles[`faqQuestionRow${index + 1}`]
        }
      >
        <h3 className={getQuestionClassName(index)}>{question}</h3>
        <button onClick={toggleOpen}>
          <img
            src={imgSrc}
            alt={isOpen ? "Collapse" : "Expand"}
            className={getToggleIconClassName(index)}
          />
        </button>
      </div>
      <div className={getDividerClassName(index)} />
      {isOpen && answer && (
        <p className={answerClassName || styles.faqAnswer}>{answer}</p>
      )}
    </article>
  );
};

// FAQ section with all questions
const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  const faqItems = [
    {
      question: "¿Puedo sugerir una ciudad?",
      answer:
        "Claro, puedes sugerir un lugar o evento desde los ajustes de tu perfil. Atenderemos a tu solicitud lo antes posible y recibirás un email con nuestra respuesta.",
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/f4ae355e883ee10a8a3ebd8615e6cd21de334a33?placeholderIfAbsent=true",
      className: styles.faqItem,
      answerClassName: styles.faqAnswer,
    },
    {
      question: "¿Cómo puedo hacer un itinerario?",
      answer: "",
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/1bd1257aec7d94543ecaabd7c1196286e0a1246b?placeholderIfAbsent=true",
      className: styles.faqItem2,
      answerClassName: "",
    },
    {
      question: "¿Vais a publicar más ciudades?",
      answer: "",
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/a8352d93a8617c30df305db78dc50f2f34bbb9ba?placeholderIfAbsent=true",
      className: styles.faqItem3,
      answerClassName: "",
    },
    {
      question: "¿Puedo compartir mis favoritos?",
      answer: "",
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/26f3e3a9bfece32771c83bf6c7ab47aba6e7f177?placeholderIfAbsent=true",
      className: styles.faqItem4,
      answerClassName: "",
    },
    {
      question: "¿Cuál es la ubicación de las oficinas?",
      answer: "",
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/aa514361792df869be6beeb1c6e980b1fdeaf322?placeholderIfAbsent=true",
      className: styles.faqItem5,
      answerClassName: "",
    },
  ];

  return (
    <section className={styles.faqSection}>
      <div className={styles.sectionDivider} />
      <div className={styles.faqContainer}>
        <h2 className={styles.faqSectionTitle}>Preguntas frecuentes</h2>
        <div className={styles.faqList}>
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              imgSrc={item.imgSrc}
              className={item.className}
              answerClassName={item.answerClassName}
              isOpen={openFAQ === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact section with CTA button
const ContactSection = () => {
  return (
    <footer className={styles.contactWrapper}>
      <section className={styles.contactSection}>
        <div className={styles.contactContent}>
          <h2 className={styles.contactTitle}>Contacta con nosotros</h2>
          <p className={styles.contactDescription}>
            Para más información escribe tu correo o llama al teléfono de
            contacto, te responderemos con la mayor brevedad posible.
          </p>
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.contactButton}>Contacto</button>
        </div>
      </section>
    </footer>
  );
};

// Main component that combines all sections
function CentroDeAyudaDesplegado() {
  return (
    <main className={styles.helpCenterContainer}>
      <div className={styles.mainWrapper}>
        <div className={styles.contentContainer}>
          <div className={styles.mainWrapper}>
            <HelpCenterHeader />
            <SearchSection />
          </div>
        </div>
        <TopicsSection />
        <FAQSection />
      </div>
      <ContactSection />
    </main>
  );
}

export default CentroDeAyudaDesplegado;
