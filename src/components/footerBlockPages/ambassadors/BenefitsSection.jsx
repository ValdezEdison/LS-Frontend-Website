import React from "react";
import BenefitCard from "./BenefitCard";
// No longer need to import styles from "./BenefitsSection.module.css";
// import styles from "./BenefitsSection.module.css"; // You can remove this line

function BenefitsSection({ benefits = [], subtitle }) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section
      // Inlined .benefitsSection styles
      style={{
        padding: "60px 0", // Adjust padding for the section
        textAlign: "center",
      }}
    >
      {subtitle && (
        <h2
          // Inlined .sectionTitle styles
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: "#151820",
            marginBottom: "40px",
            fontFamily: "Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif",
          }}
        >
          {subtitle}
        </h2>
      )}
      <div
        // Inlined .benefitsGrid styles
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Responsive grid
          gap: "30px", // Space between cards
          maxWidth: "900px", // Max width for the grid
          margin: "0 auto", // Center the grid
          padding: "0 20px", // Horizontal padding
        }}
      >
        {benefits.map((benefit) => (
          <BenefitCard
            key={benefit.id}
            heroImage={benefit.hero_image?.url}
            altText={benefit.hero_image?.alt || benefit.hero_title}
            title={benefit.hero_title}
            text={benefit.hero_text}
          />
        ))}
      </div>
    </section>
  );
}

export default BenefitsSection;