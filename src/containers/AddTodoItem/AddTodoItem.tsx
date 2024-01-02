import React, { SyntheticEvent } from 'react';
import { Grid, IconButton, SvgIcon, TextField, styled } from '@mui/material';
import icon_oval from '../../assets/icon_oval.svg';
import { useSaveTodoItem } from '../../hooks/useSaveTodoItem';

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  [`.MuiOutlinedInput-input`]: {
    boxSizing: 'inherit',
    padding: '0',
    color: theme.palette.text.primary,
    fontFamily: 'Josefin Sans',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    letterSpacing: '-0.25px',
  },
  [`fieldset`]: {
    borderColor: 'unset',
    borderStyle: 'unset',
  },
}));

export const AddTodoItem = () => {
  const { handleAddTodoItem } = useSaveTodoItem();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      console.log(e.target.value);
      const todoItemData = {
        name: e.target.value,
        category: ['Home'],
        date: new Date(),
        status: 'ACTIVE',
        userRef: 'jENYRqc3NjO1IGZ2n54O6Lh61ki1',
      };

      console.log({ todoItemData });
      handleAddTodoItem(todoItemData);
    }
  };

  return (
    <Grid
      mt={6}
      container
      display="flex"
      sx={{
        width: '540px',
        height: '64px',
        borderRadius: '5px',
        bgcolor: 'background.paper',
        boxShadow: '0px 35px 50px -15px rgba(0, 0, 0, 0.50)',
        padding: '0 24px',
      }}
    >
      <Grid
        item
        display="flex"
        alignItems="center"
        sx={{ width: '492px', height: '64px', flexShrink: '0' }}
      >
        <Grid>
          <IconButton sx={{ padding: 0 }}>
            <SvgIcon viewBox="0 0 24 24">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="11" stroke="#393A4B" />
              </svg>
            </SvgIcon>
          </IconButton>
        </Grid>
        <Grid sx={{ marginLeft: '24px', width: '100%' }}>
          <StyledTextField onKeyDown={handleKeyDown} />
        </Grid>
      </Grid>
    </Grid>
  );
};
