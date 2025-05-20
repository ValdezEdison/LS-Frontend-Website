import React from "react";
import BenefitCard from "./BenefitCard";
import styles from "./BenefitsSection.module.css";

function BenefitsSection() {
  const benefits = [
    {
      id: 1,
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/a8e08cdcbad23ed5f1136b2547d34d284f833e89?placeholderIfAbsent=true",
      title: "Cultura de innovación y creatividad",
    },
    {
      id: 2,
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/56caf4404aa5e408994bfadeecb4fab3d888afcc?placeholderIfAbsent=true",
      title: "Oportunidades de crecimiento profesional",
    },
    {
      id: 3,
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/a658e25bb6e2806981c1ad98bd9f920ab9e31480?placeholderIfAbsent=true",
      title: "Enfoque en la comunidad local",
    },
    {
      id: 4,
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/79343fec988fcf0c51c287ee5292c8d921ae4888?placeholderIfAbsent=true",
      title: "Impacto en la industria del turismo",
    },
  ];

  return (
    <section className={styles.benefitsSection}>
      <h2 className={styles.title}>¿Por qué trabajar con Local Secrets?</h2>
      <div className={styles.grid}>
        <div className={styles.column}>
          <BenefitCard image={benefits[0].image} title={benefits[0].title} />
          <BenefitCard image={benefits[1].image} title={benefits[1].title} />
        </div>
        <div className={styles.column}>
          <BenefitCard image={benefits[2].image} title={benefits[2].title} />
          <BenefitCard image={benefits[3].image} title={benefits[3].title} />
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
