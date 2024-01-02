import React from 'react';
import {
  Grid,
  IconButton,
  SvgIcon,
  TextField,
  Typography,
  Button,
  styled,
  Divider,
  Icon,
} from '@mui/material';

import { Droppable, DragDropContext } from 'react-beautiful-dnd';

import { TodoItem } from '../TodoItem/TodoItem';
import {
  TodoItem as TodoItemType,
  useGetTodoItems,
} from '../../hooks/useGetTodoItems';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const StyledTypography = styled(Typography)(({ theme }) => ({
  [`&.MuiTypography-root`]: {
    color: '#5B5E7E',
    fontFamily: 'Josefin Sans',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    letterSpacing: '-0.194px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  [`&.MuiButton-root`]: {
    color: theme.palette.text.secondary,
    fontFamily: 'Josefin Sans',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal' /* 162.5% */,
    letterSpacing: '-0.194px',
    padding: '0',
    minWidth: '0',
    textTransform: 'none',
  },
  [`&.MuiButton-root:hover`]: {
    color: '#3A7CFD',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '136px',
    padding: 0,
    height: '26px',
    flexShrink: '0',
  },
}));

export const TodoItemsList = () => {
  const { todoItems, setTodoItems } = useGetTodoItems();

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      todoItems,
      result.source.index,
      result.destination.index
    );

    setTodoItems(items as TodoItemType[]);
  };

  return (
    <DragDropContext
      onDragEnd={(result) => {
        onDragEnd(result);
      }}
    >
      <Grid
        mt={3}
        container
        display="flex"
        sx={{
          width: '540px',
          borderRadius: '5px',
          bgcolor: 'background.paper',
          boxShadow: '0px 35px 50px -15px rgba(0, 0, 0, 0.50)',
        }}
      >
        <Droppable droppableId="list" type="group" key="1">
          {(provided) => {
            return (
              <Grid
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{ minHeight: '128px' }}
              >
                {todoItems?.map((item, index) => {
                  return <TodoItem todoItem={item} index={index} />;
                })}
                {provided.placeholder}
              </Grid>
            );
          }}
        </Droppable>
        <Grid
          item
          key="sorting-list"
          display="flex"
          alignItems="center"
          sx={{ width: '540px', height: '50px', flexShrink: '0' }}
        >
          <Grid
            display="flex"
            justifyContent="space-between"
            sx={{ width: '540px', padding: '0 24px' }}
          >
            <StyledTypography>{`${
              todoItems?.length ?? 0
            } items left`}</StyledTypography>
            <Grid
              display="flex"
              justifyContent="space-between"
              sx={{ width: '166px' }}
            >
              <StyledButton>All</StyledButton>
              <StyledButton>Active</StyledButton>
              <StyledButton>Completed</StyledButton>
            </Grid>
            <Grid display="flex">
              <StyledButton>Clear Completed</StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        display="flex"
        justifyContent="center"
        sx={{
          width: '540px',
          marginTop: '49px',
        }}
      >
        <StyledTypography>{`Drag and drop to reorder list`}</StyledTypography>
      </Grid>
    </DragDropContext>
  );
};
