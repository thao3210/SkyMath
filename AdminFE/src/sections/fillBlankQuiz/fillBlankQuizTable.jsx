import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function FillBlank({
  selected,
  id,
  prompt,
  question,
  answer,
  handleClick,
  onDelete,
  onEdit,
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
  const [OpenEditDialog, setOpenEditDialog] = useState(false);

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const [editData, setEditData] = useState({
    prompt: '',
    question: '',
    answer: [],
  });
  const handleOpenEditDialog = () => {
    setEditData({
      prompt,
      question,
      answer: Array.isArray(answer) ? answer.join(', ') : answer,
    });
    setOpenEditDialog(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEdit = async () => {
    try {
      await onEdit(id, {
        prompt: editData.prompt,
        question: editData.question,
        answer: editData.answer.split(', ').map(item => item.trim()), 
      });
      handleCloseEditDialog();
    } catch (error) {
      console.error('Failed to edit quiz:', error);
    }
  };

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
        <TableCell>{question.replace(/<input>/g, '___')}</TableCell>

        <TableCell>{answer}</TableCell>

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
        PaperProps={{
          sx: { width: 140 },
        }}
      >
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

      <Dialog open={OpenEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            <InputLabel htmlFor="outlined-basic-name">Prompt:</InputLabel>
            <Input
              id="outlined-basic"
              variant="outlined"
              onChange={handleInputChange}
              value={editData.prompt ? editData.prompt : ''}
              name="prompt"
            />

            <InputLabel htmlFor="outlined-basic-description">Question:</InputLabel>
            <Input
              id="outlined-basic"
              variant="outlined"
              onChange={handleInputChange}
              value={editData.question ? editData.question.replace(/<input>/g, '_') : ''}
              name="question"
            />

            <InputLabel htmlFor="outlined-basic-description">Answer:</InputLabel>
            <Input
              id="outlined-basic"
              variant="outlined"
              onChange={handleInputChange}
              value={editData.answer}
              name="answer"
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
    </>
  );
}

FillBlank.propTypes = {
  id: PropTypes.any,
  prompt: PropTypes.any,
  question: PropTypes.any,
  answer: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
};
