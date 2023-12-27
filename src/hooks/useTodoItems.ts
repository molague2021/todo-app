import React, { useEffect, useState } from 'react';

import { collection, getDoc, doc, getDocs } from 'firebase/firestore';

import { db } from '../firebase.config';

export interface TodoItem {
  id: string;
  category: string[];
  date: Date;
  name: string;
  status: string;
}

export const useTodoItems = () => {
  // Get Todo Items
  const [todoItems, setTodoItems] = useState<TodoItem[]>();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const docRef = collection(db, 'todoItems');

        const docSnap = await getDocs(docRef);

        let items: TodoItem[] = [];
        docSnap.forEach((doc) => {
          console.log(doc);
          console.log(doc.data());
          items.push({
            id: doc.id,
            category: doc.data().category,
            date: doc.data().date,
            name: doc.data().name,
            status: doc.data().status,
          });
        });
        setTodoItems(items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodo();
  }, []);

  // Add TodoItem
  // Delete Todo Item
  // Filter Functions need to be added here

  return { todoItems, setTodoItems };
};
