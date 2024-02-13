import {
  Grid,
  IconButton,
  SvgIcon,
  TextField,
  styled,
  useTheme,
} from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.between('xs', 'sm')]: {
    [`.MuiOutlinedInput-input`]: {
      boxSizing: 'inherit',
      padding: '0',
      color: theme.palette.text.primary,
      fontFamily: 'Josefin Sans',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 'normal',
      letterSpacing: '-0.17px',
    },
  },
  [theme.breakpoints.up('sm')]: {
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
  },

  [`fieldset`]: {
    borderColor: 'unset',
    borderStyle: 'unset',
  },
}));

export const AddTodoItem = ({
  onAddTodoItem,
  todoItemName,
  onNameChange,
  mobileView,
}) => {
  const theme = useTheme();
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      onAddTodoItem();
    }
  };

  return (
    <Grid
      container
      display="flex"
      sx={{
        marginTop: mobileView ? '30px' : '48px',
        width: mobileView ? '327px' : '540px',
        height: mobileView ? '48px' : '64px',
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
        sx={{
          width: mobileView ? '280px' : '492px',
          height: mobileView ? '48px' : '64px',
          flexShrink: '0',
        }}
      >
        <Grid>
          <IconButton sx={{ padding: 0 }} disabled>
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
          <StyledTextField
            onKeyDown={handleKeyDown}
            value={todoItemName}
            placeholder="Create a new todo..."
            onChange={(e) => onNameChange(e.target.value)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
