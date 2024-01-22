import { useState, useEffect } from 'react';
import { Button, styled } from '@mui/material';

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
  [theme.breakpoints.between('sm', 'md')]: {
    width: '136px',
    padding: 0,
    height: '26px',
    flexShrink: '0',
  },
}));

export const FilterButton = ({ option, onFilterClick }) => {
  const [active, setActive] = useState(option.active);
  const handleFilter = () => {
    const filteredOption = {
      ...option,
      active: !active,
    };
    onFilterClick(filteredOption);
    setActive((prevState) => !prevState);
  };
  useEffect(() => {
    setActive(option.active);
  }, [option.active]);
  return (
    <StyledButton
      onClick={() => handleFilter()}
      sx={{
        ...(active && {
          [`&.MuiButton-root`]: {
            color: '#3A7CFD',
          },
        }),
      }}
    >
      {option.label}
    </StyledButton>
  );
};
