import { Grid } from '@mui/material';
import { Header } from '../../components/Header';
import { TodoItemsList } from './TodoItemsList';
import { AddTodoItem } from '../AddTodoItem/AddTodoItem';
import { useSaveTodoItem } from '../../hooks/useSaveTodoItem';
import { useDeleteTodoItem } from '../../hooks/useDeleteTodoItem';
import {
  TodoItem as TodoItemType,
  useGetTodoItems,
} from '../../hooks/useGetTodoItems';
import { useUpdateTodoItem } from '../../hooks/useUpdateTodoItem';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  let i = 0;
  result.forEach((item: TodoItemType, index) => {
    if (index === startIndex) {
      item.index = endIndex;
    } else {
      item.index = i;
      i++;
    }
  });
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface TodoItemsListContainerProps {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
}

export const TodoItemsListContainer = ({
  toggleColorMode,
  mode,
}: TodoItemsListContainerProps) => {
  const { todoItems, setTodoItems } = useGetTodoItems();
  const { handleRemoveTodoItem } = useDeleteTodoItem(setTodoItems);
  const { handleAddTodoItem, name, handleNameChange } = useSaveTodoItem(
    todoItems,
    setTodoItems
  );
  const { handleUpdateSortIndex, handleUpdateItemStatus } = useUpdateTodoItem();

  const handleDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      todoItems,
      result.source.index,
      result.destination.index
    );

    handleUpdateSortIndex(items);

    setTodoItems(items as TodoItemType[]);
  };

  return (
    <Grid
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        position: 'absolute',
        zIndex: '2',
        height: '100%',
        width: '100%',
        margin: 'auto',
        padding: '70px 450px',
      }}
    >
      <Header toggleColorMode={toggleColorMode} mode={mode} />
      <AddTodoItem
        onAddTodoItem={handleAddTodoItem}
        todoItemName={name}
        onNameChange={handleNameChange}
      />
      <TodoItemsList
        todoItems={todoItems}
        onDragEnd={handleDragEnd}
        onRemoveTodoItem={handleRemoveTodoItem}
        onUpdateStatus={handleUpdateItemStatus}
      />
    </Grid>
  );
};
