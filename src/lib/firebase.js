import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBCSJsbsMTFM2Ko3vDpNsWX17YVT_bSKoc",
  authDomain: "portafolioleonardopool.firebaseapp.com",
  projectId: "portafolioleonardopool",
  storageBucket: "portafolioleonardopool.firebasestorage.app",
  messagingSenderId: "652168858048",
  appId: "1:652168858048:web:bcaefef6743a9074e9a025",
  measurementId: "G-G46EV35M3X"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };

