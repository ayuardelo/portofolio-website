const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  let result = data;
  const envVars = [
    'FIREBASE_API_KEY',
    'FIREBASE_AUTH_DOMAIN',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_STORAGE_BUCKET',
    'FIREBASE_MESSAGING_SENDER_ID',
    'FIREBASE_APP_ID',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_UPLOAD_PRESET'
  ];

  envVars.forEach(envVar => {
    const placeholder = `__${envVar}__`;
    const value = process.env[envVar];
    if (!value) {
        console.warn(`Warning: Environment variable ${envVar} is not set.`);
    }
    result = result.replace(new RegExp(placeholder, 'g'), value);
  });

  fs.writeFile(filePath, result, 'utf8', (err) => {
    if (err) return console.log(err);
    console.log('Environment variables injected into index.html successfully.');
  });
});
