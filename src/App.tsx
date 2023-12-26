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

import { Header } from './components/Header';
import { TodoItem } from './containers/TodoItem/TodoItem';
import { TodoItemsList } from './containers/TodoItemsList/TodoItemsList';
import bgdesktopdark from './assets/bg-desktop-dark.jpg';
import { useToggleColorMode } from './hooks/useToggleColorMode';
import { AddTodoItem } from './containers/AddTodoItem/AddTodoItem';
import { DragDropContext } from 'react-beautiful-dnd';

export const App = () => {
  const { toggleColorMode, theme, mode } = useToggleColorMode();

  return (
    <ThemeProvider theme={theme}>
      <DragDropContext>
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
              <TodoItemsList />
            </Grid>
          </Grid>
        </Box>
      </DragDropContext>
    </ThemeProvider>
  );
};
