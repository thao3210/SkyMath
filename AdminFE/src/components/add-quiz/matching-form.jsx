import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import MatchingService from 'src/services/MatchingServices';

import Iconify from 'src/components/iconify';

import CustomSnackbar from '../snackbar/snackbar';

const MatchingForm = ({
  difficulty,
  selectedQuizThematic,
  exerciseId,
  handleAddQuizToExercise,
  courseTestId,
  handleAddQuizToCourseTest,
}) => {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [prompt, setPrompt] = useState('');
  const [errors, setErrors] = useState({ prompt: false, question: false });

  useEffect(() => {}, []);

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setErrors({ prompt: !prompt.trim() });
      return;
    }

    const credentials = {
      quizThematicId: selectedQuizThematic,
      difficultyId: difficulty,
      prompt,
    };
    try {
      const response = await MatchingService.addQuiz(credentials);
      if (response.status === 200) {
        showAlert('success', 'Add quiz successful!');
        if (exerciseId !== undefined) {
          const quizId = response.data;
          await handleAddQuizToExercise(quizId);
        } else if (courseTestId !== undefined) {
          const quizId = response.data;
          await handleAddQuizToCourseTest(quizId);
        }
      } else {
        showAlert('error', 'Add quiz failed!');
        console.error('Failed to add quiz:', response.status);
      }
    } catch (error) {
      console.error('Failed to add quiz:', error);
      console.error('Server response:', error.response?.data);
      showAlert('error', 'An error occurred while adding the quiz.');
    }
  };

  return (
    <Stack direction="column" spacing={3} sx={{ width: '50%' }}>
      <TextField
        id="outlined-basic"
        label="Prompt"
        variant="outlined"
        onChange={(e) => setPrompt(e.target.value)}
        name="prompt"
        error={errors.prompt}
        helperText={errors.prompt ? 'Prompt is required' : ''}
      />

      <Button
        variant="contained"
        color="success"
        onClick={handleAdd}
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Add Prompt
      </Button>

      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </Stack>
  );
};

MatchingForm.propTypes = {
  difficulty: PropTypes.any.isRequired,
  selectedQuizThematic: PropTypes.any.isRequired,
  exerciseId: PropTypes.any,
  handleAddQuizToExercise: PropTypes.any,
  courseTestId: PropTypes.any,
  handleAddQuizToCourseTest: PropTypes.any,
};

export default MatchingForm;
