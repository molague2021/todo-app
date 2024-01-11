import { db } from '../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';

export const useUpdateTodoItem = () => {
  const handleUpdateSortIndex = (todoItems) => {
    todoItems.forEach(async (item) => {
      item.userRef = process.env.REACT_APP_USER_REF;
      const docRef = doc(db, 'todoItems', item.id);
      await updateDoc(docRef, item);
    });
  };

  const handleUpdateItemStatus = async (item) => {
    if (item.status === 'COMPLETED') {
      item.status = 'ACTIVE';
    } else {
      item.status = 'COMPLETED';
    }
    item.userRef = process.env.REACT_APP_USER_REF;
    const docRef = doc(db, 'todoItems', item.id);
    await updateDoc(docRef, item);
  };

  return {
    handleUpdateSortIndex,
    handleUpdateItemStatus,
  };
};
