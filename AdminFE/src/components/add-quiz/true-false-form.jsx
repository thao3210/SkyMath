import * as yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
import TrueFalseService from 'src/services/TrueFalseService';

import CustomSnackbar from '../snackbar/snackbar';

const TrueFalseQuizForm = ({
  difficulty,
  selectedQuizThematic,
  exerciseId,
  handleAddQuizToExercise,
  courseTestId,
  handleAddQuizToCourseTest,
}) => {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState('');

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleAdd = async (values, { setSubmitting }) => {
    const formData = new FormData();
    try {
      formData.append('Prompt', prompt);
      formData.append('Question', values.question);
      formData.append('Answer', answerType);
      formData.append('QuestionFile', image);
      formData.append('QuizThematicId', selectedQuizThematic);
      formData.append('DifficultyId', difficulty);

      const response = await TrueFalseService.addTrueFalse(formData);

      if (response && response.status === 200) {
        showAlert('success', 'Quiz added successfully!');
        if (exerciseId !== undefined) {
          const quizId = response.data;
          await handleAddQuizToExercise(quizId);
        }
        if (courseTestId !== undefined) {
          const quizId = response.data;
          await handleAddQuizToCourseTest(quizId);
        }
      } else {
        showAlert('error', 'An error occurred while adding the quiz!');
      }
    } catch (error) {
      console.error('Failed to add quiz:', error);
      console.error('Server response:', error.response?.data);
      showAlert('error', 'An error occurred while adding the quiz.');
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    prompt: '',
    question: '',
  };

  const validationSchema = yup.object().shape({
    prompt: yup.string().required('This is a required field'),
    question: yup.string().required('This is a required field'),
  });

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
  const [answerType, setAnswerType] = useState('');

  const handleAnswerTypeChange = (event) => {
    setAnswerType(event.target.value);
  };

  return (
    <Formik onSubmit={handleAdd} initialValues={initialValues} validationSchema={validationSchema}>
      {({ values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {isSubmitting ? (
            <LoadingPage />
          ) : (
            <Stack direction="column" spacing={3} maxWidth="50%">
              {/* <TextField
                  id="outlined-basic"
                  label="Prompt"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.prompt ? values.prompt : ''}
                  name="prompt"
                  error={!!touched.prompt && !!errors.prompt}
                  helperText={touched.prompt && errors.prompt}
                /> */}
              <Typography variant="h6">Prompt</Typography>
              <CKEditor
                editor={ClassicEditor}
                config={{ placeholder: 'Enter prompt here ...' }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setPrompt(data);
                }}
              />

              <TextField
                id="outlined-basic"
                label="Question"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.question ? values.question : ''}
                name="question"
                error={!!touched.question && !!errors.question}
                helperText={touched.question && errors.question}
              />

              <FormControl variant="outlined">
                <InputLabel id="answer-type-label">Answer</InputLabel>
                <Select
                  labelId="answer-type-label"
                  id="answer-type"
                  value={answerType}
                  onChange={handleAnswerTypeChange}
                  label="Answer Type"
                >
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
                </Select>
              </FormControl>

              <Grid item xs={6}>
                <Box>
                  <Typography variant="h6">Images</Typography>
                  <Stack direction="column" spacing={2}>
                    {imagePreview && (
                      <img src={imagePreview} alt="Preview" style={{ borderRadius: 4 }} />
                    )}
                    <Button
                      sx={{ background: 'orange' }}
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
              <Box display="flex" justifyContent="flex-start" sx={{ pt: 2 }}>
                <Button fullWidth type="submit" variant="contained" color="success">
                  Add Question
                </Button>
              </Box>
            </Stack>
          )}
          <CustomSnackbar
            open={alert.isOpen}
            onClose={handleCloseAlert}
            message={alert.message}
            severity={alert.severity}
          />
        </form>
      )}
    </Formik>
  );
};
TrueFalseQuizForm.propTypes = {
  difficulty: PropTypes.string.isRequired,
  selectedQuizThematic: PropTypes.any.isRequired,
  exerciseId: PropTypes.any,
  handleAddQuizToExercise: PropTypes.any,
  courseTestId: PropTypes.any,
  handleAddQuizToCourseTest: PropTypes.any,
};

export default TrueFalseQuizForm;
