import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CoreModule } from '@mp/app/core/feature';

const ENVIRONMENT = process.env['NX_ENVIRONMENT'] || 'development';
const FIREBASE_USE_EMULATORS = JSON.parse(
  process.env['NX_FIREBASE_USE_EMULATORS'] || 'true'
);
const FIREBASE_API_KEY = process.env['NX_FIREBASE_API_KEY'] || '';
const FIREBASE_AUTH_DOMAIN = process.env['NX_FIREBASE_AUTH_DOMAIN'] || '';
const FIREBASE_DATABASE_URL = process.env['NX_FIREBASE_DATABASE_URL'] || '';
const FIREBASE_PROJECT_ID = process.env['NX_FIREBASE_PROJECT_ID'] || '';
const FIREBASE_STORAGE_BUCKET = process.env['NX_FIREBASE_STORAGE_BUCKET'] || '';
const FIREBASE_MESSAGING_SENDER_ID =
  process.env['NX_FIREBASE_MESSAGING_SENDER_ID'] || '';
const FIREBASE_APP_ID = process.env['NX_FIREBASE_APP_ID'] || '';
const FIREBASE_MEASUREMENT_ID = process.env['NX_FIREBASE_MEASUREMENT_ID'] || '';

if (ENVIRONMENT === 'development') {
  console.log(`ENVIRONMENT: ${ENVIRONMENT}`);
  console.log(`FIREBASE_USE_EMULATORS: ${FIREBASE_USE_EMULATORS}`);
  console.log(`FIREBASE_API_KEY: ${FIREBASE_API_KEY}`);
  console.log(`FIREBASE_AUTH_DOMAIN: ${FIREBASE_AUTH_DOMAIN}`);
  console.log(`FIREBASE_DATABASE_URL: ${FIREBASE_DATABASE_URL}`);
  console.log(`FIREBASE_PROJECT_ID: ${FIREBASE_PROJECT_ID}`);
  console.log(`FIREBASE_STORAGE_BUCKET: ${FIREBASE_STORAGE_BUCKET}`);
  console.log(`FIREBASE_MESSAGING_SENDER_ID: ${FIREBASE_MESSAGING_SENDER_ID}`);
  console.log(`FIREBASE_APP_ID: ${FIREBASE_APP_ID}`);
  console.log(`FIREBASE_MEASUREMENT_ID: ${FIREBASE_MEASUREMENT_ID}`);
}

if (ENVIRONMENT === 'production') {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(CoreModule)
  .catch((err) => console.error(err));
