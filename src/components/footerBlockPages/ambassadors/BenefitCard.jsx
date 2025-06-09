import React from "react";
// No longer need to import styles from "./BenefitCard.module.css";
// import styles from "./BenefitCard.module.css"; // You can remove this line

function BenefitCard({ heroImage, altText, title, text }) {
  return (
    <div
      // Inlined .benefitCard styles
      style={{
        borderRadius: "8px",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100%",
        minHeight: "280px",
        padding: "172px 101px 30px 30px", // This might need adjustment for the new image/text layout
        display: "flex",
        position: "relative",
        overflow: "hidden",
        marginBottom: "38px",
        // Media queries for .card cannot be inlined directly here.
        // For dynamic padding based on screen size, you'd need JS.
      }}
    >
      {heroImage && (
        <img
          src={heroImage}
          alt={altText}
          // Inlined .benefitImage styles (corresponding to your .image CSS)
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            zIndex: 1, // Ensure image is behind text if text is on top
          }}
          loading="lazy"
          width={300} // You can adjust these
          height={200} // Or get them from props if available
        />
      )}
      <div
        // Inlined .cardContent styles
        style={{
          position: "relative", // Ensure content is above the image
          zIndex: 2, // Higher z-index than the image
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end", // Push content to the bottom of the card
          height: "100%", // Take full height to allow justify-content
          padding: "20px", // Add some internal padding
          boxSizing: "border-box", // Include padding in width/height
        }}
      >
        <h3
          // Inlined .benefitTitle styles (corresponding to your .title CSS)
          style={{
            position: "relative", // Ensure text is above image
            color: "#fff",
            margin: 0,
            fontSize: "32px",
            // Media queries for .title cannot be inlined directly.
            // For font size based on screen size, you'd need JS.
          }}
        >
          {title}
        </h3>
        {text && (
          <p
            // Inlined .benefitText styles
            style={{
              position: "relative", // Ensure text is above image
              color: "#fff", // Adjust color as needed, e.g., slightly transparent white
              marginTop: "10px",
              fontSize: "18px",
              lineHeight: "1.5",
            }}
          >
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

export default BenefitCard;