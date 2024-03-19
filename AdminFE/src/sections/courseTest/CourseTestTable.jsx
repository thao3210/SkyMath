import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Input, InputLabel } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import CourseTestService from 'src/services/CourseTestServices';

import AddQuizForm from 'src/components/add-quiz/add-new-quiz-form';

import CardExerciseQuiz from 'src/sections/exercise/view/card-exercise-quiz';

import Iconify from '../../components/iconify';
import CustomSnackbar from '../../components/snackbar/snackbar';
import AddQuizTestForm from '../../components/add-quiz/add-quiz-bank-form';

// ----------------------------------------------------------------------

export default function CourseTestTable({
  selected,
  id,
  name,
  timeLimit,
  course,
  handleClick,
  onDelete,
  onEdit,
  onLoadData,
}) {
  const [open, setOpen] = useState(null);
  const [openQuizDialog, setOpenQuizDialog] = useState(false);
  const [quizData, setQuizData] = useState({});
  const [openAddQuizTestDialog, setOpenAddQuizTestDialog] = useState(false);
  const [openAddNewQuizDialog, setOpenAddNewQuizDialog] = useState(false);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDeleteQuizDialog, setOpenDeleteQuizDialog] = useState(false);
  const [deletingQuizId, setDeletingQuizId] = useState(null);

  const handleOpenDeleteQuizDialog = (quizId) => {
    setDeletingQuizId(quizId);
    setOpenDeleteQuizDialog(true);
  };

  const handleCloseDeleteQuizDialog = () => {
    setOpenDeleteQuizDialog(false);
    setDeletingQuizId(null);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    try {
      await onDelete(id);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Failed to delete grade:', error);
    }
  };

  const fetchQuizTest = useCallback(async () => {
    try {
      const response = await CourseTestService.getQuizCourse(id);
      if (response?.data && response?.status === 200) {
        setQuizData(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const handleDeleteQuiz = async () => {
    if (deletingQuizId) {
      try {
        const response = await CourseTestService.deleteQuizCourseTest(id, [deletingQuizId]);

        if (response && response.status === 201) {
          showAlert('success', 'Delete successful!');
          fetchQuizTest();
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

  const renderQuizTest = () => (
    <DialogContent
      style={{
        overflow: 'auto',
        maxHeight: 500,
        maxWidth: 1200,
      }}
    >
      {Object.entries(quizData).map(([quizIndex, quizItem]) => (
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
    </DialogContent>
  );

  const handleOpenAddQuizDialog = () => {
    setOpenAddQuizTestDialog(true);
  };
  const handleCloseAddQuizDialog = () => {
    setOpenAddQuizTestDialog(false);
  };
  const handleOpenAddNewQuizDialog = () => {
    setOpenAddNewQuizDialog(true);
  };
  const handleCloseAddNewQuizDialog = () => {
    setOpenAddNewQuizDialog(false);
  };
  const handleOpenQuizDialog = () => {
    setOpenQuizDialog(true);
    fetchQuizTest();
  };
  const handleCloseQuizDialog = () => {
    setOpenQuizDialog(false);
  };
  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };
  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };
  const [OpenEditDialog, setOpenEditDialog] = useState(false);

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  const handleOpenEditDialog = () => {
    setEditData({
      name,
      timeLimit,
    });
    setOpenEditDialog(true);
  };
  const handleInputChange = (e) => {
    const { name: input, value } = e.target;
    setEditData({ ...editData, [input]: value });
  };
  const [editData, setEditData] = useState({
    name: '',
    timeLimit: '',
  });
  const handleEdit = async () => {
    try {
      await onEdit(id, {
        name: editData.name,
        timeLimit: editData.timeLimit,
      });
      handleCloseEditDialog();
    } catch (error) {
      console.error('Failed to edit quiz:', error);
    }
  };
  useEffect(() => {
    fetchQuizTest();
  }, [id, fetchQuizTest]);
  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        onClick={handleOpenQuizDialog}
      >
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell align="center">{id}</TableCell>

        <TableCell>{name}</TableCell>

        <TableCell align="center">{timeLimit}</TableCell>

        <TableCell>{course}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleOpenQuizDialog}>
          <Iconify icon="bi-card-list" sx={{ mr: 2 }} />
          Detail Test
        </MenuItem>
        <MenuItem onClick={handleOpenEditDialog}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpenDeleteDialog} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete course test</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Are you sure you want to delete this course test?
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="warning" onClick={handleCloseDeleteDialog}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ ml: 1 }}>
              Delete
            </Button>
          </Box>
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

      <Dialog open={openQuizDialog} onClose={handleCloseQuizDialog} fullWidth maxWidth="lg">
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" color="text.primary">
              Quiz Test
            </Typography>
            <Button
              sx={{ ml: 80 }}
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenAddQuizDialog}
            >
              Add Quiz From Bank
            </Button>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenAddNewQuizDialog}
            >
              Add New Quiz
            </Button>
          </Stack>
        </DialogTitle>
        {renderQuizTest()}
      </Dialog>

      <Dialog
        open={openAddNewQuizDialog}
        onClose={handleCloseAddNewQuizDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h5" marginBottom={3}>
            Add New Quiz
          </Typography>
          <AddQuizForm
            courseTestId={id}
            loadQuizCourseTestData={fetchQuizTest}
            closeAddQuizCourseTest={handleCloseAddNewQuizDialog}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openAddQuizTestDialog} onClose={handleCloseAddQuizDialog}>
        <DialogContent>
          <Typography variant="h5" marginBottom={3}>
            Add Quiz From Bank
          </Typography>
          <AddQuizTestForm
            courseTestId={id}
            loadQuizCourseTestData={fetchQuizTest}
            closeAddQuizBankDialog={handleCloseAddQuizDialog}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={OpenEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            <InputLabel htmlFor="outlined-basic-name">Test Name:</InputLabel>
            <Input
              id="outlined-basic"
              variant="outlined"
              onChange={handleInputChange}
              value={editData.name ? editData.name : ''}
              name="name"
            />

            <InputLabel htmlFor="outlined-basic-description">Time Limit:</InputLabel>
            <Input
              id="outlined-basic"
              variant="outlined"
              onChange={handleInputChange}
              value={editData.timeLimit ? editData.timeLimit:''}
              name="timeLimit"
            />

            
          </Stack>

          <Box display="flex" justifyContent="flex-end" sx={{ pt: 2 }}>
            <Button
              variant="outlined"
              color="warning"
              onClick={handleCloseEditDialog}
              sx={{ mx: 1 }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Update
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
    </>
  );
}

CourseTestTable.propTypes = {
  id: PropTypes.any,
  name: PropTypes.any,
  timeLimit: PropTypes.any,
  course: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
  onLoadData: PropTypes.func,
};
