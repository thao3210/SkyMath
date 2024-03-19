import * as yup from 'yup';
import { Formik } from "formik";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Stack, Paper, Button, TextField, Typography, Breadcrumbs } from '@mui/material';

import LoadingPage from 'src/pages/loading_page';
import NewsServices from 'src/services/NewsServices';

import Link from 'src/components/link';
import CustomSnackbar from 'src/components/snackbar/snackbar';

const initialValues = {
    title: '',
}

const AddNewsView = () => {
    const navigate = useNavigate();

    const [imagePreview, setImagePreview] = useState(null);

    const [image, setImage] = useState(null);

    const [overview, setOverview] = useState("");

    const [content, setContent] = useState("");

    const [listImage, setListImage] = useState([]);

    const [listImagePreview, setListImagePreview] = useState(null);

    const [alertMessage, setAlertMessage] = useState(null);

    const [alertSeverity, setAlertSeverity] = useState('success');

    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleListFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setListImage([...listImage, file]);
                setListImagePreview([...listImagePreview, reader.result]);
            };
            reader.readAsDataURL(file);
        }
    };

    const validationSchema = yup.object().shape({
        title: yup.string().required('This is a required field'),
    });

    const handleAddNews = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            formData.append('newsAndEvent.Title', values.title);
            formData.append('newsAndEvent.Overview', overview);
            formData.append('newsAndEvent.Content', content);
            formData.append('Image', image);
            formData.append('files', listImage);

            const response = await NewsServices.addNews(formData);

            if (response.status === 201) {
                localStorage.setItem('newNewsAdded', 'true');
                navigate('/news');
            } else {
                setAlertSeverity('error');
                setAlertMessage('Cannot add news. Have something wrong!');
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error adding news:', error.message);
            setAlertSeverity('error');
            setAlertMessage('Cannot add news. Have something wrong!');
            setIsModalOpen(true);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancelNews = (e) => {
        navigate('/news')
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Formik
            onSubmit={handleAddNews}
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

                            <Link href="/news">
                                <Typography variant="h5">News</Typography>
                            </Link>

                            <Typography variant="h5" color="text.primary">Add News</Typography>
                        </Breadcrumbs>
                    </Stack>
                    <form onSubmit={handleSubmit}>
                        {isSubmitting ? <LoadingPage />
                            : <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={3} >
                                    <Grid xs={6} md={4}>
                                        <Typography variant="h6" gutterBottom>
                                            Form Add News
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Title, Overview, Content,...
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
                                                    label="News and Events Title"
                                                    variant="outlined"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.title ? values.title : ""}
                                                    name="title"
                                                    error={!!touched.title && !!errors.title}
                                                    helperText={touched.title && errors.title}
                                                />
                                                <Typography variant='h6'>Overview</Typography>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    config={{ placeholder: "Enter overview here ..." }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setOverview(data);
                                                    }}
                                                />

                                                <Typography variant='h6'>Content</Typography>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    config={{ placeholder: "Enter content here ..." }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setContent(data);
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
                                                    <Grid xs={6} sx={{ pr: 0 }}>
                                                        <Box>
                                                            <Typography variant='h6'>Files</Typography>
                                                            <Stack direction="column" spacing={2}>
                                                                {listImagePreview && listImagePreview.map((file, index) => (
                                                                    <img
                                                                        key={index}
                                                                        src={file}
                                                                        alt={`Preview ${index + 1}`}
                                                                        style={{ maxWidth: 350, maxHeight: 350, borderRadius: 4 }}
                                                                    />
                                                                ))}
                                                                <Button
                                                                    variant="contained"
                                                                    component="label"
                                                                    color="success"
                                                                    startIcon={<CloudUploadIcon />}
                                                                >
                                                                    Upload File
                                                                    <input
                                                                        type="file"
                                                                        hidden
                                                                        onChange={handleListFileChange}
                                                                        multiple  
                                                                    />
                                                                </Button>
                                                            </Stack>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
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
                                                onClick={handleCancelNews}
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
                                    open={isModalOpen}
                                    onClose={handleCloseModal}
                                    message={alertMessage}
                                    severity={alertSeverity} />

                            </Box>}
                    </form>
                </>

            )}

        </Formik>
    );
}

export default AddNewsView;