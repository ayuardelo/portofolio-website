const fs = require('fs');
const path = require('path');

console.log('Starting environment variable injection...');

const filePath = path.join(__dirname, 'index.html');

try {
  let data = fs.readFileSync(filePath, 'utf8');
  console.log('Successfully read index.html.');

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
    
    if (value) {
      console.log(`Replacing ${placeholder}...`);
      data = data.replace(new RegExp(placeholder, 'g'), value);
    } else {
      console.warn(`Warning: Environment variable ${envVar} is not set.`);
    }
  });

  fs.writeFileSync(filePath, data, 'utf8');
  console.log('Successfully wrote updated index.html.');
  console.log('Injection script finished successfully!');

} catch (err) {
  console.error('Error during script execution:', err);
  process.exit(1); // Exit with an error code to fail the build
}
