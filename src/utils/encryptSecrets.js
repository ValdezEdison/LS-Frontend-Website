// scripts/encryptSecrets.js
import CryptoJS from 'crypto-js';
import fs from 'fs';
import path from 'path';
import { LocalStorage } from 'node-localstorage';

// 1. Define all your secrets in one object



// Mock localStorage in Node.js
const localStorage = new LocalStorage('./scratch');

// Set the key first (or load it if it exists)
const ENCRYPTION_KEY_NAME = 'encryptedSecretKey';
if (!localStorage.getItem(ENCRYPTION_KEY_NAME)) {
  console.log('No key found, generating a new one');
  // Generate a key if it doesn't exist
  const newKey = CryptoJS.lib.WordArray.random(32).toString();
  localStorage.setItem(ENCRYPTION_KEY_NAME, newKey);
}

// Now get the key
const VITE_SECRET_KEY = localStorage.getItem(ENCRYPTION_KEY_NAME);

console.log(VITE_SECRET_KEY, 'VITE_SECRET_KEY')

// 3. Encrypt the entire object
const encrypted = CryptoJS.AES.encrypt(JSON.stringify(secrets), VITE_SECRET_KEY).toString();

const VITE_API_BASE_URL = 'https://localsecrets-staging.rudo.es';
const VITE_API_CMS_BASE_URL =  'https://cms-ls-yerpb.ondigitalocean.app';
const VITE_NAME = 'dev'
const VITE_DEBUG_MODE = true


// 4. Create a new .env file with the encrypted data
const envContent = `VITE_ENCRYPTED_SECRETS=${encrypted}\n` +
                   `VITE_API_BASE_URL=${VITE_API_BASE_URL}\n` +
                   `VITE_API_CMS_BASE_URL=${VITE_API_CMS_BASE_URL}\n` +
                   `VITE_DEBUG_MODE=${VITE_DEBUG_MODE}\n` +
                  
                   `VITE_APP_NAME=dev\n`;

fs.writeFileSync(path.join(process.cwd(), '.env.development'), envContent);
console.log('Encrypted .env.development file created!');