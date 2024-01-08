import React from 'react';
import { db } from '../firebase.config';
import {
  doc,
  collection,
  updateDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';

export const useUpdateTodoItem = () => {
  const handleUpdateTodoItemIndex = (todoItems) => {
    todoItems.forEach(async (item) => {
      item.userRef = process.env.REACT_APP_USER_REF;
      const docRef = doc(db, 'todoItems', item.id);
      await updateDoc(docRef, item);
    });
  };

  return {
    handleUpdateTodoItemIndex,
  };
};
