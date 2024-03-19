import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function ExerciseTableRow({
  exerciseId,
  exerciseName,
  onDeleteExercise,
  courseId,
  lessonId,
}) {
  const navigate = useNavigate();

  const [openExerciseOption, setOpenExerciseOption] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenExerciseMenu = (event) => {
    setOpenExerciseOption(event.currentTarget);
  };

  const handleCloseExerciseMenu = () => {
    setOpenExerciseOption(null);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    try {
      await onDeleteExercise(exerciseId);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Failed to delete grade:', error);
    }
  };

  const handleExerciseQuizClick = () => {
    navigate(`/course/showDetails/${courseId}/lesson/${lessonId}/exerciseListQuiz/${exerciseId}`);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} onClick={handleExerciseQuizClick}>
        <TableCell>{exerciseName}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenExerciseMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openExerciseOption}
        anchorEl={openExerciseOption}
        onClose={handleCloseExerciseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleExerciseQuizClick}>
          <Iconify icon="eva:eye-outline" sx={{ mr: 2 }} />
          Details
        </MenuItem>

        <MenuItem onClick={handleOpenDeleteDialog} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Grade</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Are you sure you want to delete this grade?
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
    </>
  );
}

ExerciseTableRow.propTypes = {
  exerciseId: PropTypes.any,
  exerciseName: PropTypes.any,
  onDeleteExercise: PropTypes.func,
  courseId: PropTypes.any,
  lessonId: PropTypes.any,
};
