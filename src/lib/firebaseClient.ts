// src/lib/firebaseClient.ts
import { initializeApp } from 'firebase/app';
import { browser } from '$app/environment';

let app: ReturnType<typeof initializeApp> | null = null;

export function getFirebaseApp() {
  if (app) return app;
  // tus config (mantenlas aquí o en env vars)
  const firebaseConfig = {
  apiKey: "AIzaSyBCSJsbsMTFM2Ko3vDpNsWX17YVT_bSKoc",
  authDomain: "portafolioleonardopool.firebaseapp.com",
  projectId: "portafolioleonardopool",
  storageBucket: "portafolioleonardopool.firebasestorage.app",
  messagingSenderId: "652168858048",
  appId: "1:652168858048:web:bcaefef6743a9074e9a025",
  measurementId: "G-G46EV35M3X"
  };
  app = initializeApp(firebaseConfig);
  return app;
}

// inicializa analytics **solo** en cliente y solo si es soportado
export async function initAnalyticsIfSupported() {
  if (!browser) return null;
  // import dinámico para evitar cargar el módulo en SSR
  const { isSupported, getAnalytics } = await import('firebase/analytics');
  try {
    const supported = await isSupported();
    if (supported) {
      const firebaseApp = getFirebaseApp();
      return getAnalytics(firebaseApp);
    }
  } catch (err) {
    // no hacer nada si falla; analytics no es crítico
    console.warn('Analytics not initialized:', err);
  }
  return null;
}
