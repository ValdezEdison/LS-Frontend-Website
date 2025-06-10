import React from "react";
import TestimonialCard from "./TestimonialCard";
// Remove this line: import styles from "./TestimonialsSection.module.css";

function TestimonialsSection({ testimonials = [], subtitle, description }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      // Inlined .testimonialsSection styles
      style={{
        padding: "60px 20px", // Overall padding for the section
        textAlign: "center", // Center section title and description
      }}
    >
      {subtitle && (
        <h2
          // Inlined .sectionTitle styles
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: "#151820",
            marginBottom: "20px",
            fontFamily: "Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif",
          }}
        >
          {subtitle}
        </h2>
      )}
      {description && (
        <div
          // Inlined .sectionDescription styles
          style={{
            maxWidth: "800px", // Limit width for readability
            margin: "0 auto 40px auto", // Center and add space below
            fontSize: "18px",
            lineHeight: "1.6",
            color: "#555", // A slightly lighter color for description
            fontFamily: "Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif",
          }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      <div
        // Inlined .testimonialsGrid styles
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", // Responsive grid for cards
          gap: "30px", // Space between testimonial cards
          maxWidth: "1200px", // Max width for the grid
          margin: "0 auto", // Center the grid
          padding: "0 20px", // Ensure some padding on sides
        }}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            quote={testimonial.quote}
            author={testimonial.author_name}
            avatar={testimonial.thumbnail?.url}
          />
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;