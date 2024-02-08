import { useState, useEffect } from 'react';
import { createTheme, useTheme } from '@mui/material/styles';

export const useToggleColorMode = () => {
  const firstTheme = useTheme();
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [theme, setTheme] = useState(firstTheme);

  const toggleColorMode = () => {
    setMode((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const newTheme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 431,
          lg: 1200,
          md: 900,
          xl: 1536,
        },
      },
      palette: {
        mode,
        grey: {
          ...theme.palette.grey,
          A100: mode === 'light' ? '#494C6B' : '#5B5E7E',
        },
        background: {
          default: mode === 'light' ? '#FAFAFA' : '#171823',
          paper: mode === 'light' ? '#FFF' : '#25273D',
        },
        text: {
          primary: mode === 'light' ? '#393A4B' : '#C8CBE7',
          secondary: mode === 'light' ? '#9495A5' : '#5B5E7E',
          disabled: mode === 'light' ? '#D1D2DA' : '#4D5067',
        },
        divider: mode === 'light' ? '#E3E4F1' : '#393A4B',
      },
    });

    setTheme(newTheme);
  }, [mode]);

  return { toggleColorMode, theme, mode };
};
