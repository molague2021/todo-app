import React, { useState } from 'react';
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
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

const StyledIconButton = styled(IconButton)`
  padding: 0;
  border-radius: 20px;
  height: 20px;
  width: 20px;
`;
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
  const [isHover, setIsHover] = useState(false);
  const GradientOpenWithIcon = () => (
    <>
      <svg width={0} height={0}>
        <linearGradient
          id="paint0_linear_0_144"
          x1="-12"
          y1="12"
          x2="12"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#55DDFF" />
          <stop offset="1" stop-color="#C058F3" />
        </linearGradient>
      </svg>
      <CheckCircleIcon
        sx={{
          fill: 'url(#paint0_linear_0_144)',
        }}
      />
    </>
  );

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
                <StyledIconButton
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                  sx={{
                    ...(todoItem.status === 'COMPLETED' && {
                      backgroundColor: 'white',
                      '&:hover': {
                        backgroundColor: 'white',
                      },
                    }),
                  }}
                >
                  <SvgIcon viewBox="0 0 24 24">
                    {todoItem.status === 'COMPLETED' ? (
                      <GradientOpenWithIcon />
                    ) : (
                      <RadioButtonUncheckedOutlinedIcon
                        sx={{
                          fill: isHover && 'url(#paint0_linear_0_144)',
                        }}
                      />
                    )}
                  </SvgIcon>
                </StyledIconButton>
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
