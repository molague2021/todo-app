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
        },
      },
    });

    setTheme(newTheme);
  }, [mode]);

  return { toggleColorMode, theme, mode };
};
