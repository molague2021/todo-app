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

export const useSaveTodoItem = (todoItems, setTodoItems) => {
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
      const payload = {
        ...formData,
        index: todoItems.length + 1,
      };
      const docRef = await addDoc(collection(db, 'todoItems'), payload);
      console.log({ docRef }, docRef.id);
      setTodoItems((items) => [...items, { ...payload, id: docRef.id }]);
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
