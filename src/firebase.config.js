// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC0Toknm2eRS7D9xI71km3zFJiO-gA2CdA',
  authDomain: 'todo-app-f3b40.firebaseapp.com',
  projectId: 'todo-app-f3b40',
  storageBucket: 'todo-app-f3b40.appspot.com',
  messagingSenderId: '303405057588',
  appId: '1:303405057588:web:33f5aba15e4ed7d1172c61',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
