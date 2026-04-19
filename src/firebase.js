import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  // On Windows, .env files can accidentally be saved with a UTF-8 BOM.
  // CRA then exposes the first key as "\ufeffREACT_APP_FIREBASE_API_KEY".
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || process.env['\ufeffREACT_APP_FIREBASE_API_KEY'],
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  ...(process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    ? { measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID }
    : {}),
};

export function missingFirebaseEnv() {
  const keys = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN',
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_FIREBASE_APP_ID',
  ];
  return keys.filter((k) => {
    if (k === 'REACT_APP_FIREBASE_API_KEY') {
      return !(process.env.REACT_APP_FIREBASE_API_KEY || process.env['\ufeffREACT_APP_FIREBASE_API_KEY']);
    }
    return !process.env[k];
  });
}

function getOrInitApp() {
  if (missingFirebaseEnv().length > 0) {
    return null;
  }
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
}

const app = getOrInitApp();

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

if (app && typeof window !== 'undefined' && firebaseConfig.measurementId) {
  isSupported()
    .then((ok) => {
      if (ok) getAnalytics(app);
    })
    .catch(() => {});
}
