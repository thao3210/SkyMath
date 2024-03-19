import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const styles = createTheme({
    CardMedia: {
        width: '6rem',
        height: '6rem',
        borderRadius: '2%',
        p: '5px'
    },
    CardContent: {
        color: '#0D3051',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: '0',
        "&:last-child": {
            paddingBottom: 0
        }
    },
    typography: {
        fontFamily: 'Quicksand, sans-serif',
    },
    typographyName: {
        fontFamily: 'Quicksand, sans-serif',
        fontWeight: 'bold',
        fontSize: 24,
        '&:hover': {
            color: 'salmon', // Màu cam khi hover
        },
    },
});


const CardTeacherMini = ({ teacher, isLastItem }) => {
    const detailPageLink = `/DetailTeacher/${teacher.id}`;
    return (
        <ThemeProvider theme={styles}>
            <Link to={detailPageLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card
                    sx={{
                        display: 'flex',
                        border: "none",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        paddingTop: 1
                    }}
                >
                    <CardMedia
                        component="img"
                        alt={teacher.name}
                        src={teacher.avatar}
                        sx={styles.CardMedia}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5" sx={styles.typographyName}>
                                {teacher.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {teacher.workPlace}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
                {!isLastItem && (
                    <Box
                        sx={{
                            borderBottom: "1px solid #c9cfd4",
                            paddingTop: 1,
                            width: "90%",
                        }}
                    ></Box>
                )}
            </Link>
        </ThemeProvider>
    );
}

export default CardTeacherMini;