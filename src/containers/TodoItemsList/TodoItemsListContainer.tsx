import { Grid, styled, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

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

const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.between('xs', 'sm')]: {
    padding: '45px 0px',
  },
  [theme.breakpoints.up('sm')]: {
    padding: '70px 450px',
  },
}));

interface TodoItemsListContainerProps {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
}

export const TodoItemsListContainer = ({
  toggleColorMode,
  mode,
}: TodoItemsListContainerProps) => {
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const {
    todoItems,
    setTodoItems,
    handleFilterTodoItems,
    setResetOriginalList,
  } = useGetTodoItems();
  const { handleRemoveTodoItem, handleClearCompletedItems } = useDeleteTodoItem(
    todoItems,
    setTodoItems,
    reorder,
    setResetOriginalList
  );
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
    <StyledGrid
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        position: 'absolute',
        zIndex: '2',
        width: '100%',
        margin: 'auto',
      }}
    >
      <Header
        toggleColorMode={toggleColorMode}
        mode={mode}
        mobileView={mobileView}
      />
      <AddTodoItem
        onAddTodoItem={handleAddTodoItem}
        todoItemName={name}
        onNameChange={handleNameChange}
        mobileView={mobileView}
      />
      <TodoItemsList
        todoItems={todoItems}
        onDragEnd={handleDragEnd}
        onRemoveTodoItem={handleRemoveTodoItem}
        onClearCompleteItems={handleClearCompletedItems}
        onUpdateStatus={handleUpdateItemStatus}
        onFilterTodoItems={handleFilterTodoItems}
        mobileView={mobileView}
      />
    </StyledGrid>
  );
};
