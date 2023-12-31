import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

export const useToggleColorMode = () => {
  const firstTheme = useTheme();
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [theme, setTheme] = useState(firstTheme);

  const toggleColorMode = () => {
    setMode((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const newTheme = createTheme({
      palette: {
        mode,
        background: {
          default: mode === 'light' ? '#FAFAFA' : '#171823',
          paper: mode === 'light' ? '#FFF' : '#25273D',
        },
        text: {
          primary: mode === 'light' ? '#393A4B' : '#C8CBE7',
          secondary: mode === 'light' ? '#9495A5' : '#5B5E7E',
          disabled: mode === 'light' ? '#9495A5' : '#767992',
        },
        divider: mode === 'light' ? '#E3E4F1' : '#393A4B',
      },
    });

    setTheme(newTheme);
  }, [mode]);

  return { toggleColorMode, theme, mode };
};
