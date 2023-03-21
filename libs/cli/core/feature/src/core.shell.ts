import * as admin from 'firebase-admin';
import { CommandFactory } from 'nest-commander';
import { CoreModule } from './core.module';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env['NX_FIREBASE_DATABASE_URL'] || '',
  storageBucket: process.env['NX_FIREBASE_STORAGE_BUCKET'] || '',
  projectId: process.env['NX_FIREBASE_PROJECT_ID'] || '',
});
admin.firestore().settings({ ignoreUndefinedProperties: true });

async function bootstrap() {
  await CommandFactory.run(CoreModule);
}

bootstrap();
