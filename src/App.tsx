import React, { useEffect } from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { Grid, Box, Stack, IconButton, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import { collection, getDoc, doc, getDocs } from 'firebase/firestore';

import { db } from './firebase.config';
import bgdesktopdark from './assets/bg-desktop-dark.jpg';
import { useToggleColorMode } from './hooks/useToggleColorMode';

export const App = () => {
  const { toggleColorMode, theme } = useToggleColorMode();
  // useEffect(() => {
  //   const fetchTodo = async () => {
  //     try {
  //       const docRef = collection(db, 'todoItems');

  //       const docSnap = await getDocs(docRef);

  //       docSnap.forEach((doc) => {
  //         console.log(doc.data());
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchTodo();
  // }, []);

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
        <Grid container flexDirection="column">
          <Grid sx={{ position: 'relative' }}>
            <img src={bgdesktopdark} />
          </Grid>
          <Grid
            sx={{
              position: 'absolute',
              zIndex: '2',
              height: '100%',
              width: '100%',
              margin: 'auto',
              padding: '70px 425px',
            }}
          >
            <Grid display="flex" justifyContent="space-between">
              <Stack>
                <Typography
                  sx={{
                    fontFamily: 'Josefin Sans',
                    fontSize: '40px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: 'normal',
                    letterSpacing: '15px',
                    color: '#FFF',
                  }}
                >
                  TODO
                </Typography>
              </Stack>
              <Stack>
                <IconButton onClick={() => toggleColorMode()}>
                  <LightModeIcon sx={{ fontSize: '26px', color: '#FFF' }} />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
