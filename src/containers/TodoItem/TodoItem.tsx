import React from 'react';
import {
  Grid,
  IconButton,
  SvgIcon,
  TextField,
  Typography,
  styled,
  Divider,
  Icon,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Draggable } from 'react-beautiful-dnd';

const StyledTypography = styled(Typography)(({ theme }) => ({}));
const StyledDivider = styled('div')(({ theme }) => ({
  [theme.breakpoints.between('sm', 'md')]: {
    width: '706px',
    height: '1px',
    flexShrink: '0',
    background: 'white',
  },
  [theme.breakpoints.between('md', 'xl')]: {
    width: '540px',
    height: '1px',
    flexShrink: '0',
    background: theme.palette.divider,
  },
}));
interface TodoItem {
  id: string;
  category: string[];
  date: Date;
  name: string;
  status: string;
}

type TodoItemsListProps = {
  props?: any;
  innerRef?: any;
  todoItem: TodoItem;
  index: number;
  onDeleteTodoItem: (id: string) => Promise<void>;
};

export const TodoItem = ({
  todoItem,
  index,
  onDeleteTodoItem,
}: TodoItemsListProps) => {
  return (
    <Draggable key={todoItem.id} draggableId={todoItem.id} index={index}>
      {(provided) => {
        return (
          <>
            <Grid
              item
              key={todoItem.id}
              id={`todoitem-${todoItem.id}`}
              display="flex"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              alignItems="center"
              draggable={true}
              sx={{
                width: '540px',
                height: '64px',
                flexShrink: '0',
                padding: '0 24px',
              }}
            >
              <Grid>
                <IconButton sx={{ padding: 0 }}>
                  <SvgIcon viewBox="0 0 24 24">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <circle cx="12" cy="12" r="11" stroke="#393A4B" />
                    </svg>
                  </SvgIcon>
                </IconButton>
              </Grid>
              <Grid sx={{ marginLeft: '24px', width: '100%' }}>
                <StyledTypography>{`${todoItem.name}`}</StyledTypography>
              </Grid>
              <Grid>
                <IconButton
                  sx={{ padding: 0 }}
                  onClick={() => onDeleteTodoItem(todoItem.id)}
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
            <StyledDivider />
          </>
        );
      }}
    </Draggable>
  );
};
