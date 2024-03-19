import * as yup from 'yup';
import { Formik } from "formik";
import { CompactPicker } from 'react-color';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Stack, Paper, Button, Select, MenuItem, TextField, Typography, InputLabel, FormControl, Breadcrumbs } from '@mui/material';

import LoadingPage from 'src/pages/loading_page';
import GradeServices from 'src/services/GradeServices';
import CourseServices from 'src/services/CourseServices';
import SubjectServices from 'src/services/SubjectServices';
import CurriculumServices from 'src/services/CurriculumServices';

import Link from 'src/components/link';
import CustomSnackbar from 'src/components/snackbar/snackbar';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const initialValues = {
    courseName: '',
}

const validationSchema = yup.object().shape({
    courseName: yup.string().required('This is a required field'),
});

const AddCourseView = () => {
    const navigate = useNavigate();

    const [grade, setGrade] = useState([]);

    const [curriculum, setCurriculum] = useState([]);

    const [subject, setSubject] = useState([]);

    const [imagePreview, setImagePreview] = useState(null);

    const [image, setImage] = useState(null);

    const [infomation, setInfomation] = useState("");

    const [colorCode, setColorCode] = useState('#ffffff');

    const [selectedGrade, setSelectedGrade] = useState('');

    const [selectedSubject, setSelectedSubject] = useState('');

    const [selectedCurriculum, setSelectedCurriculum] = useState('');

    const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

    const handleGradeChange = (event) => {
        setSelectedGrade(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };

    const handleCurriculumChange = (event) => {
        setSelectedCurriculum(event.target.value);
    };

    const handleColorChange = (color) => {
        setColorCode(color.hex);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchGradeData = async () => {
        try {
            const response = await GradeServices.getListGrade();
            // console.log("response data: ", response.data);
            if (response?.data && response?.status === 200) {
                setGrade(response.data);
            } else {
                console.error(response ?? 'Unexpected response structure');
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const fetchSubjectData = async () => {
        try {
            const response = await SubjectServices.getListSubject();
            // console.log("response data: ", response.data);
            if (response?.data && response?.status === 200) {
                setSubject(response.data);
            } else {
                console.error(response ?? 'Unexpected response structure');
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const fetchCurriculumData = async () => {
        try {
            const response = await CurriculumServices.getListCurriculum();
            // console.log("response data: ", response.data);
            if (response?.data && response?.status === 200) {
                setCurriculum(response.data);
            } else {
                console.error(response ?? 'Unexpected response structure');
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleAddCourse = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            formData.append('Name', values.courseName);
            formData.append('Infomation', infomation);
            formData.append('Image', image);
            formData.append('BackGroundColor', colorCode);
            formData.append('GradeId', selectedGrade);
            formData.append('SubjectId', selectedSubject);
            formData.append('CurriculumId', selectedCurriculum);

            const response = await CourseServices.addCourse(formData);

            if (response.status === 201) {
                localStorage.setItem('newCourseAdded', 'true');
                navigate('/course');
            } else {
                showAlert("error", "Have something error when add course!");
            }
        } catch (error) {
            console.error('Error adding course:', error.message);
            showAlert("error", "Have something error when add course!");
        } finally {
            setSubmitting(false);
        }
    };

    const showAlert = (severity, message) => {
        setAlert({ severity, message, isOpen: true });
    };

    const handleCloseAlert = () => {
        setAlert({ message: null, severity: 'success', isOpen: false });
    };

    const handleCancelCourse = (e) => {
        navigate('/course')
    };

    useEffect(() => {
        fetchGradeData();
        fetchCurriculumData();
        fetchSubjectData();
    }, []);

    return (
        <Formik
            onSubmit={handleAddCourse}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {({
                values,
                errors,
                touched,
                isSubmitting,
                handleBlur,
                handleChange,
                handleSubmit,
            }) => (
                <>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="large" />}
                            aria-label="breadcrumb"
                        >
                            <Link href="/">
                                <Stack direction="row" alignItems="center">
                                    <HomeRoundedIcon sx={{ mr: 0.5 }} fontSize="medium" />
                                    <Typography variant="h5">HomePage</Typography>
                                </Stack>
                            </Link>

                            <Link href="/course">
                                <Typography variant="h5">Course</Typography>
                            </Link>

                            <Typography variant="h5" color="text.primary">Add Course</Typography>
                        </Breadcrumbs>
                    </Stack>
                    <form onSubmit={handleSubmit}>
                        {isSubmitting ? <LoadingPage />
                            : <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={3} >
                                    <Grid xs={6} md={4}>
                                        <Typography variant="h6" gutterBottom>
                                            Form Add Course
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Course Name, Information, Images,...
                                        </Typography>
                                    </Grid>
                                    <Grid xs={6} md={8}>
                                        <Paper elevation={5}>
                                            <Stack
                                                direction="column"
                                                spacing={2}
                                                p={3}
                                                gap={1}
                                            >
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Course Name"
                                                    variant="outlined"
                                                    name="courseName"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.courseName ? values.courseName : ""}
                                                    error={!!touched.courseName && !!errors.courseName}
                                                    helperText={touched.courseName && errors.courseName}
                                                />
                                                <Typography variant='h6'>Information</Typography>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    config={{ placeholder: "Enter information here ..." }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setInfomation(data);
                                                    }}
                                                />
                                                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                                                    <Grid xs={6} sx={{ p: 0 }}>
                                                        <Box>
                                                            <Typography variant='h6'>Images</Typography>
                                                            <Stack direction="column" spacing={2}>
                                                                {imagePreview && (
                                                                    <img
                                                                        src={imagePreview}
                                                                        alt="Preview"
                                                                        style={{ maxWidth: 330, maxHeight: 330, borderRadius: 4 }}
                                                                    />
                                                                )}
                                                                <Button
                                                                    variant="contained"
                                                                    component="label"
                                                                    startIcon={<CloudUploadIcon />}
                                                                >
                                                                    Upload File
                                                                    <input
                                                                        type="file"
                                                                        hidden
                                                                        onChange={handleFileChange}
                                                                    />
                                                                </Button>
                                                            </Stack>
                                                        </Box>
                                                    </Grid>
                                                    <Grid xs={6}>
                                                        <Box>
                                                            <Typography variant='h6'>Color Code Upload</Typography>
                                                            <CompactPicker
                                                                color={colorCode}
                                                                onChangeComplete={handleColorChange}
                                                                style={{ maxWidth: 320, maxHeight: 320 }}
                                                            />
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2} columns={16}>
                                                    <Grid xs={8} sx={{ px: 0 }}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="select-grade-label">Grade</InputLabel>
                                                            <Select
                                                                labelId="select-grade-label"
                                                                id="grade-select"
                                                                value={selectedGrade}
                                                                onChange={handleGradeChange}
                                                                label="Grade"
                                                                MenuProps={MenuProps}
                                                            >
                                                                {grade.map((gradeOption) => (
                                                                    <MenuItem key={gradeOption.id} value={gradeOption.id}>
                                                                        {gradeOption.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid xs={8} sx={{ pr: 0 }}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="select-subject-label">Subject</InputLabel>
                                                            <Select
                                                                labelId="select-subject-label"
                                                                id="subject-select"
                                                                value={selectedSubject}
                                                                onChange={handleSubjectChange}
                                                                label="Subject"
                                                                MenuProps={MenuProps}
                                                            >
                                                                {subject.map((subjectOption) => (
                                                                    <MenuItem key={subjectOption.id} value={subjectOption.id}>
                                                                        {subjectOption.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>

                                                <FormControl fullWidth>
                                                    <InputLabel id="select-curriculum-label">Curriculum</InputLabel>
                                                    <Select
                                                        labelId="select-curriculum-label"
                                                        id="curriculum-select"
                                                        value={selectedCurriculum}
                                                        onChange={handleCurriculumChange}
                                                        label="Curriculum"
                                                        MenuProps={MenuProps}
                                                    >
                                                        {curriculum.map((curriculumOption) => (
                                                            <MenuItem key={curriculumOption.id} value={curriculumOption.id}>
                                                                {curriculumOption.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                    <Grid xs={6} md={4}>
                                        {null}
                                    </Grid>
                                    <Grid xs={6} md={8}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            spacing={2}
                                        >
                                            <Button
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="warning"
                                                onClick={handleCancelCourse}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Submit
                                            </Button>
                                        </Stack>

                                    </Grid>
                                </Grid>

                                <CustomSnackbar
                                    open={alert.isOpen}
                                    onClose={handleCloseAlert}
                                    message={alert.message}
                                    severity={alert.severity}
                                />
                                
                            </Box>}
                    </form>
                </>

            )}

        </Formik>
    );
}

export default AddCourseView;