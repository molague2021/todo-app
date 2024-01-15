import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Grid, Box } from '@mui/material';

import bgdesktopdark from './assets/bg-desktop-dark.jpg';
import { useToggleColorMode } from './hooks/useToggleColorMode';
import { TodoItemsListContainer } from './containers/TodoItemsList/TodoItemsListContainer';

export const App = () => {
  const { toggleColorMode, theme, mode } = useToggleColorMode();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          alignItems: 'flex-start',
          color: 'text.primary',
        }}
      >
        <Grid container flexDirection="column" sx={{ margin: '0 auto' }}>
          <Grid sx={{ position: 'relative' }}>
            <img
              src={bgdesktopdark}
              style={{ width: '100%', height: '300px' }}
            />
          </Grid>
          <TodoItemsListContainer
            toggleColorMode={toggleColorMode}
            mode={mode}
          />
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
