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
  category: string[];
  date: Date;
  name: string;
  status: string;
}

type TodoItemsListProps = {
  todoItem: TodoItem;
};

export const TodoItem = ({ todoItem }: TodoItemsListProps) => {
  return (
    <>
      <Grid
        item
        display="flex"
        alignItems="center"
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
          <IconButton sx={{ padding: 0 }}>
            <CloseOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
      <StyledDivider />
    </>
  );
};
