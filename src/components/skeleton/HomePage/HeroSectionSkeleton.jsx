import React from "react";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroSectionSkeleton = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <section className="hero-section">
      <Skeleton 
        height="100%" 
        width="100%" 
        style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1
        }} 
      />
      <div className="hero-content">
        <Skeleton 
          width={300} 
          height={40} 
          style={{ marginBottom: "1.5rem", backgroundColor:"#dfdbdb" }} 
        />
        <Skeleton 
          width={450} 
          height={24} 
          style={{ marginBottom: "1.5rem", backgroundColor:"#dfdbdb" }} 
          count={2} 
        />
        {!isAuthenticated && (
          <Skeleton 
            width={150} 
            height={44} 
            style={{ borderRadius: "12px", backgroundColor:"#dfdbdb" }} 
          />
        )}
      </div>
      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #010101;
          padding: 2rem;
          overflow: hidden;
        }
        .hero-content {
          max-width: 659px;
          width: 100%;
          z-index: 9;
        }
        @media (max-width: 768px) {
          .hero-section {
            min-height: 295px;
          }
          .hero-content :global(skeleton) {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSectionSkeleton;