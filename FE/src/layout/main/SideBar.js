import React from 'react'
import { Typography, Box } from '@mui/material';

const SideBar = () => {
    return (
        <Box
            component="div"
            sx={{ border: '1px solid yellow', width: '30%' }}
        >
            <Box
                component="div"
                display="flex"
                justifyContent="center"
            >
                <Typography>Title</Typography>
            </Box>
        </Box>
    );
}

export default SideBar;