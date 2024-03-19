import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
  Box,
  Input,
  Stack,
  Button,
  Dialog,
  Checkbox,
  InputLabel,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import Iconify from '../../components/iconify';
import DialogDetailMultipleChoice from './view/detailView';

// ----------------------------------------------------------------------

export default function MultipleChoice({
  selected,
  id,
  prompt,
  question,
  questionType,
  answerType,
  handleClick,
  onDelete,
  onEdit,
  getDetail,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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
  const [OpenDetailDialog, setOpenDetailDialog] = useState(false);

  const handleCloseDetail = () => {
    setOpenDetailDialog(false);
  };
  const handleOpenDetailDialog = () => {
    setOpenDetailDialog(true);
  };
  const [editData, setEditData] = useState({
    prompt: '',
    question: '',
    questionType: '',
    answerContent: '',
  });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  const handleOpenEditDialog = () => {
    setEditData({
      prompt,
      question,
      questionType,
      answerContent: detail?.data.answer.answerContent || '',
    });
    setOpenEditDialog(true);
  };

  const handleInputChange = (e) => {
    const { name: inputName, value } = e.target;

    setEditData((prevData) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      await onEdit(id, editData);
      handleCloseEditDialog();
    } catch (error) {
      console.error('Failed to edit quiz:', error);
    }
  };
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getDetail(id);
        setDetail(response);
        // Update editData here after detail is fetched and set
        setEditData(prevData => ({
          ...prevData,
          answerContent: response?.answerContent || '',
        }));
      } catch (error) {
        console.error('Failed to fetch quiz detail:', error);
      }
    };
  
    fetchDetail();
  }, [id, getDetail]);
  
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{id}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          {prompt}
        </TableCell>

        <TableCell>
          {questionType === 'image' ? (
            <img style={{ width: 150, height: 100, borderRadius: '2%' }} src={question} alt="" />
          ) : (
            question
          )}
        </TableCell>

        <TableCell>{questionType}</TableCell>
        <TableCell>{answerType}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      {/* <>
        {detail && (
          <div>
            <h2>Question: {detail.data.question.questionContent}</h2>
            <p>{detail ? detail.answerType : ''}</p>
            <p>{detail ? detail.questionType : ''}</p>
            <ul>
              {detail.data.answer.map((answer) => (
                <li key={answer.id}>
                  {answer.answerContentType === 'image' ? (
                    <img src={answer.answerContent} alt="" />
                  ) : (
                    answer.answerContent
                  )}
                </li>
              ))}
            </ul>
            <h2>Correct: {detail ? detail.correctAnswer : '1'}</h2>
          </div>
        )}
      </> */}

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpenDetailDialog}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Detail
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
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogContent>
          <Stack variant="body2" sx={{ mb: 2 }}>
            <InputLabel htmlFor="outlined-basic-name">Prompt:</InputLabel>
            <Input
              id="outlined-basic"
              style={{ width: 400, borderRadius: '2%' }}
              variant="outlined"
              onChange={handleInputChange}
              value={editData.prompt ? editData.prompt : ''}
              name="prompt"
            />
          </Stack>
          <Stack variant="body2" sx={{ mb: 2 }}>
            <InputLabel htmlFor="outlined-basic-description">Question:</InputLabel>
            <Input
              id="outlined-basic"
              style={{ width: 400, borderRadius: '2%' }}
              variant="outlined"
              onChange={handleInputChange}
              value={editData.question ? editData.question : ''}
              name="question"
            />
          </Stack>
          <Stack variant="body2" sx={{ mb: 2 }}>
            <InputLabel htmlFor="outlined-basic-description">Answer1:</InputLabel>
            <Input
              id="outlined-basic"
              style={{ width: 400, borderRadius: '2%' }}
              variant="outlined"
              onChange={handleInputChange}
              value={editData.answerContent ? editData.answerContent : ''}
              name="answerContent"
            />
          </Stack>
          <Stack variant="body2" sx={{ mb: 2 }}>
            <InputLabel htmlFor="outlined-basic-description">CorrectAnswer:</InputLabel>
            <Input
              id="outlined-basic"
              style={{ width: 400, borderRadius: '2%' }}
              variant="outlined"
              onChange={handleInputChange}
              value={editData.correctAnswer ? editData.correctAnswer : ''}
              name="correctAnswer"
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
      <DialogDetailMultipleChoice
        id={id}
        prompt={prompt}
        open={OpenDetailDialog}
        onClose={handleCloseDetail}
      />
    </>
  );
}

MultipleChoice.propTypes = {
  id: PropTypes.any,
  prompt: PropTypes.any,
  question: PropTypes.any,
  questionType: PropTypes.any,
  answerType: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  getDetail: PropTypes.func.isRequired,
};
