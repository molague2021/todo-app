import { useEffect } from 'react';
import {
  Grid,
  Box,
  Stack,
  IconButton,
  Typography,
  SvgIcon,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';

export const setBodyColor = (color) => {
  document.body.style.backgroundColor = color;
};
interface HeaderProps {
  toggleColorMode: () => void;
  mode: string;
  mobileView: boolean;
}

export const Header = ({ toggleColorMode, mode, mobileView }: HeaderProps) => {
  useEffect(() => {
    setBodyColor(mode === 'light' ? '#FAFAFA' : '#171823');
  }, [mode]);

  return (
    <Grid
      display="flex"
      justifyContent="space-between"
      sx={{
        minWidth: mobileView ? '335px' : '540px',
        height: mobileView ? '20px' : '42px',
      }}
    >
      <Stack>
        <Typography
          sx={{
            fontFamily: 'Josefin Sans',
            fontSize: mobileView ? '20px' : '40px',
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
        <IconButton
          size="small"
          sx={{ padding: mobileView && '0px' }}
          onClick={() => toggleColorMode()}
        >
          {mode !== 'light' ? (
            <LightModeIcon
              sx={{ fontSize: !mobileView && '26px', color: '#FFF' }}
            />
          ) : (
            <SvgIcon viewBox="0 0 26 26">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={mobileView ? '20px' : '26px'}
                height={mobileView ? '20px' : '26px'}
              >
                <path
                  fill="#FFF"
                  fill-rule="evenodd"
                  d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
                />
              </svg>
            </SvgIcon>
          )}
        </IconButton>
      </Stack>
    </Grid>
  );
};
