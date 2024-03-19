import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';

import ExerciseServices from 'src/services/ExerciseServices';
import QuizInforService from 'src/services/QuizInforServices';
import CourseTestService from 'src/services/CourseTestServices';
import QuizThematicService from 'src/services/QuizThematicServices';

import Iconify from 'src/components/iconify';
import CustomSnackbar from 'src/components/snackbar/snackbar';

const AddQuizBankForm = ({
  courseTestId,
  exerciseId,
  loadQuizExeData,
  loadQuizCourseTestData,
  closeAddQuizBankDialog,
  closeAddQuizInExe,
  onSelectQuiz,
  closeAddQuizTestSys,
}) => {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [quizData, setQuizData] = useState([]);
  const [quizType, setQuizType] = useState('');
  const [quizThematic, setQuizThematic] = useState([]);
  const [quizDifficult, setQuizDifficult] = useState({});
  const [selectedQuizThematic, setSelectedQuizThematic] = useState('');
  const [selectedQuizDifficult, setSelectedQuizDifficult] = useState('');
  const [selectedQuizData, setSelectedQuizData] = useState([]);

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const fetchQuizThematicData = async () => {
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

  const fetchQuizDifficultData = useCallback(async () => {
    try {
      const response = await QuizInforService.getQuizInfor(selectedQuizThematic);
      if (response?.data && response?.status === 200) {
        setQuizDifficult(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [selectedQuizThematic]);

  const filterQuizData = useCallback(() => {
    if (selectedQuizDifficult && quizDifficult[selectedQuizDifficult]) {
      const filterDifficultData = quizDifficult[selectedQuizDifficult];
      const filterTypeData = filterDifficultData.filter(
        (item) => item.substring(0, 2) === quizType
      );
      setQuizData(filterTypeData);
    }
  }, [selectedQuizDifficult, quizDifficult, quizType]);

  const handleAddQuizBank = async (e) => {
    e.preventDefault();
    try {
      if (courseTestId) {
        await CourseTestService.addQuizCourseTest(courseTestId, selectedQuizData);
        showAlert('success', 'Add quiz to course test successful!');
        loadQuizCourseTestData();
        closeAddQuizBankDialog();
      } else if (exerciseId) {
        await ExerciseServices.addQuizToExercise(exerciseId, selectedQuizData);
        showAlert('success', 'Add quiz to exercise successful!');
        loadQuizExeData();
        closeAddQuizInExe();
      } else if (onSelectQuiz) {
        onSelectQuiz(selectedQuizData);
        closeAddQuizTestSys();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleMultipleSelect = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedQuizData(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  useEffect(() => {
    fetchQuizThematicData();
  }, []);

  useEffect(() => {
    if (selectedQuizThematic) {
      fetchQuizDifficultData();
    }
  }, [selectedQuizThematic, fetchQuizDifficultData]);

  useEffect(() => {
    filterQuizData();
  }, [selectedQuizDifficult, quizDifficult, quizType, filterQuizData]);

  return (
    <Stack spacing={2}>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />

      <FormControl variant="outlined" sx={{ width: 300 }}>
        <InputLabel id="quiz-thematic-label">Quiz Thematic</InputLabel>
        <Select
          labelId="quiz-thematic-label"
          id="quiz-thematic"
          value={selectedQuizThematic}
          onChange={(e) => setSelectedQuizThematic(e.target.value)}
          label="quiz-thematic"
        >
          {quizThematic.map((thematic) => (
            <MenuItem key={thematic.id} value={thematic.id}>
              {thematic.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ width: 300 }}>
        <InputLabel id="quiz-difficult-label">Quiz Difficult</InputLabel>
        <Select
          labelId="quiz-difficult-label"
          id="quiz-difficult"
          value={selectedQuizDifficult}
          onChange={(e) => setSelectedQuizDifficult(e.target.value)}
          label="quiz-difficult"
        >
          <MenuItem value="easyQuiz">Easy</MenuItem>
          <MenuItem value="mediumQuiz">Medium</MenuItem>
          <MenuItem value="hardQuiz">Hard</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ mb: 2, width: 200 }}>
        <InputLabel id="quiz-type-label">Quiz type</InputLabel>
        <Select
          labelId="quiz-type-label"
          id="quiz-type"
          value={quizType}
          onChange={(e) => setQuizType(e.target.value)}
          label="quiz-type"
        >
          <MenuItem value="TF">True-False</MenuItem>
          <MenuItem value="MC">Multiple Choice</MenuItem>
          <MenuItem value="M">Matching</MenuItem>
          <MenuItem value="FB">Fill Blank</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ mb: 2, width: 400 }}>
        <InputLabel id="quiz-type-label">Quiz Data</InputLabel>
        <Select
          labelId="quiz-data-label"
          id="quiz-data"
          multiple
          value={selectedQuizData || ''}
          renderValue={(selected) => selected.join(', ')}
          onChange={handleMultipleSelect}
          label="quiz-data"
        >
          {quizData.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={selectedQuizData.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" justifyContent="flex-start" sx={{ pt: 2 }}>
        <Button
          sx={{ width: 400, mb: 3 }}
          variant="contained"
          color="primary"
          onClick={handleAddQuizBank}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add Quiz
        </Button>
      </Box>
    </Stack>
  );
};

AddQuizBankForm.propTypes = {
  courseTestId: PropTypes.any,
  loadQuizCourseTestData: PropTypes.any,
  closeAddQuizBankDialog: PropTypes.any,
  exerciseId: PropTypes.any,
  loadQuizExeData: PropTypes.any,
  closeAddQuizInExe: PropTypes.any,
  onSelectQuiz: PropTypes.any,
  closeAddQuizTestSys: PropTypes.any,
};

export default AddQuizBankForm;
