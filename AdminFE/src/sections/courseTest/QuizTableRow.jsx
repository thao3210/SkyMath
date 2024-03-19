import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Iconify from '../../components/iconify';

export default function QuizRow({
  quizId,
  questionType,
  questionContent,
  questionContentType,
  answer,
  correctAnswer,
  onDeleteQuizCourseTest,
}) {
  const [openQuizOption, setOpenResourceOption] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenResourceMenu = (event) => {
    setOpenResourceOption(event.currentTarget);
  };

  const handleCloseResourceMenu = () => {
    setOpenResourceOption(null);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    try {
      await onDeleteQuizCourseTest(quizId);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Failed to delete quiz:', error);
    }
  };

  const renderAnswer = () => {
    if (typeof answer === 'boolean') {
      return answer ? 'True' : 'False';
    } if (Array.isArray(answer)) {
      if (answer.length > 0) {
        const renderedAnswers = answer.map(item => item.answerContent);
        return renderedAnswers.join(', '); 
      }
    } else if (typeof answer === 'object') {
      const keys = Object.keys(answer);
      if (keys.length > 0) {
        const renderedAnswers = keys.map(key => answer[key]);
        return renderedAnswers.join(', ');
      }
    }
    return 'Invalid Answer';
  };
  

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell>{quizId}</TableCell>
        <TableCell>{questionType}</TableCell>
        <TableCell>{questionContent}</TableCell>
        <TableCell>{questionContentType}</TableCell>
        <TableCell>{renderAnswer()}</TableCell>
        <TableCell>{correctAnswer}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenResourceMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openQuizOption}
        anchorEl={openQuizOption}
        onClose={handleCloseResourceMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 180 },
        }}
      >
        <MenuItem onClick={handleOpenDeleteDialog} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Quiz</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Are you sure you want to delete this quiz?
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


QuizRow.propTypes = {
  quizId: PropTypes.string,
  questionType: PropTypes.string,
  questionContent: PropTypes.string,
  questionContentType: PropTypes.string,
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.shape({})]),
  correctAnswer: PropTypes.string,
  onDeleteQuizCourseTest: PropTypes.func,
};
