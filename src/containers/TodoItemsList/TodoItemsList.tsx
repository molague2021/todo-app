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

import { TodoItem } from '../TodoItem/TodoItem';
import { useTodoItems } from '../../hooks/useTodoItems';

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
  const { todoItems } = useTodoItems();

  return (
    <>
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
        {todoItems?.map((item) => {
          return <TodoItem todoItem={item} />;
        })}
        <Grid
          item
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
    </>
  );
};
