import crypto from 'crypto';

const apiKey = crypto.randomBytes(32).toString('base64');
console.log('Generated new API Key:', apiKey);