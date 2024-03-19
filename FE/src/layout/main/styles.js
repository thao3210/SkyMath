// theme.js
import { createTheme } from '@mui/material/styles';

const styles = createTheme({
    typography: {
        fontFamily: 'Quicksand, sans-serif',
    },

    MuiButton: {
        mx: 1,
        mt: "-200px",
        // '&.Mui-disabled': {
        //     pointerEvents: 'auto', 
        //     cursor: 'pointer', 
        // },
    },
    IconButton:{
        fontSize: 50,

    }
});

export default styles;
