import { useEffect, useState, useRef } from 'react';

import { collection, query, where, getDocs } from 'firebase/firestore';

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
  const [resetOriginalList, setResetOriginalList] = useState(false);
  const originalTodoItemsRef = useRef([]);

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
      originalTodoItemsRef.current = items;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  useEffect(() => {
    if (resetOriginalList) {
      originalTodoItemsRef.current = todoItems;
      setResetOriginalList(false);
    }
  }, [resetOriginalList]);

  // Filter Functions need to be added here

  const handleFilterTodoItems = (filters) => {
    const filter = filters.find((f) => f.active);

    if (!filter || filter.value === 'ALL') {
      setTodoItems(originalTodoItemsRef.current);
      return;
    }

    const { value } = filter;

    setTodoItems(
      originalTodoItemsRef.current.filter((f) => f.status === value)
    );
  };

  return {
    todoItems,
    setTodoItems,
    handleFilterTodoItems,
    setResetOriginalList,
  };
};
