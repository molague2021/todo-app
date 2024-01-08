import React, { useEffect, useState } from 'react';

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

export interface TodoItem {
  id: string;
  category: string[];
  index: number;
  date: Date;
  name: string;
  status: string;
}

export const useGetTodoItems = () => {
  // Get Todo Items
  const [todoItems, setTodoItems] = useState<TodoItem[]>();

  const fetchTodo = async () => {
    try {
      const todoItemsRef = collection(db, 'todoItems');

      const q = query(
        todoItemsRef,
        where('userRef', '==', process.env.REACT_APP_USER_REF)
      );

      const docSnap = await getDocs(q);

      let items: TodoItem[] = [];
      docSnap.forEach((doc) => {
        items.push({
          id: doc.id,
          category: doc.data().category,
          index: doc.data().index,
          date: doc.data().date,
          name: doc.data().name,
          status: doc.data().status,
        });
      });

      items.sort((a, b) => a.index - b.index);
      setTodoItems(items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  // Filter Functions need to be added here

  return { todoItems, setTodoItems };
};
