import { isDevMode, NgModule } from '@angular/core';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import {
    FirebaseOptions,
    initializeApp,
    provideFirebaseApp
} from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
    connectDatabaseEmulator,
    getDatabase,
    provideDatabase
} from '@angular/fire/database';
import {
    connectFirestoreEmulator,
    enableMultiTabIndexedDbPersistence,
    getFirestore,
    provideFirestore
} from '@angular/fire/firestore';
import {
    connectFunctionsEmulator,
    getFunctions,
    provideFunctions
} from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import {
    getRemoteConfig,
    provideRemoteConfig
} from '@angular/fire/remote-config';
import {
    connectStorageEmulator,
    getStorage,
    provideStorage
} from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AuthState } from '@mp/app/auth/data-access';
import { AuthModule } from '@mp/app/auth/feature';
import { ErrorsState } from '@mp/app/errors/data-access';
import { ErrorsModule } from '@mp/app/errors/feature';
import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { MomentModule } from 'ngx-moment';
import { CoreRouting } from './core.routing';
import { CoreShell } from './core.shell';

let resolvePersistenceEnabled: (enabled: boolean) => void;

export const persistenceEnabled = new Promise<boolean>((resolve) => {
  resolvePersistenceEnabled = resolve;
});

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

const FIREBASE_OPTIONS: FirebaseOptions = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

@NgModule({
  declarations: [CoreShell],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    CoreRouting,
    provideRemoteConfig(() => getRemoteConfig()),
    provideAnalytics(() => getAnalytics()),
    provideMessaging(() => getMessaging()),
    provideAuth(() => {
      const auth = getAuth();
      if (FIREBASE_USE_EMULATORS) {
        connectAuthEmulator(auth, 'http://localhost:5002', {
          disableWarnings: true,
        });
      }
      return auth;
    }),
    provideFirebaseApp(() => initializeApp(FIREBASE_OPTIONS)),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (FIREBASE_USE_EMULATORS) {
        connectFirestoreEmulator(firestore, 'localhost', 5003);
      }
      enableMultiTabIndexedDbPersistence(firestore).then(
        () => resolvePersistenceEnabled(true),
        () => resolvePersistenceEnabled(false)
      );
      return firestore;
    }),
    provideDatabase(() => {
      const database = getDatabase();
      if (FIREBASE_USE_EMULATORS) {
        connectDatabaseEmulator(database, 'localhost', 5004);
      }
      return database;
    }),
    provideStorage(() => {
      const storage = getStorage();
      if (FIREBASE_USE_EMULATORS) {
        connectStorageEmulator(storage, 'localhost', 5006);
      }
      return storage;
    }),
    provideFunctions(() => {
      const functions = getFunctions();
      if (FIREBASE_USE_EMULATORS) {
        connectFunctionsEmulator(functions, 'localhost', 5005);
      }
      return functions;
    }),
    MomentModule.forRoot(),
    // NgxsModule.forRoot([]),
    NgxsModule.forRoot([ErrorsState, AuthState]),
    // NgxsModule.forRoot([AuthState, ErrorState]),
    NgxsLoggerPluginModule.forRoot({
      collapsed: false,
      disabled: ENVIRONMENT == 'production',
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: ENVIRONMENT == 'production',
    }),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
    NgxsActionsExecutingModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    AuthModule,
    ErrorsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [CoreShell],
})
export class CoreModule {}
