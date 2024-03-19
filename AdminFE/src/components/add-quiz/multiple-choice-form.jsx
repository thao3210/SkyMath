import * as yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import LoadingPage from 'src/pages/loading_page';
import MultipleChoiceService from 'src/services/MultipleChoiceService';

import Iconify from 'src/components/iconify';

import CustomSnackbar from '../snackbar/snackbar';

const MultipleChoiceForm = ({
  difficulty,
  selectedQuizThematic,
  exerciseId,
  handleAddQuizToExercise,
  courseTestId,
  handleAddQuizToCourseTest,
}) => {
  const [numAnswers, setNumAnswers] = useState(1);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviewAnswer, setImagePreviewAnswer] = useState(Array(numAnswers).fill(null));
  const [isAnswerImageUploaded, setIsAnswerImageUploaded] = useState(Array(numAnswers).fill(false));
  const [image, setImage] = useState(null);
  const [quizData, setQuizData] = useState({ answers: [], answerFiles: [] });
  const [correctAnswer, setCorrectAnswer] = useState('Answer1'); // Default to Answer1
  const [answerType, setAnswerType] = useState('Single');

  useEffect(() => {}, []);

  const correctAnswerOptions = Array.from({ length: numAnswers }, (_, index) => `${index + 1}`);

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleAdd = async (values, { setSubmitting }) => {
    const formData = new FormData();
    try {
      // Append other form data
      formData.append('Prompt', values.prompt);
      formData.append('Question', values.question);
      formData.append('AnswerType', answerType);
      formData.append('QuestionFile', image);
      formData.append('CorrectAnswer', correctAnswer);
      formData.append('QuizThematicId', selectedQuizThematic);
      formData.append('DifficultyId', difficulty);

      // Append answer text and files
      quizData.answers.forEach((answer, index) => {
        formData.append(`Answer${index + 1}`, answer);

        // Check if answer file is uploaded before appending
        if (quizData.answerFiles[index]) {
          formData.append(`FileAnswer${index + 1}`, quizData.answerFiles[index]);
        }
      });

      const response = await MultipleChoiceService.addQuiz(formData);

      if (response && response.status === 200) {
        showAlert('success', 'Quiz added successfully!');
        if (exerciseId !== undefined) {
          const quizId = response.data;
          await handleAddQuizToExercise(quizId);
        } else if (courseTestId !== undefined) {
          const quizId = response.data;
          await handleAddQuizToCourseTest(quizId);
        }
      } else {
        showAlert('error', 'Quiz added error!');
      }
    } catch (error) {
      console.error('Failed to add quiz:', error);
      console.error('Server response:', error.response?.data);
      showAlert('error', 'An error occurred while adding the quiz.');
    } finally {
      setSubmitting(false);
    }
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

  const handleFileAnswerChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewAnswer((prevPreviews) => {
          const updatedPreviews = [...prevPreviews];
          updatedPreviews[index] = reader.result;
          return updatedPreviews;
        });
        setIsAnswerImageUploaded((prevIsUploaded) => {
          const updatedIsUploaded = [...prevIsUploaded];
          updatedIsUploaded[index] = true;
          return updatedIsUploaded;
        });
        // Store file in state
        setQuizData((prevData) => {
          const updatedAnswerFiles = [...prevData.answerFiles];
          updatedAnswerFiles[index] = file;
          return { ...prevData, answerFiles: updatedAnswerFiles };
        });
      };
      reader.readAsDataURL(file);
    } else {
      // Reset imagePreviewAnswer and isAnswerImageUploaded when no file is selected
      setImagePreviewAnswer((prevPreviews) => {
        const updatedPreviews = [...prevPreviews];
        updatedPreviews[index] = null;
        return updatedPreviews;
      });
      setIsAnswerImageUploaded((prevIsUploaded) => {
        const updatedIsUploaded = [...prevIsUploaded];
        updatedIsUploaded[index] = false;
        return updatedIsUploaded;
      });
      // Remove file from state
      setQuizData((prevData) => {
        const updatedAnswerFiles = [...prevData.answerFiles];
        updatedAnswerFiles[index] = null;
        return { ...prevData, answerFiles: updatedAnswerFiles };
      });
    }
  };

  const initialValues = {
    prompt: '',
  };
  const validationSchema = yup.object().shape({
    prompt: yup.string().required('This is a required field'),
  });

  const handleAddAnswer = () => {
    if (numAnswers < 10) {
      setNumAnswers((prevNum) => prevNum + 1);
    } else {
      showAlert('error', 'You can only add up to 10 answers.');
    }
  };

  const handleAnswerInputChange = (index, event) => {
    const newAnswers = [...quizData.answers];
    const newAnswersFile = [...quizData.answerFiles];
    newAnswers[index] = event.target.value;
    setQuizData((prevData) => ({
      ...prevData,
      answers: newAnswers,
      answerFiles: newAnswersFile,
    }));
  };

  const handleCorrectAnswerChange = (event) => {
    setCorrectAnswer(event.target.value);
  };

  const handleDeleteAnswer = (index) => {
    if (numAnswers > 1) {
      setNumAnswers((prevNum) => prevNum - 1);

      const newAnswers = [...quizData.answers];
      const newAnswerFiles = [...quizData.answerFiles];

      newAnswers.splice(index, 1);
      newAnswerFiles.splice(index, 1);

      setQuizData((prevData) => ({
        ...prevData,
        answers: newAnswers,
        answerFiles: newAnswerFiles,
      }));
    }
  };

  return (
    <Formik onSubmit={handleAdd} initialValues={initialValues} validationSchema={validationSchema}>
      {({ values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit }) => (
        <>
          <CustomSnackbar
            open={alert.isOpen}
            onClose={handleCloseAlert}
            message={alert.message}
            severity={alert.severity}
          />
          <form onSubmit={handleSubmit}>
            {isSubmitting ? (
              <LoadingPage />
            ) : (
              <Stack direction="column" spacing={3}>
                <TextField
                  id="outlined-basic"
                  label="Prompt"
                  variant="outlined"
                  sx={{ width: '50%' }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.prompt ? values.prompt : ''}
                  name="prompt"
                  error={!!touched.prompt && !!errors.prompt}
                  helperText={touched.prompt && errors.prompt}
                />

                <FormControl variant="outlined">
                  <InputLabel id="answerType-label">Answer Type</InputLabel>
                  <Select
                    labelId="answerType-label"
                    id="answerType"
                    sx={{ width: '50%' }}
                    value={answerType}
                    onChange={(e) => setAnswerType(e.target.value)}
                    label="answerType"
                  >
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Multiple">Multiple</MenuItem>
                  </Select>
                </FormControl>

                <Stack direction="row" alignItems="center">
                  <TextField
                    id="outlined-basic"
                    label="Question"
                    variant="outlined"
                    sx={{ width: '50%' }}
                    multiline
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.question ? values.question : ''}
                    name="question"
                    error={!!touched.question && !!errors.question}
                    helperText={touched.question && errors.question}
                  />

                  <Grid item xs={6} sx={{ p: 0, ml: 3 }}>
                    <Typography variant="h6">Images Question</Typography>
                    <Stack direction="column" spacing={2}>
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{ width: 200, borderRadius: 4 }}
                        />
                      )}

                      <Button
                        sx={{ background: 'orange' }}
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        disabled={values.question && values.question.trim() !== ''}
                      >
                        Upload File
                        <input type="file" hidden onChange={handleFileChange} />
                      </Button>
                    </Stack>
                  </Grid>
                </Stack>

                {Array.from({ length: numAnswers }).map((_, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      id={`outlined-basic-answer-${index}`}
                      sx={{ width: '50%' }}
                      label={`Answer ${index + 1}`}
                      variant="outlined"
                      onChange={(event) => handleAnswerInputChange(index, event)}
                      name={`answer${index + 1}`}
                    />

                    <Button
                      color="error"
                      onClick={() => handleDeleteAnswer(index)}
                      sx={{ mx: 1, borderRadius: 20 }}
                    >
                      <Iconify icon="eva:close-fill" />
                    </Button>
                    <Grid item xs={6} sx={{ ml: 3, pb: 5 }}>
                      <Box>
                        <Typography variant="h6">Images Answer</Typography>
                        <Stack direction="column" spacing={2}>
                          {isAnswerImageUploaded[index] && (
                            <img
                              src={imagePreviewAnswer[index]}
                              alt="Preview"
                              style={{ maxWidth: 330, maxHeight: 330, borderRadius: 4 }}
                            />
                          )}
                          <Button
                            sx={{ width: 200, background: 'orange' }}
                            variant="contained"
                            component="label"
                            startIcon={<CloudUploadIcon />}
                            disabled={values.answerType && values.answerType.trim() !== ''}
                          >
                            Upload File
                            <input
                              type="file"
                              hidden
                              onChange={(event) => handleFileAnswerChange(event, index)}
                            />
                          </Button>
                        </Stack>
                      </Box>
                    </Grid>
                  </Box>
                ))}

                <Button
                  sx={{ width: '50%' }}
                  variant="contained"
                  color="primary"
                  onClick={handleAddAnswer}
                  startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  Add Answer
                </Button>
                {answerType === 'Multiple' && (
                  <TextField
                    id="outlined-basic"
                    label="Correct Answer"
                    variant="outlined"
                    onChange={handleCorrectAnswerChange}
                    name="correctAnswer"
                  />
                )}
                {answerType === 'Single' && (
                  <TextField
                    sx={{ mb: 2, width: 500 }}
                    id="outlined-basic"
                    label="Correct Answer"
                    variant="outlined"
                    select
                    value={correctAnswer}
                    onChange={handleCorrectAnswerChange}
                    name="correctAnswer"
                    error={!!errors.correctAnswer}
                    helperText={touched.correctAnswer && errors.correctAnswer}
                  >
                    {correctAnswerOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        Answer {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                <Box display="flex" justifyContent="flex-start" sx={{ width: '50%' }}>
                  <Button fullWidth size="large" type="submit" variant="contained" color="success">
                    Add Question
                  </Button>
                </Box>
              </Stack>
            )}
          </form>
        </>
      )}
    </Formik>
  );
};

MultipleChoiceForm.propTypes = {
  difficulty: PropTypes.string.isRequired,
  selectedQuizThematic: PropTypes.any.isRequired,
  exerciseId: PropTypes.any,
  handleAddQuizToExercise: PropTypes.any,
  courseTestId: PropTypes.any,
  handleAddQuizToCourseTest: PropTypes.any,
};

export default MultipleChoiceForm;
