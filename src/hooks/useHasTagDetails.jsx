import { useState, useEffect } from 'react';

/**
 * Checks if tagDetails exists in localStorage
 * @returns {boolean} true if tagDetails exists, false otherwise
 */
const useHasTagDetails = () => {
  const [hasTagDetails, setHasTagDetails] = useState(false);

  useEffect(() => {
    const checkTagDetails = () => {
      const tagDetails = localStorage.getItem('tagDetails');
      setHasTagDetails(!!tagDetails);
    };

    // Initial check
    checkTagDetails();

    // Optional: Listen for storage changes (if needed)
    window.addEventListener('storage', checkTagDetails);
    return () => window.removeEventListener('storage', checkTagDetails);
  }, []);

  return hasTagDetails;
};

export default useHasTagDetails;