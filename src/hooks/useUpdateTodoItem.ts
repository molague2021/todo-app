import { db } from '../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';

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
