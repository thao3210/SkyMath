import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import CourseTestService from 'src/services/CourseTestServices';

import Iconify from 'src/components/iconify';
import CustomSnackbar from 'src/components/snackbar/snackbar';

const AddCourseTestForm = ({ courseId, onAddSuccess }) => {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [name, setName] = useState('');
  const [timeLimit, setTime] = useState(0);

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const credentials = {
      name,
      timeLimit,
      courseId,
    };
    console.log(courseId);
    try {
      const response = await CourseTestService.addCourseTest(credentials);
      if (response.status === 201) {
        showAlert('success', 'Add test successful!');
        onAddSuccess();
      } else {
        showAlert('success', 'Add test successful.');
        onAddSuccess();
        console.error('Failed to add test:', response.status);
      }
    } catch (error) {
      console.error('Failed to add test:', error);
      console.error('Server response:', error.response?.data);
      showAlert('error', 'An error occurred while adding the test.');
    }
  };

  return (
    <Stack spacing={3} width="40%" marginBottom={3}>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />

      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
        name="name"
      />

      <TextField
        id="outlined-basic"
        label="Time Limit"
        variant="outlined"
        onChange={(e) => setTime(e.target.value)}
        name="time"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Add Course Test
      </Button>
    </Stack>
  );
};
AddCourseTestForm.propTypes = {
  courseId: PropTypes.any,
  onAddSuccess: PropTypes.any,
};
export default AddCourseTestForm;
