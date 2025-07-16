// src/utils/urlHelpers.js
export const parseUrl = (url) => {
  console.group('URL Parsing Debug');
  console.log('Original URL:', url);
  
  // Remove leading slashes
  const cleanUrl = url.replace(/^\/+/, '');
  console.log('Cleaned URL (no leading slashes):', cleanUrl);
  
  // Check for common path segments
  const hasWebroutes = cleanUrl.includes('webroutes');
  const hasSites = cleanUrl.includes('sites');
  console.log('Contains "webroutes":', hasWebroutes);
  console.log('Contains "sites":', hasSites);
  
  // Build the correct URL
  let finalUrl;
  if (hasWebroutes) {
    finalUrl = `/${cleanUrl}`;
  } else if (hasSites) {
    finalUrl = `/${cleanUrl}`;
  } else {
    finalUrl = `/${cleanUrl}`;
  }
  
  console.log('Final URL to navigate to:', finalUrl);
  console.groupEnd();
  
  return finalUrl;
};