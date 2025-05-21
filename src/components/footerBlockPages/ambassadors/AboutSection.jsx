import React from "react";
import styles from "./AboutSection.module.css";
import { useTranslation } from "react-i18next";

function AboutSection() {

  const { t } = useTranslation("Ambassadors");
  return (
    <section className={styles.aboutSection}>
      <article className={styles.content}>
        {[0, 1, 2, 3].map((index) => (
          <p key={index}>{t(`about.paragraphs.${index}`)}</p>
        ))}
      </article>
    </section>
  );
  // return (
  //   <section className={styles.aboutSection}>
  //     <article className={styles.content}>
  //       <p>
  //         Local Secrets es la marca española del grupo Local Secrets. Fundada en
  //         20XX, nuestra empresa es una de las más dinámicas y populares en el
  //         sector turístico europeo. Local Secrets tiene más de 10 millones de
  //         fans en Facebook y más de 30 millones de visitantes en sus plataformas
  //         cada mes.
  //       </p>
  //       <p>
  //         Nuestro éxito se basa principalmente en nuestra capacidad para
  //         encontrar y difundir continuamente ofertas de productos turísticos
  //         inspiradoras y atractivas.
  //       </p>
  //       <p>
  //         Pero también es nuestro auténtico amor por los viajes lo que nos une y
  //         nos impulsa, día a día, a ofrecer a nuestra comunidad las ofertas de
  //         viajes y destinos con los que soñamos nosotros mismos.
  //       </p>
  //       <p>
  //         Queremos seguir soñando, creciendo y cambiando la industria del viaje
  //         de forma sostenible con socios sólidos a nuestro lado.
  //         <br />
  //         Te proponemos destacar, en varios medios, las ventajas de tu marca,
  //         tus ofertas y tus destinos ante nuestra importante comunidad de
  //         viajeros.
  //       </p>
  //     </article>
  //   </section>
  // );
}

export default AboutSection;
