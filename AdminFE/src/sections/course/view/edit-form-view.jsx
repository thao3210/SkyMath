import * as yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CompactPicker } from 'react-color';
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
import CourseServices from 'src/services/CourseServices';

import Link from 'src/components/link';
import CustomSnackbar from 'src/components/snackbar/snackbar';

const EditFormView = ({ initialValues }) => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [infomation, setInfomation] = useState(initialValues.infomation);

  const [imagePreview, setImagePreview] = useState(null);

  const [colorCode, setColorCode] = useState(initialValues.backGroundColor);

  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const validationSchema = yup.object().shape({
    name: yup.string().required('This is a required field'),
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImage(imageFile);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImage(null);
    }
  };

  const handleColorChange = (color) => {
    setColorCode(color.hex);
  };

  const handleEditCourse = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('Name', values.name);
      formData.append('Infomation', infomation);
      formData.append('Image', image ?? new File([initialValues.imageLink], 'imageLink.jpg'));
      formData.append('BackGroundColor', colorCode);

      const response = await CourseServices.editCourse(initialValues.id, formData);

      if (response.status === 204) {
        localStorage.setItem('editCourse', 'true');
        navigate('/course');
      } else {
        showAlert('error', 'Have something error when edit course!');
      }
    } catch (error) {
      console.error('Error editing course:', error.message);
      showAlert('error', 'Have something error when edit course!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelEdit = (e) => {
    navigate('/course');
  };

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  return (
    <Formik
      onSubmit={handleEditCourse}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit }) => (
        <>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="large" />} aria-label="breadcrumb">
              <Link href="/">
                <Stack direction="row" alignItems="center">
                  <HomeRoundedIcon sx={{ mr: 0.5 }} fontSize="medium" />
                  <Typography variant="h5">HomePage</Typography>
                </Stack>
              </Link>

              <Link href="/course">
                <Typography variant="h5">Course</Typography>
              </Link>

              <Typography variant="h5" color="text.primary">
                Edit Course
              </Typography>
            </Breadcrumbs>
          </Stack>
          <form onSubmit={handleSubmit}>
            {isSubmitting ? (
              <LoadingPage />
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                  <Grid xs={6} md={4}>
                    <Typography variant="h6" gutterBottom>
                      Form Edit Course
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Course Name, Information, Images,...
                    </Typography>
                  </Grid>
                  <Grid xs={6} md={8}>
                    <Paper elevation={5}>
                      <Stack direction="column" spacing={2} p={3} gap={1}>
                        <TextField
                          id="outlined-basic"
                          label="Course Name"
                          variant="outlined"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          name="name"
                          error={!!touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                        />
                        <Typography variant="h6">Information</Typography>
                        <CKEditor
                          editor={ClassicEditor}
                          config={{ placeholder: 'Enter information here ...' }}
                          data={infomation}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setInfomation(data);
                          }}
                        />
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                          <Grid xs={6} sx={{ p: 0 }}>
                            <Box>
                              <Typography variant="h6">Images</Typography>
                              <Stack direction="column" spacing={2}>
                                <img
                                  src={imagePreview ?? values.imageLink}
                                  alt="Preview"
                                  style={{ maxWidth: 330, maxHeight: 330, borderRadius: 4 }}
                                />
                                <Button
                                  variant="contained"
                                  component="label"
                                  startIcon={<CloudUploadIcon />}
                                >
                                  Upload File
                                  <input type="file" hidden onChange={handleFileChange} />
                                </Button>
                              </Stack>
                            </Box>
                          </Grid>
                          <Grid xs={6}>
                            <Box>
                              <Typography variant="h6">Color Code Upload</Typography>
                              <CompactPicker
                                color={colorCode}
                                onChangeComplete={handleColorChange}
                                style={{ maxWidth: 320, maxHeight: 320 }}
                              />
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
                    <Stack direction="row" justifyContent="space-between" spacing={2}>
                      <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="warning"
                        onClick={handleCancelEdit}
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
              </Box>
            )}
          </form>
        </>
      )}
    </Formik>
  );
};

EditFormView.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.any,
    imageLink: PropTypes.any,
    infomation: PropTypes.any,
    backGroundColor: PropTypes.any,
    subjectId: PropTypes.any,
    gradeId: PropTypes.any,
    curriculumId: PropTypes.any,
  }).isRequired,
};

export default EditFormView;
