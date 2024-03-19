import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import ExerciseServices from 'src/services/ExerciseServices';

import Label from '../../components/label';
import Iconify from '../../components/iconify';
import LessonServices from '../../services/LessonServices';
import ResourceTableRow from '../resource/resource-table-row';
import ExerciseTableRow from '../exercise/exercise-table-row';
import ResourceServices from '../../services/ResourceServices';
import CustomSnackbar from '../../components/snackbar/snackbar';
import AddResourceForm from '../resource/view/add-resource-form';

// ----------------------------------------------------------------------
export default function LessonTableRow({
  lessonId,
  lessonName,
  isFree,
  onDeleteLesson,
  onLoadData,
  courseId
}) {
  const [resource, setResource] = useState([]);

  const [exercise, setExercise] = useState([]);

  const [exerciseName, setExerciseName] = useState('');

  const [openLessonOption, setOpenLessonOption] = useState(null);

  const [openEditLesson, setOpenEditLesson] = useState(false);

  const [openResourceDialog, setOpenResourceDialog] = useState(false);

  const [openAddResourceDialog, setOpenAddResourceDialog] = useState(false);

  const [openExerciseDialog, setOpenExerciseDialog] = useState(false);

  const [openAddExerciseDialog, setOpenAddExerciseDialog] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [editLessonName, setEditLessonName] = useState(lessonName);

  const [editIsFree, setEditIsFree] = useState(isFree);

  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const handleOpenLessonMenu = (event) => {
    setOpenLessonOption(event.currentTarget);
  };

  const handleCloseLessonMenu = () => {
    setOpenLessonOption(null);
  };

  const handleOpenEditLesson = () => {
    setOpenEditLesson(true);
  };

  const handleCloseEditLesson = () => {
    setOpenEditLesson(false);
    if (editLessonName === '') {
      setEditLessonName(lessonName);
    }
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenAddResourceDialog = () => {
    setOpenAddResourceDialog(true);
  };

  const handleCloseAddResourceDialog = () => {
    setOpenAddResourceDialog(false);
  };

  const handleOpenAddExerciseDialog = () => {
    setOpenAddExerciseDialog(true);
  };

  const handleCloseAddExerciseDialog = () => {
    setOpenAddExerciseDialog(false);
  };

  const handleOpenResourceDialog = () => {
    setOpenResourceDialog(true);
    fetchDetailsResource();
  };

  const handleCloseResourceDialog = () => {
    setOpenResourceDialog(false);
  };

  const handleOpenExerciseDialog = () => {
    setOpenExerciseDialog(true);
    fetchExercise();
  };

  const handleCloseExerciseDialog = () => {
    setOpenExerciseDialog(false);
  };

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleDelete = async () => {
    try {
      await onDeleteLesson(lessonId);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Failed to delete grade:', error);
    }
  };

  const fetchDetailsResource = async () => {
    try {
      const response = await ResourceServices.getResourceByLessonId(lessonId);
      // console.log("response: ", response.data);
      if (response?.data && response?.status === 200) {
        setResource(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteResource = async (id) => {
    try {
      const response = await ResourceServices.deleteResource(id);

      if (response && response.status === 204) {
        showAlert('success', 'Delete successful!');
        fetchDetailsResource();
      } else {
        showAlert('error', 'Cannot Delete. Have something wrong!');
      }
    } catch (error) {
      console.error('Failed to delete resource:', error);
      showAlert('error', 'An error occurred.');
    }
  };

  const fetchExercise = async () => {
    try {
      const response = await ExerciseServices.getExerciseByLessonId(lessonId);
      // console.log("response: ", response.data);
      if (response?.data && response?.status === 200) {
        setExercise(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteExercise = async (id) => {
    try {
      const response = await ExerciseServices.deleteExercise(id);

      if (response && response.status === 204) {
        showAlert('success', 'Delete successful!');
        fetchExercise();
      } else {
        showAlert('error', 'Cannot Delete. Have something wrong!');
      }
    } catch (error) {
      console.error('Failed to delete exercise:', error);
      showAlert('error', 'An error occurred.');
    }
  };

  const renderResourceDialog = () => (
    <DialogContent
      style={{
        overflow: 'auto',
        maxHeight: 400,
      }}
    >
      <Table size="small" aria-label="resource" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>{null}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resource.map((resourceItems) => (
            <ResourceTableRow
              key={resourceItems.id}
              resourceId={resourceItems.id}
              resourceName={resourceItems.name}
              resourceContent={resourceItems.content}
              resourceType={resourceItems.resourceTypeName}
              onDeleteResource={handleDeleteResource}
              showAlert={showAlert}
              onLoadData={fetchDetailsResource}
            />
          ))}
        </TableBody>
      </Table>
    </DialogContent>
  );

  const renderExerciseDialog = () => (
    <DialogContent
      style={{
        overflow: 'auto',
        maxHeight: 400,
      }}
    >
      <Table size="small" aria-label="exercise" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{null}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exercise.map((exerciseItems) => (
            <ExerciseTableRow
              key={exerciseItems.id}
              exerciseId={exerciseItems.id}
              lessonId={lessonId}
              courseId={courseId}
              exerciseName={exerciseItems.name}
              onDeleteExercise={handleDeleteExercise}
              showAlert={showAlert}
              onLoadData={fetchExercise}
            />
          ))}
        </TableBody>
      </Table>
    </DialogContent>
  );

  const renderEditLesson = () => (
    <DialogContent>
      <TextField
        margin="dense"
        fullWidth
        label="Lesson Name"
        variant="outlined"
        name="editLessonName"
        value={editLessonName}
        onChange={(e) => setEditLessonName(e.target.value)}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={editIsFree}
            onChange={(e) => setEditIsFree(e.target.checked)}
            color="primary"
          />
        }
        label="Free"
      />
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleEditLesson}>
          Edit Lesson
        </Button>
        <Button variant="contained" color="warning" onClick={handleCloseEditLesson}>
          Cancel
        </Button>
      </Box>
    </DialogContent>
  );

  const handleEditLesson = async () => {
    try {
      const editedName = editLessonName === '' ? lessonName : editLessonName;

      const credentials = { name: editedName, isFree: editIsFree };
      const response = await LessonServices.editLesson(lessonId, credentials);

      if (response && response.status === 204) {
        showAlert('success', 'Edit lesson successful!');
        handleCloseEditLesson();
        onLoadData();
      } else {
        showAlert('error', 'Have something error when edit lesson!');
        handleCloseEditLesson();
      }
    } catch (error) {
      console.error('Failed to edit lesson:', error);
      showAlert('error', 'Have something error when edit lesson!');
      handleCloseEditLesson();
    }
  };

  const handleAddExercise = async (e) => {
    e.preventDefault();
    const lessonIdFromProps = lessonId;
    const credentials = { name: exerciseName, lessonId: lessonIdFromProps };
    try {
      const response = await ExerciseServices.addExercise(credentials);
      console.log('response status: ', response.status);
      if (response.status === 201) {
        showAlert('success', 'Add exercise successful!');
        handleCloseAddExerciseDialog();
        setExerciseName(null);
        fetchExercise();
      } else {
        showAlert('error', 'Add exercise error!');
        handleCloseAddExerciseDialog();
      }
    } catch (error) {
      console.error('Failed to add exercise:', error);
      showAlert('error', 'Add exercise error!');
      handleCloseAddExerciseDialog();
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell>{lessonName}</TableCell>
        <TableCell align="center">
          <Label color={isFree === true ? 'success' : 'error'}>{isFree ? 'Free' : 'Priced'}</Label>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenLessonMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openLessonOption}
        anchorEl={openLessonOption}
        onClose={handleCloseLessonMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpenResourceDialog}>
          <Iconify icon="eva:folder-fill" sx={{ mr: 2 }} />
          Resource
        </MenuItem>

        <MenuItem onClick={handleOpenExerciseDialog}>
          <Iconify icon="eva:book-open-outline" sx={{ mr: 2 }} />
          Exercise
        </MenuItem>

        <MenuItem onClick={handleOpenEditLesson}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleOpenDeleteDialog} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Dialog open={openEditLesson} onClose={handleCloseEditLesson}>
        <DialogTitle>Edit Lesson</DialogTitle>
        {renderEditLesson()}
      </Dialog>

      <Dialog open={openResourceDialog} onClose={handleCloseResourceDialog} fullWidth maxWidth="md">
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" color="text.primary">
              Resource
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenAddResourceDialog}
            >
              New Resource
            </Button>
          </Stack>
        </DialogTitle>
        {renderResourceDialog()}
      </Dialog>

      <Dialog open={openExerciseDialog} onClose={handleCloseExerciseDialog} fullWidth maxWidth="md">
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" color="text.primary">
              Exercise
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenAddExerciseDialog}
            >
              New Exercise
            </Button>
          </Stack>
        </DialogTitle>
        {renderExerciseDialog()}
      </Dialog>

      <Dialog open={openAddResourceDialog} onClose={handleCloseAddResourceDialog}>
        <DialogTitle>Add Resource</DialogTitle>
        <AddResourceForm
          lessonId={lessonId}
          showAlert={showAlert}
          onLoadData={fetchDetailsResource}
          handleCloseAddResourceDialog={handleCloseAddResourceDialog}
        />
      </Dialog>

      <Dialog open={openAddExerciseDialog} onClose={handleCloseAddExerciseDialog}>
        <DialogTitle>Add Exercise</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            label="Exercise Name"
            variant="outlined"
            name="exerciseName"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleAddExercise}>
              Add Exercise
            </Button>
            <Button variant="contained" color="warning" onClick={handleCloseAddExerciseDialog}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Lesson</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Are you sure you want to delete this lesson?
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

      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </>
  );
}

LessonTableRow.propTypes = {
  lessonId: PropTypes.any,
  courseId: PropTypes.any,
  lessonName: PropTypes.any,
  isFree: PropTypes.bool,
  onDeleteLesson: PropTypes.func,
  onLoadData: PropTypes.func,
};
