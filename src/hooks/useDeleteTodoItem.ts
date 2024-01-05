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

export const useDeleteTodoItem = () => {
  const handleRemoveTodoItem = async (todoItemId: string) => {
    console.log(todoItemId);
    try {
      await deleteDoc(doc(db, 'todoItems'));
    } catch (error) {
      console.error({ error });
    }
  };
  return { handleRemoveTodoItem };
};
