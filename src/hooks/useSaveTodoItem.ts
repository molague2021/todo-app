import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

import { db } from '../firebase.config';

export const useSaveTodoItem = (todoItems, setTodoItems) => {
  const [name, setName] = useState('');

  const handleAddTodoItem = async () => {
    try {
      const payload = {
        name,
        category: ['Home'],
        date: new Date(),
        status: 'ACTIVE',
        userRef: process.env.REACT_APP_USER_REF,
        index: todoItems.length + 1,
      };
      const docRef = await addDoc(collection(db, 'todoItems'), payload);
      console.log({ docRef }, docRef.id);
      setTodoItems((items) => [...items, { ...payload, id: docRef.id }]);
      setName('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  return {
    handleAddTodoItem,
    name,
    handleNameChange,
  };
};
