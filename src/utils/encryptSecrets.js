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
  // Generate a key if it doesn't exist
  const newKey = CryptoJS.lib.WordArray.random(32).toString();
  localStorage.setItem(ENCRYPTION_KEY_NAME, newKey);
}

// Now get the key
const VITE_SECRET_KEY = localStorage.getItem(ENCRYPTION_KEY_NAME);

// 3. Encrypt the entire object
const encrypted = CryptoJS.AES.encrypt(JSON.stringify(secrets), VITE_SECRET_KEY).toString();

const VITE_API_BASE_URL = 'https://localsecrets-staging.rudo.es';
const VITE_API_CMS_BASE_URL =  'https://cms-ls-yerpb.ondigitalocean.app';
const VITE_NAME = 'dev'
const VITE_DEBUG_MODE = true
const VITE_APP_GOOGLE_MAPS_API_KEY = 'AIzaSyBHpwY8hHo9nx6noQ_zCDc_pDmUN1uWgrQ';
const VITE_APP_GOOGLE_MAPS_MAP_ID = '307133468379fe20';
const VITE_CLIENT_ID = "eCThzMke1zIxhvPVKGLIoxZkvB5sFRyZdpxXqxgJ";
const VITE_CLIENT_SECRET = "i8lFXztdl6fOUktHGF2b8kHKqbRqhMJ36ocZ9by66uTp1xmj7YhFYqGlxuiH0sLYx533SYDR6Rgyk7uxeCNoooTetxJli9IUlgmyrbZ4PZa0b8m3KdStkgIgJIZDLCbh"

// 4. Create a new .env file with the encrypted data
const envContent = `VITE_ENCRYPTED_SECRETS=${encrypted}\n` +
                   `VITE_API_BASE_URL=${VITE_API_BASE_URL}\n` +
                   `VITE_API_CMS_BASE_URL=${VITE_API_CMS_BASE_URL}\n` +
                   `VITE_DEBUG_MODE=${VITE_DEBUG_MODE}\n` +
                   `VITE_APP_GOOGLE_MAPS_API_KEY=${VITE_APP_GOOGLE_MAPS_API_KEY}\n` +
                   `VITE_APP_GOOGLE_MAPS_MAP_ID=${VITE_APP_GOOGLE_MAPS_MAP_ID}\n` +
                   `VITE_CLIENT_ID=${VITE_CLIENT_ID}\n` +
                   `VITE_CLIENT_SECRET=${VITE_CLIENT_SECRET}\n` +
                //    `VITE_SECRET_KEY=${VITE_SECRET_KEY}\n` +
                   `VITE_APP_NAME=dev\n`;

fs.writeFileSync(path.join(process.cwd(), '.env.development'), envContent);
console.log('Encrypted .env.development file created!');