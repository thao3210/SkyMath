// theme.js
import { createTheme } from '@mui/material/styles';

const styles = createTheme({
  typography: {
    fontFamily: 'Quicksand, sans-serif',
    fontSize: 16,
  },
  box: {
    '&:hover': {
      color: '#398edc',
    },
    display:'flex',
    marginRight: '10px',
  }
});

export default styles;
