import { useState, useEffect } from 'react';
import { Grid, Typography, Button, styled } from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
  [`&.MuiButton-root`]: {
    // [`:active`]: {
    //   color: '#3A7CFD',
    // },
    // [`:focus`]: {
    //   color: '#3A7CFD',
    // },
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
  // [`&.MuiButton-root:hover`]: {
  //   color: '#3A7CFD',
  // },
  // [`&.MuiButton-root:focus`]: {
  //   color: '#3A7CFD',
  // },
  // [`&.MuiButton-root:active`]: {
  //   color: '#3A7CFD',
  // },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '136px',
    padding: 0,
    height: '26px',
    flexShrink: '0',
  },
}));

export const FilterButton = ({ option, filtersRef, onFilterClick }) => {
  console.log({ option });
  const [active, setActive] = useState(option.active);
  const handleFilter = () => {
    const filteredOption = {
      ...option,
      active: !active,
    };
    console.log({ filteredOption });
    onFilterClick(filteredOption);
    setActive((prevState) => !prevState);
  };
  useEffect(() => {
    setActive(option.active);
  }, [option.active]);
  console.log(active);
  return (
    <StyledButton
      onClick={() => handleFilter()}
      sx={{
        ...(active && {
          [`&.MuiButton-root`]: {
            color: '#3A7CFD',
          },
          //   [`&.MuiButton-root:focus`]: {
          //     color: '#3A7CFD',
          //   },
          //   [`&.MuiButton-root:active`]: {
          //     color: '#3A7CFD',
          //   },
        }),
      }}
    >
      {option.label}
    </StyledButton>
  );
};
