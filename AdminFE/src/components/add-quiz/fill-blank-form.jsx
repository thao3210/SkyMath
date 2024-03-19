import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import { Box, Button, TextField } from '@mui/material';

import FillBlankService from 'src/services/FillBlankService';

import Iconify from 'src/components/iconify';

import CustomSnackbar from '../snackbar/snackbar';

const FillBlankForm = ({
  difficulty,
  selectedQuizThematic,
  exerciseId,
  handleAddQuizToExercise,
  courseTestId,
  handleAddQuizToCourseTest,
}) => {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [prompt, setPrompt] = useState('');
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [errors, setErrors] = useState({ prompt: false, question: false });

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || !question.trim()) {
      setErrors({ prompt: !prompt.trim(), question: !question.trim() });
      return;
    }

    const formattedQuestion = question.replace(/_/g, '<input>');

    const credentials = {
      prompt,
      question: formattedQuestion,
      answer: answers,
      quizThematicId: selectedQuizThematic,
      difficultyId: difficulty,
    };
    try {
      const response = await FillBlankService.addQuiz(credentials);
      if (response.status === 200) {
        showAlert('success', 'Add quiz successful!');
        if (exerciseId !== undefined) {
          const quizId = response.data;
          await handleAddQuizToExercise(quizId);
        }
        else if (courseTestId !== undefined) {
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

  const handleQuestionChange = (e) => {
    const questionText = e.target.value;
    const blankCount = (questionText.match(/_/g) || []).length;
    const initialAnswers = Array(blankCount).fill('');
    setQuestion(questionText);
    setAnswers(initialAnswers);
    setErrors({ ...errors, question: !questionText.trim() });
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  return (
    <Stack spacing={2} width="60%">
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
      <TextField
        label="Prompt"
        variant="outlined"
        onChange={(e) => setPrompt(e.target.value)}
        name="prompt"
        error={errors.prompt}
        helperText={errors.prompt ? 'Prompt is required' : ''}
      />

      <TextField
        id="outlined-basic"
        label="Question"
        variant="outlined"
        multiline
        rows={4}
        onChange={handleQuestionChange}
        name="question"
        error={errors.question}
        helperText={errors.question ? 'Question is required' : ''}
      />

      {answers.map((answer, index) => (
        <TextField
          key={`answer-${index}`}
          id={`answer-${index}`}
          label={`Answer ${index + 1}`}
          variant="outlined"
          value={answer}
          onChange={(e) => handleAnswerChange(index, e.target.value)}
        />
      ))}
      <Box display="flex" justifyContent="flex-start" sx={{ pt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="success"
          onClick={handleAdd}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add Question
        </Button>
      </Box>
    </Stack>
  );
};

FillBlankForm.propTypes = {
  difficulty: PropTypes.string.isRequired,
  selectedQuizThematic: PropTypes.any.isRequired,
  exerciseId: PropTypes.any,
  handleAddQuizToExercise: PropTypes.any,
  courseTestId: PropTypes.any,
  handleAddQuizToCourseTest: PropTypes.any,
};

export default FillBlankForm;
