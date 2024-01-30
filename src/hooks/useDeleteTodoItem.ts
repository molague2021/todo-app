import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';

export const useDeleteTodoItem = (
  todoItems,
  setTodoItems,
  reorder,
  setResetOriginalList
) => {
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

  const handleClearCompletedItems = () => {
    try {
      const newTodoList = [];
      todoItems.forEach(async (item) => {
        if (item.status === 'COMPLETED') {
          await deleteDoc(doc(db, 'todoItems', item.id));
        } else {
          newTodoList.push(item);
        }
      });
      setTodoItems(reorder(newTodoList));
      setResetOriginalList(true);
    } catch (error) {
      console.log('No items to delete', error);
    }
  };
  return { handleRemoveTodoItem, handleClearCompletedItems };
};
