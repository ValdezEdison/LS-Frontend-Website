import React from 'react';
import styles from "../../../pages/footerBlockPages/helpCenter/HelpCenter.module.css";
import { useTranslation } from 'react-i18next';
import TopicCard from "./TopicCard";
import { Activity, Destinos, Fav, Itinerarios, Lugares, Misviajes, PlaceFilter, Preguntas, Ticket } from '../../common/Images';

const TopicsSection = () => {
    const { t } = useTranslation("HelpCenter");
    
    return (
      <section className={styles.topicsSection}>
        <div className={styles.topicsHeader}>
          <div className={styles.leftDivider} />
          <h2 className={styles.topicsTitle}>{t('helpCenter.topicsTitle')}</h2>
          <div className={styles.rightDivider} />
        </div>
        <div className={styles.topicsGrid}>
          <div className={styles.topicsCardContainer}>
            {['Itinerarios', 'Eventos', 'Actividades', 'Lugares', 'Preguntas', 'Destinos', 'Misviajes', 'Favoritos'].map((topic) => (
              <TopicCard
                key={topic}
                icon={
                  topic === 'Itinerarios' ? Itinerarios :
                  topic === 'Eventos' ? Ticket :
                  topic === 'Actividades' ? Activity :
                  topic === 'Lugares' ? Lugares :
                  topic === 'Preguntas' ? Preguntas :
                  topic === 'Destinos' ? Destinos :
                  topic === 'Misviajes' ? Misviajes :
                  Fav
                }
                title={topic}
                className={styles.cardItem}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default TopicsSection;