import * as React from 'react';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    CardMedia: {
        width: '11rem',
        height: '11rem',
        borderRadius: '50%',
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
        fontSize: 15,
        fontWeight: '400',
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

const CardTeacher = ({ teacher }) => {
    const detailPageLink = `/DetailTeacher/${teacher.id}`;
    return (
        <ThemeProvider theme={theme}>
            <Link to={detailPageLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card
                    sx={{
                        width: '290px',
                        height: '363px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: "none",
                        backgroundColor: "transparent",
                        boxShadow: "none"
                    }}
                >
                    <CardMedia
                        component="img"
                        alt={teacher.name}
                        src={teacher.avatar}
                        sx={theme.CardMedia}
                    />
                    <CardContent
                        sx={theme.CardContent}
                    >
                        <Typography gutterBottom variant="h5" component="div" sx={theme.typographyName}>
                            {teacher.name}
                        </Typography>
                        <Typography
                            gutterBottom
                            component="div"
                            sx={{ mt: '-5px' }}
                        >
                            {teacher.workPlace}
                        </Typography>
                        <Typography
                            component="div"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                lineHeight: '23px',
                                textAlign: 'center',
                                pt: 1
                            }}
                        >
                            {teacher.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </ThemeProvider>
    );
}

export default CardTeacher;