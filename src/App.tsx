import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import {
  Grid,
  Box,
  Stack,
  IconButton,
  Typography,
  styled,
  Button,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import { collection, getDoc, doc, getDocs } from 'firebase/firestore';

import { db } from './firebase.config';
import { Header } from './components/Header';
import { TodoItem } from './containers/TodoItem/TodoItem';
import { TodoItemsList } from './containers/TodoItemsList/TodoItemsList';
import bgdesktopdark from './assets/bg-desktop-dark.jpg';
import { useToggleColorMode } from './hooks/useToggleColorMode';
import { AddTodoItem } from './containers/AddTodoItem/AddTodoItem';

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
interface TodoItem {
  category: string[];
  date: Date;
  name: string;
  status: string;
}

export const App = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>();
  const { toggleColorMode, theme, mode } = useToggleColorMode();
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const docRef = collection(db, 'todoItems');

        const docSnap = await getDocs(docRef);

        let items: TodoItem[] = [];
        docSnap.forEach((doc) => {
          console.log(doc.data());
          items.push({
            category: doc.data().category,
            date: doc.data().date,
            name: doc.data().name,
            status: doc.data().status,
          });
        });
        setTodoItems(items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodo();
  }, []);

  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          alignItems: 'flex-start',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Grid
          container
          flexDirection="column"
          sx={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          <Grid sx={{ position: 'relative' }}>
            <img
              src={bgdesktopdark}
              style={{ width: '100%', height: '300px' }}
            />
          </Grid>
          <Grid
            sx={{
              position: 'absolute',
              zIndex: '2',
              height: '100%',
              width: '100%',
              maxWidth: '1440px',
              margin: 'auto',
              padding: '70px 450px',
            }}
          >
            <Header toggleColorMode={toggleColorMode} mode={mode} />
            <AddTodoItem />
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
                return <TodoItemsList todoItem={item} />;
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
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
