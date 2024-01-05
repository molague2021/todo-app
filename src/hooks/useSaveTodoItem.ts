import React, { useRef } from 'react';
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
  const todoItemRef = useRef({
    name: '',
    category: ['Home'],
    date: new Date(),
    status: 'ACTIVE',
    userRef: process.env.REACT_APP_USER_REF,
  });
  // Add TodoItem
  const handleAddTodoItem = async (formData) => {
    try {
      const docRef = await addDoc(collection(db, 'todoItems'), formData);
      console.log(docRef);
      todoItemRef.current = {
        name: '',
        category: ['Home'],
        date: new Date(),
        status: 'ACTIVE',
        userRef: process.env.REACT_APP_USER_REF,
      };
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleAddTodoItem,
    todoItemRef,
  };
};
