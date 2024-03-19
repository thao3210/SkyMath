import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import ExerciseServices from 'src/services/ExerciseServices';

import Link from 'src/components/link';
import Iconify from 'src/components/iconify';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import AddNewQuizForm from 'src/components/add-quiz/add-new-quiz-form';
import AddQuizBankForm from 'src/components/add-quiz/add-quiz-bank-form';

import CardExerciseQuiz from './card-exercise-quiz';

const ListExerciseQuiz = () => {
  const { courseId, exerciseId } = useParams();

  const [courseName, setCourseName] = useState('');
  const [lessonName, setLessonName] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [openAddNewQuiz, setOpenAddNewQuiz] = useState(false);
  const [openAddQuizBank, setOpenAddQuizBank] = useState(false);
  const [listQuiz, setListQuiz] = useState({});
  const [openDeleteQuizDialog, setOpenDeleteQuizDialog] = useState(false);
  const [deletingQuizId, setDeletingQuizId] = useState(null);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const handleOpenDeleteQuizDialog = (quizId) => {
    setDeletingQuizId(quizId);
    setOpenDeleteQuizDialog(true);
  };

  const handleCloseDeleteQuizDialog = () => {
    setOpenDeleteQuizDialog(false);
    setDeletingQuizId(null);
  };

  const handleOpenAddNewQuiz = () => {
    setOpenAddNewQuiz(true);
  };

  const handleCloseAddNewQuiz = () => {
    setOpenAddNewQuiz(false);
  };

  const handleOpenAddQuizBank = () => {
    setOpenAddQuizBank(true);
  };

  const handleCloseAddQuizBank = () => {
    setOpenAddQuizBank(false);
  };

  const fetchExerciseQuiz = useCallback(async () => {
    try {
      const response = await ExerciseServices.getExerciseById(exerciseId);
      if (response?.data && response?.status === 200) {
        setCourseName(response.data.courseName);
        setLessonName(response.data.lessonName);
        setExerciseName(response.data.exerciseName);
        setListQuiz(response.data.exercise);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error);
    }
  }, [exerciseId]);

  const handleDeleteQuiz = async () => {
    if (deletingQuizId) {
      try {
        const response = await ExerciseServices.deleteQuizExercise(exerciseId, [deletingQuizId]);

        if (response && response.status === 201) {
          showAlert('success', 'Delete successful!');
          fetchExerciseQuiz();
          setOpenDeleteQuizDialog(false);
        } else {
          showAlert('error', 'Cannot Delete. Have something wrong!');
          setOpenDeleteQuizDialog(false);
        }
      } catch (error) {
        console.error('Failed to delete quiz:', error);
        showAlert('error', 'An error occurred.');
        setOpenDeleteQuizDialog(false);
      } finally {
        handleCloseDeleteQuizDialog();
      }
    }
  };

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };
  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  useEffect(() => {
    fetchExerciseQuiz();
  }, [exerciseId, fetchExerciseQuiz]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
          <Link href="/">
            <Stack direction="row" alignItems="center">
              <HomeRoundedIcon sx={{ mr: 0.5 }} fontSize="medium" />
              <Typography variant="h5">HomePage</Typography>
            </Stack>
          </Link>

          <Link href="/course">
            <Typography variant="h5">Course</Typography>
          </Link>

          <Link href={`/course/showDetails/${courseId}`}>
            <Typography variant="h5">{courseName}</Typography>
          </Link>

          <Link href={`/course/showDetails/${courseId}`}>
            <Typography variant="h5">{lessonName}</Typography>
          </Link>

          <Typography variant="h5">{exerciseName}</Typography>
        </Breadcrumbs>

        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenAddNewQuiz}
          >
            Add New Quiz
          </Button>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenAddQuizBank}
          >
            Add Quiz From Bank
          </Button>
        </Stack>
      </Stack>

      <Dialog open={openAddNewQuiz} onClose={handleCloseAddNewQuiz} maxWidth="md" fullWidth>
        <DialogContent>
          <Typography variant="h5" marginBottom={3}>
            Add New Quiz
          </Typography>
          <AddNewQuizForm
            exerciseId={exerciseId}
            loadQuizExeData={fetchExerciseQuiz}
            closeAddQuizInExe={handleCloseAddNewQuiz}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openAddQuizBank} onClose={handleCloseAddQuizBank}>
        <DialogContent>
          <Typography variant="h5" marginBottom={3}>
            Add Quiz From Bank
          </Typography>
          <AddQuizBankForm
            exerciseId={exerciseId}
            loadQuizExeData={fetchExerciseQuiz}
            closeAddQuizInExe={handleCloseAddQuizBank}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteQuizDialog} onClose={handleCloseDeleteQuizDialog}>
        <DialogTitle>Delete Quiz</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Are you sure you want to delete this quiz?
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="warning" onClick={handleCloseDeleteQuizDialog}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteQuiz} sx={{ ml: 1 }}>
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />

      {Object.entries(listQuiz).map(([quizIndex, quizItem]) => (
        <Grid
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          container
          spacing={2}
          key={quizIndex}
        >
          <Grid item xs={6} md={10}>
            <CardExerciseQuiz
              questionId={quizItem.quizId}
              questionType={quizItem.questionType}
              data={quizItem.data}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
                height: 80,
              }}
            >
              <IconButton onClick={() => handleOpenDeleteQuizDialog(quizItem.quizId)}>
                <Iconify icon="bi-trash" />
              </IconButton>
            </Card>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
};

export default ListExerciseQuiz;
