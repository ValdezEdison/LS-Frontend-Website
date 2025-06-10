import React from "react";
// Remove this line: import styles from "./TestimonialCard.module.css";

function TestimonialCard({ quote, author, avatar }) {
  return (
    <div
      // Inlined .testimonialCard styles (from .card in your CSS)
      style={{
        color: "#151820",
        letterSpacing: "-0.5px",
        backgroundColor: "#fff",
        border: "1px solid #e7e9ed",
        borderRadius: "10px",
        flexGrow: 1, // Allows cards to grow within the grid
        width: "100%",
        padding: "33px 34px",
        fontFamily: "Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif",
        fontSize: "18px",
        fontWeight: 400,
        lineHeight: "28px",
        // Media query for margin-top on smaller screens cannot be inlined directly.
        // For padding on smaller screens, you'd need JS.
      }}
    >
      {avatar && (
        <img
          src={avatar}
          alt={author ? `${author}'s avatar` : "Testimonial avatar"}
          // Inlined .avatar styles
          style={{
            aspectRatio: "1",
            objectFit: "contain",
            objectPosition: "center",
            borderRadius: "50%",
            width: "54px",
            // Assuming you want the avatar centered, you might need to wrap it or add display: block and margin: auto
            display: "block",
            margin: "0 auto 20px auto", // Centering and spacing below avatar
          }}
          width={108} // Provided these props; inline width overrides CSS width if both present
          height={108} // Provided these props
          loading="lazy"
        />
      )}
      <blockquote
        // Inlined .quote styles (corresponding to your .text CSS for quote content)
        style={{
          color: "#151820",
          marginTop: "34px", // Matches your .text margin-top
          fontSize: "18px", // Ensures it matches the card's font size
          lineHeight: "28px",
          margin: "0", // Reset default blockquote margin
          textAlign: "center", // Center the quote
        }}
      >
        {quote}
      </blockquote>
      {author && (
        <p
          // Inlined .author styles
          style={{
            color: "#151820",
            fontWeight: "600", // Make author name stand out a bit
            marginTop: "20px", // Space below the quote
            textAlign: "right", // Align author to the right
          }}
        >
          — {author}
        </p>
      )}
    </div>
  );
}

export default TestimonialCard;