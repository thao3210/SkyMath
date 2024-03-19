import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import ExerciseServices from 'src/services/ExerciseServices';
import CourseTestService from 'src/services/CourseTestServices';
import QuizThematicService from 'src/services/QuizThematicServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';
import MatchingForm from 'src/components/add-quiz/matching-form';
import FillBlankForm from 'src/components/add-quiz/fill-blank-form';
import TrueFalseQuizForm from 'src/components/add-quiz/true-false-form';
import MultipleChoiceForm from 'src/components/add-quiz/multiple-choice-form';

const AddQuizForm = ({
  exerciseId,
  loadQuizExeData,
  closeAddQuizInExe,
  courseTestId,
  loadQuizCourseTestData,
  closeAddQuizCourseTest,
}) => {
  const [quizType, setQuizType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [quizThematic, setQuizThematic] = useState([]);
  const [selectedQuizThematic, setSelectedQuizThematic] = useState('');
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleAddQuizToExercise = async (quizId) => {
    if (exerciseId !== undefined) {
      try {
        const response = await ExerciseServices.addQuizToExercise(exerciseId, [quizId]);
        if (response && response.status === 201) {
          showAlert('success', 'Quiz added to exercise successfully!');
          loadQuizExeData();
          closeAddQuizInExe();
        } else {
          showAlert('error', 'Failed to add quiz to exercise. Please try again later.');
          closeAddQuizInExe();
        }
      } catch (error) {
        console.error('Failed to add quiz:', error);
        console.error('Server response:', error.response?.data);
        showAlert('error', 'An error occurred while adding the quiz.');
        closeAddQuizInExe();
      }
    }
  };

  const handleAddQuizToCourseTest = async (quizId) => {
    if (courseTestId !== undefined) {
      try {
        const response = await CourseTestService.addQuizCourseTest(courseTestId, [quizId]);
        if (response && response.status === 201) {
          showAlert('success', 'Quiz added to exercise successfully!');
          loadQuizCourseTestData();
          closeAddQuizCourseTest();
        } else {
          showAlert('error', 'Failed to add quiz to exercise. Please try again later.');
          closeAddQuizCourseTest();
        }
      } catch (error) {
        console.error('Failed to add quiz:', error);
        console.error('Server response:', error.response?.data);
        showAlert('error', 'An error occurred while adding the quiz.');
        closeAddQuizCourseTest();
      }
    }
  };

  const fetchQuizData = async () => {
    try {
      const response = await QuizThematicService.getQuizThematic();
      if (response?.data && response?.status === 200) {
        setQuizThematic(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  return (
    <>
      <Stack direction="row" spacing={2} marginBottom={3}>
        <FormControl variant="outlined" sx={{ width: 200 }}>
          <InputLabel id="quiz-type-label">Quiz type</InputLabel>
          <Select
            labelId="quiz-type-label"
            id="quiz-type"
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
            label="Quiz Type"
          >
            <MenuItem value="trueFalse">True-False</MenuItem>
            <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
            <MenuItem value="matching">Matching</MenuItem>
            <MenuItem value="fillBlank">Fill Blank</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ width: 200 }}>
          <InputLabel id="difficulty-label">Difficult type</InputLabel>
          <Select
            labelId="difficulty-label"
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            label="difficulty"
          >
            <MenuItem value="1">Dễ</MenuItem>
            <MenuItem value="2">Trung bình</MenuItem>
            <MenuItem value="3">Khó</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ width: 300 }}>
          <InputLabel id="quiz-thematic-label">Quiz Thematic</InputLabel>
          <Select
            labelId="quiz-thematic-label"
            id="quiz-thematic"
            value={selectedQuizThematic}
            onChange={(e) => setSelectedQuizThematic(e.target.value)}
            label="quiz-thematic"
          >
            {Array.isArray(quizThematic) &&
              quizThematic.map((thematic) => (
                <MenuItem key={thematic.id} value={thematic.id}>
                  {thematic.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <CustomSnackbar
          open={alert.isOpen}
          onClose={handleCloseAlert}
          message={alert.message}
          severity={alert.severity}
        />
      </Stack>
      {quizType === 'trueFalse' && (
        <TrueFalseQuizForm
          difficulty={difficulty}
          selectedQuizThematic={selectedQuizThematic}
          exerciseId={exerciseId}
          handleAddQuizToExercise={handleAddQuizToExercise}
          courseTestId={courseTestId}
          handleAddQuizToCourseTest={handleAddQuizToCourseTest}
        />
      )}
      {quizType === 'fillBlank' && (
        <FillBlankForm
          difficulty={difficulty}
          selectedQuizThematic={selectedQuizThematic}
          exerciseId={exerciseId}
          handleAddQuizToExercise={handleAddQuizToExercise}
          courseTestId={courseTestId}
          handleAddQuizToCourseTest={handleAddQuizToCourseTest}
        />
      )}
      {quizType === 'multipleChoice' && (
        <MultipleChoiceForm
          difficulty={difficulty}
          selectedQuizThematic={selectedQuizThematic}
          exerciseId={exerciseId}
          handleAddQuizToExercise={handleAddQuizToExercise}
          courseTestId={courseTestId}
          handleAddQuizToCourseTest={handleAddQuizToCourseTest}
        />
      )}
      {quizType === 'matching' && (
        <MatchingForm
          difficulty={difficulty}
          selectedQuizThematic={selectedQuizThematic}
          exerciseId={exerciseId}
          handleAddQuizToExercise={handleAddQuizToExercise}
          courseTestId={courseTestId}
          handleAddQuizToCourseTest={handleAddQuizToCourseTest}
        />
      )}
    </>
  );
};

AddQuizForm.propTypes = {
  exerciseId: PropTypes.any,
  loadQuizExeData: PropTypes.any,
  closeAddQuizInExe: PropTypes.any,
  courseTestId: PropTypes.any,
  loadQuizCourseTestData: PropTypes.any,
  closeAddQuizCourseTest: PropTypes.any,
};

export default AddQuizForm;
