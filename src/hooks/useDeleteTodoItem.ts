import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';

export const useDeleteTodoItem = (setTodoItems) => {
  const handleRemoveTodoItem = async (todoItemId: string) => {
    try {
      await deleteDoc(doc(db, 'todoItems', todoItemId));
      setTodoItems((todoItems) =>
        todoItems.filter((item) => item.id !== todoItemId)
      );
    } catch (error) {
      console.error({ error });
    }
  };
  return { handleRemoveTodoItem };
};
