import { ThemeProvider } from '@mui/material/styles';
import { Grid, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import bgdesktopdark from './assets/bg-desktop-dark.jpg';
import bgdesktoplight from './assets/bg-desktop-light.jpg';
import bgmobiledark from './assets/bg-mobile-dark.jpg';
import bgmobilelight from './assets/bg-mobile-light.jpg';
import { useToggleColorMode } from './hooks/useToggleColorMode';
import { TodoItemsListContainer } from './containers/TodoItemsList/TodoItemsListContainer';

export const App = () => {
  const { toggleColorMode, theme, mode } = useToggleColorMode();
  console.log({ theme });
  const mobileView = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  let bgImage;

  if (mobileView) {
    if (mode === 'dark') {
      bgImage = bgmobiledark;
    } else {
      bgImage = bgmobilelight;
    }
  } else {
    if (mode === 'dark') {
      bgImage = bgdesktopdark;
    } else {
      bgImage = bgdesktoplight;
    }
  }

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
              src={bgImage}
              style={{ width: '100%', height: mobileView ? '200px' : '300px' }}
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
