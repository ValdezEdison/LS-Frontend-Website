Encrypting and Injecting Secrets for Production
==============================================

This guide outlines how to securely encrypt and inject secrets for a production environment in your project.

Step 1: Define Secrets and Configure Environment
------------------------------------------------

1. Open the file:
   /src/utils/encryptSecrets.js

2. Locate the comment:
// 1. Define all your secrets in one object

3. Below this comment, insert the following object:

const secrets = {
  googleAuthId: 'xxxxxxxxxxxxxxxxxxxxx', // 'your-google-client-id'
  googleAuthSecret: 'xxxxxxxxxxxxxxxxxxxxx', // 'your-google-client-secret'
  GOOGLEMAPSAPIKEY: 'xxxxxxxxxxxxxxxxxxxxx', // 'your-google-maps-api-key'
  GOOGLEMAPSMAP_ID: 'xxxxxxxxxxxxxxxxxxxxx', // 'your-google-maps-id'
  CLIENTID: 'xxxxxxxxxxxxxxxxxxxxx', // 'your-client-id'
  CLIENTSECRET: 'xxxxxxxxxxxxxxxxxxxxx', // 'your-client-secret'
  SOCIAL_AUTH_APPLE_ID: 'xxxxxxxxxxxxxxx', // 'your apple service id'
  SOCIAL_AUTH_APPLE_REDIRECT_URI: 'xxxxxxxxxxxxxxxxxx', // your apple redirect uri'
  SOCIAL_AUTH_APPLE_ID_TEAM: 'xxxxxxxxxxxxxxxxxxxxx', // 'your-apple-team-id'
  SOCIAL_AUTH_APPLE_ID_KEY: 'xxxxxxxxxxxxxxxxxxxxx', // 'your-apple-client-id'
  SOCIAL_AUTH_APPLE_ID_SECRET: 'xxxxxxxxxxxxxxxxxxxxx' // 'your-apple-private-key'
};

4. Update the environment file path in the same file.
Change:
fs.writeFileSync(path.join(process.cwd(), '.env.development'), envContent);
To:
fs.writeFileSync(path.join(process.cwd(), '.env.production'), envContent);

5. Modify the values of the following keys in the envContent (do NOT change the key names):

VITE_API_BASE_URL=your_production_api_url
VITE_API_CMS_BASE_URL=your_production_cms_url
VITE_API_WORDPRESS_BASE_URL=your_production_wordpress_url
VITE_NAME="prod"
VITE_DEBUG_MODE=false

Step 2: Run Encryption Script
-----------------------------

Run the following command in your project root:

npm run encrypt-secrets

This will:
- Generate a `.env.production` file.
- Create a `scratch` folder at the root of your project containing the encrypted secret key.

Step 3: Use Encrypted Key in the Application
--------------------------------------------

1. Open the file:
   /src/components/layouts/Header.jsx

2. Locate the comment:
// place the secret key from the scratch/encryptedSecretKey file

3. Copy the content from /scratch/encryptedSecretKey and paste it below the above comment.

Important Notes
---------------

- Do not change any key names while modifying `.env` values.
- Ensure the `scratch` folder is not committed to version control (add it to `.gitignore` if necessary).
- Keep your secrets confidential and never share them publicly.
- Clear the secret object from the code we mentioned in setp1 after this process.

