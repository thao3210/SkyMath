import React, { useEffect, useState } from 'react';
import { BrowserRouter as Link, useParams } from 'react-router-dom';
import { Box, Grid, Paper, Typography, ThemeProvider, Link as MuiLink } from '@mui/material';
import TeacherServices from '../../services/TeacherService';
import CardTeacherMini from '../../components/Card/CardTeacherMini';
import styles from './styles';

const DetailTeacher = () => {
    const { id } = useParams();

    const [teachers, setTeachers] = useState([]);
    const [detailTeacher, setDetailTeacher] = useState(null);

    const fetchDetailTeacher = async () => {
        try {
            const response = await TeacherServices.getTeacherById(id);
            if (response && response.data) {
                setDetailTeacher(response.data);
            } else {
                console.error('Teacher no data');
            }
        } catch (error) {
            console.error('Error get teacher information', error);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await TeacherServices.getListTeacher();
            if (response && response.data) {
                setTeachers(response.data);
            } else {
                console.error('Teacher no data');
            }
        } catch (error) {
            console.error('Error get teacher information', error);
        }
    };

    useEffect(() => {
        fetchDetailTeacher();
        fetchTeachers();
    }, [id]);

    return (
        <ThemeProvider theme={styles}>
            <Box sx={{ backgroundColor: '#f0f0f0', maxWidth: '100%', height: '100%', padding: 5 }}>
                <Paper elevation={3} sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            {detailTeacher && (
                                <Box>
                                    <Typography variant="h4" sx={{ mt: 3, mb: 1, fontWeight: "bold" }}>{detailTeacher.name}</Typography>
                                    <MuiLink
                                        component={Link}
                                        to="/"
                                        underline="hover"
                                        sx={{ color: '#007BFF', '&:hover': { color: '#032952' } }}
                                    >
                                        Chia sẻ
                                    </MuiLink>
                                    <Box
                                        sx={{
                                            borderBottom: "1px solid #c9cfd4",
                                            paddingTop: 2,
                                            width: "98%",
                                        }}
                                    ></Box>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        sx={{
                                            pt: 2,
                                            px: 2
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={detailTeacher.avatar}
                                            alt={detailTeacher.name}
                                            sx={styles.ImageTeacher}
                                        />
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            sx={{
                                                pl: 3,
                                                pr: 1
                                            }}
                                        >
                                            <Typography variant="body1">
                                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Nơi làm việc</Typography>
                                                {detailTeacher.workPlace}
                                            </Typography>
                                            <Typography variant="body1">
                                                <Typography variant="h6" sx={{ fontWeight: "bold", pt: 2 }}>Mô tả</Typography>
                                                {detailTeacher.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h4" sx={{ mt: 3, mb: 3, fontWeight: "bold", color: '#FF5733' }}>Giáo viên khác</Typography>
                            {teachers.map((teacher, index) => (
                                <CardTeacherMini
                                    key={teacher.id}
                                    teacher={teacher}
                                    isLastItem={index === teachers.length - 1}
                                />
                            ))}

                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </ThemeProvider >
    );
};

export default DetailTeacher;
