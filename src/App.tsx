import React, { useEffect } from 'react';
import { collection, getDoc, doc, getDocs } from 'firebase/firestore';
import { db } from './firebase.config';

export const App = () => {
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const docRef = collection(db, 'todoItems');

        const docSnap = await getDocs(docRef);

        docSnap.forEach((doc) => {
          console.log(doc.data());
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodo();
  }, []);
  return <div>Hello, Todo App!</div>;
};
