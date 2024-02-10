import { useEffect, useState } from 'react';
import {
  Grid,
  IconButton,
  SvgIcon,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Draggable } from 'react-beautiful-dnd';

const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.between('xs', 'sm')]: {
    fontFamily: 'Josefin Sans',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    letterSpacing: '-0.17px',
  },
  [theme.breakpoints.up('sm')]: {
    fontFamily: 'Josefin Sans',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    letterSpacing: '-0.25px',
  },
}));

const StyledDivider = styled('div')(({ theme }) => ({
  [theme.breakpoints.between('xs', 'sm')]: {
    width: '327px',
    height: '1px',
    flexShrink: '0',
    background: theme.palette.divider,
  },
  [theme.breakpoints.up('sm')]: {
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
  mobileView: boolean;
  onDeleteTodoItem: (id: string) => Promise<void>;
  onUpdateStatus: (todoItem: TodoItem) => void;
};

export const TodoItem = ({
  todoItem,
  index,
  onDeleteTodoItem,
  onUpdateStatus,
  mobileView,
}: TodoItemsListProps) => {
  const [isHover, setIsHover] = useState(false);
  const [displayGradient, setDisplayGradient] = useState(false);
  const theme = useTheme();

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

  const GradientUnCheckedWithIcon = () => (
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
      <RadioButtonUncheckedOutlinedIcon
        sx={{
          fill: displayGradient
            ? 'url(#paint0_linear_0_144)'
            : theme.palette.text.disabled,
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
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              draggable={true}
              sx={{
                width: mobileView ? '327px' : '540px',
                height: '64px',
                flexShrink: '0',
                padding: '0 24px',
              }}
            >
              <Grid>
                <StyledIconButton
                  onMouseEnter={() => setDisplayGradient(true)}
                  onMouseLeave={() => setDisplayGradient(false)}
                  sx={{
                    ...(todoItem.status === 'COMPLETED' && {
                      backgroundColor: 'white',
                      '&:hover': {
                        backgroundColor: 'white',
                      },
                    }),
                  }}
                  onClick={() => onUpdateStatus(todoItem)}
                >
                  <SvgIcon viewBox="0 0 24 24">
                    {todoItem.status === 'COMPLETED' ? (
                      <GradientOpenWithIcon />
                    ) : (
                      <GradientUnCheckedWithIcon />
                    )}
                  </SvgIcon>
                </StyledIconButton>
              </Grid>
              <Grid sx={{ marginLeft: '24px', width: '100%' }}>
                <StyledTypography
                  sx={{
                    color: (theme) =>
                      todoItem.status === 'COMPLETED'
                        ? theme.palette.text.disabled
                        : theme.palette.text.primary,
                    textDecorationLine:
                      todoItem.status === 'COMPLETED' && 'line-through',
                  }}
                >{`${todoItem.name}`}</StyledTypography>
              </Grid>
              <Grid>
                {(isHover || mobileView) && (
                  <IconButton
                    sx={{ padding: 0 }}
                    onClick={() => onDeleteTodoItem(todoItem.id)}
                  >
                    <CloseOutlinedIcon
                      sx={{ color: (theme) => theme.palette.grey.A100 }}
                    />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            <StyledDivider />
          </>
        );
      }}
    </Draggable>
  );
};
