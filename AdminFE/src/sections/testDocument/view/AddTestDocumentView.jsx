import * as yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Grid, Stack, Button, Checkbox, TextField, FormControlLabel } from '@mui/material';

import LoadingPage from 'src/pages/loading_page';
import TestDocumentService from 'src/services/TestDocumentService';

// import Iconify from 'src/components/iconify';
import CustomSnackbar from 'src/components/snackbar/snackbar';

const AddTestDocumentForm = ({ onClose, selectedGrade, selectedSubject, year, provinceId }) => {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedContentSolveFile, setSelectedContentSolveFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedContentSolveFileName, setSelectedContentSolveFileName] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const handleChangeCheckBox = (event) => {
    setIsChecked(event.target.checked);
  };

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedFileName(file.name);
  };
  const handleContentSolveFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedContentSolveFile(file);
    setSelectedContentSolveFileName(file.name);
  };

  const handleAdd = async (values, { setSubmitting }) => {
    const formData = new FormData();
    try {
      formData.append('Name', values.name);
      formData.append('Description', values.description);
      formData.append('Content', selectedFile);
      formData.append('ContentSolve', selectedContentSolveFile);
      formData.append('Price', values.price);
      formData.append('Year', year);
      formData.append('IsFree', values.isFree);
      formData.append('GradeId', selectedGrade);
      formData.append('SubjectId', selectedSubject);
      formData.append('ProvinceId', provinceId);

      const response = await TestDocumentService.addTestDocument(formData);

      if (response && response.status === 200) {
        onClose();
        showAlert('success', 'Test Document added successfully!');
      } else {
        showAlert('error', 'An error occurred while adding the document.');
      }
    } catch (error) {
      console.error('Failed to add document:', error);
      console.error('Server response:', error.response?.data);
      showAlert('error', 'An error occurred while adding the document.');
    } finally {
      console.log('Submitting finished');
      setSubmitting(false);
    }
  };

  const initialValues = {
    name: '',
    description: '',
    price: '',
    year: '',
    isFree: false,
    gradeId: '',
    subjectId: '',
    provinceId: '',
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('This is a required field'),
    description: yup.string().required('This is a required field'),
    price: yup.number().required('This is a required field'),
    year: yup.number().required('This is a required field'),
    isFree: yup.boolean(),
    gradeId: yup.string().required('This is a required field'),
    subjectId: yup.string().required('This is a required field'),
    provinceId: yup.string().required('This is a required field'),
  });

  return (
    <>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />

      <Formik
        onSubmit={handleAdd}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {isSubmitting ? (
              <LoadingPage />
            ) : (
              <Stack>
                <Box justifyContent="flex-start" sx={{ pt: 2 }}>
                  <Box display="flex">
                    <TextField
                      sx={{ m: 2, width: 300 }}
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                    <TextField
                      sx={{ m: 2, width: 300 }}
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      name="description"
                      error={!!touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                    />
                    <TextField
                      sx={{ m: 2, width: 300 }}
                      id="outlined-basic"
                      label="Price"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.price}
                      name="price"
                      type="number"
                      error={!!touched.price && !!errors.price}
                      helperText={touched.price && errors.price}
                    />
                    <FormControlLabel
                      sx={{ ml: 7, mt: 2 }}
                      control={<Checkbox checked={isChecked} onChange={handleChangeCheckBox} />}
                      label="Is Free"
                    />
                  </Box>
                  <Box display="flex" sx={{ my: 2 }}>
                    <Grid item xs={6} sx={{ ml: 3 }}>
                      <Typography variant="h6">Content</Typography>
                      <Stack direction="column" spacing={2}>
                        <Button
                          sx={{ width: 18, height: 18, background: 'transparent' }}
                          variant="contained"
                          component="label"
                        >
                          <CloudUploadIcon sx={{ width: 18, color: 'orange' }} />
                          <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                            accept="application/pdf"
                          />
                        </Button>
                        {selectedFileName && <Typography>{selectedFileName}</Typography>}
                      </Stack>
                    </Grid>
                    <Grid item xs={2} sx={{ ml: 10 }}>
                      <Typography variant="h6">Content Solve</Typography>
                      <Stack direction="column" spacing={2} sx={{ pl: 3 }}>
                        <Button
                          sx={{ width: 18, height: 18, background: 'transparent' }}
                          variant="contained"
                          component="label"
                        >
                          <CloudUploadIcon sx={{ width: 18, color: 'orange' }} />
                          <input
                            type="file"
                            hidden
                            onChange={handleContentSolveFileChange}
                            accept="application/pdf"
                          />
                        </Button>
                        {selectedContentSolveFileName && (
                          <Typography>{selectedContentSolveFileName}</Typography>
                        )}
                      </Stack>
                    </Grid>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="flex-start" sx={{ pt: 2 }}>
                  <Button fullWidth type="submit" variant="contained" color="success">
                    Add Test Document
                  </Button>
                </Box>
                <Button onClick={onClose} color="primary">
                  Close
                </Button>
              </Stack>
            )}
          </form>
        )}
      </Formik>
    </>
  );
};

AddTestDocumentForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedGrade: PropTypes.any.isRequired,
  selectedSubject: PropTypes.any.isRequired,
  year: PropTypes.any.isRequired,
  provinceId: PropTypes.any.isRequired,
};

export default AddTestDocumentForm;
