import CryptoJS from 'crypto-js';

// Vite automatically makes .env variables available under import.meta.env
const ENCRYPTION_KEY_NAME = 'encryptedSecretKey';
const SECRET_KEY = localStorage.getItem(ENCRYPTION_KEY_NAME);

if (!SECRET_KEY) {
  console.error('Missing VITE_SECRET_KEY in environment variables');
  throw new Error('Decryption key missing');
}

let cachedSecrets = null;

export const getSecrets = () => {
    console.log(SECRET_KEY, 'import.meta.env.VITE_ENCRYPTED_SECRETS')
  if (cachedSecrets) return cachedSecrets;
  
  try {
    const encrypted = import.meta.env.VITE_ENCRYPTED_SECRETS;
    if (!encrypted) throw new Error('No encrypted secrets found');
    
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    console.log(bytes, 'bytes')
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!decrypted) throw new Error('Decryption failed - check your key');
    
    cachedSecrets = JSON.parse(decrypted);
    return cachedSecrets;
  } catch (error) {
    console.error('Secrets decryption failed:', error);
    return {};
  }
};

// Specific getters
export const getGoogleAuthId = () => getSecrets().googleAuthId || '';
export const getGoogleAuthSecret = () => getSecrets().googleAuthSecret || '';