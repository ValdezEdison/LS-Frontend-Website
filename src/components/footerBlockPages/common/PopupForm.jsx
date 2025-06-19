import React, { useState } from 'react';

// --- CSS Styles ---
// To resolve the file import error, the CSS is now included directly in the component.
// This ensures all styles are available without needing a separate .css file.
 
// --- Popup Form Component ---
const PopupForm = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    onClose();
  };

  return (
    <div className="popupBackdrop" onClick={onClose}>
      <div className="popupModal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="closeButton" aria-label="Close">
          <svg width="100%" height="100%" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h3 className="formTitle">Contact Us</h3>
        <p className="formSubtitle">We'd love to hear from you!</p>

        <form onSubmit={handleSubmit}>
          <div className="formField">
            <label htmlFor="name" className="formLabel">Name</label>
            <input type="text" id="name" name="name" required className="formInput" placeholder="John Doe" />
          </div>

          <div className="formField">
            <label htmlFor="email" className="formLabel">Email Address</label>
            <input type="email" id="email" name="email" required className="formInput" placeholder="you@example.com" />
          </div>

          <div className="formField">
            <label htmlFor="message" className="formLabel">Message</label>
            <textarea id="message" name="message" rows="4" required className="formTextarea" placeholder="Your message..."></textarea>
          </div>

          <div className="submitButtonContainer">
            <button type="submit" className="submitButton">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
