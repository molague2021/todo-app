import React from 'react';
import {
  collection,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
} from 'firebase/firestore';

import { db } from '../firebase.config';

export const useSaveTodoItem = () => {
  // Add TodoItem
  const handleAddTodoItem = async (formData) => {
    try {
      const docRef = await addDoc(collection(db, 'todoItems'), formData);
      console.log(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleAddTodoItem,
  };
};
