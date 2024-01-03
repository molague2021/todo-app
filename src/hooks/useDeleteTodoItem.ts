import React from 'react';
import { db } from '../firebase.config';
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';

export const useDeleteTodoItem = () => {
  const handleRemoveTodoItem = async (todoItemId: string) => {
    console.log(todoItemId);
    await deleteDoc(doc(db, 'todoItems', todoItemId)).then((response) => {
      console.log(response);
    });
  };
  return { handleRemoveTodoItem };
};
