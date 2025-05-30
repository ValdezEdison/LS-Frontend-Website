// src/utils/secretsManager.js
import CryptoJS from 'crypto-js';

// Get the decryption key from localStorage
const ENCRYPTION_KEY_NAME = 'encryptedSecretKey';
const SECRET_KEY = localStorage.getItem(ENCRYPTION_KEY_NAME);

if (!SECRET_KEY) {
  
  // throw new Error('Decryption key missing');
}

let cachedSecrets = null;

// Main function to decrypt and cache secrets
const decryptSecrets = () => {
  if (cachedSecrets) return cachedSecrets;
  
  try {
    const encrypted = import.meta.env.VITE_ENCRYPTED_SECRETS;
    if (!encrypted) throw new Error('No encrypted secrets found');
    
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) throw new Error('Decryption failed - check your key');
    
    cachedSecrets = JSON.parse(decrypted);
    return cachedSecrets;
  } catch (error) {
    
    return {};
  }
};

// Get all secrets at once
export const getAllSecrets = () => decryptSecrets();

// Get a specific secret by key
export const getSecret = (key) => decryptSecrets()[key] || null;

// Individual getters for type safety/autocomplete
export const getGoogleAuthId = () => getSecret('googleAuthId');
export const getGoogleAuthSecret = () => getSecret('googleAuthSecret');
export const getGoogleMapsApiKey = () => getSecret('GOOGLEMAPSAPIKEY');
export const getGoogleMapsMapId = () => getSecret('GOOGLEMAPSMAP_ID');
export const getClientId = () => getSecret('CLIENTID');
export const getClientSecret = () => getSecret('CLIENTSECRET');
export const getSocialAuthAppleIdTeam = () => getSecret('SOCIAL_AUTH_APPLE_ID_TEAM');
export const getSocialAuthAppleId = () => getSecret('SOCIAL_AUTH_APPLE_ID');
export const getSocialAuthAppleIdSecret = () => getSecret('SOCIAL_AUTH_APPLE_ID_SECRET');
export const getSocialAuthAppleRedirectUri = () => getSecret('SOCIAL_AUTH_APPLE_REDIRECT_URI');
