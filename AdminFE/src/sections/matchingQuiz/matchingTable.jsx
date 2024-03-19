import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import Stack from '@mui/material/Stack';
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

import CreateMatchingContent from 'src/components/add-quiz/create-matching-content';

// import Label from '../../components/label';
import Iconify from '../../components/iconify';
import DialogMatchingContent from './view/show-matching-content';

// ----------------------------------------------------------------------

export default function MatchingTable({ selected, id, prompt, handleClick, onDelete, onEdit }) {
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

  const handleCloseEditSubject = () => {
    setOpenEditDialog(false);
  };

  const [editData, setEditData] = useState({
    prompt: '',
  });
  const handleOpenEditDialog = () => {
    setEditData({
      prompt,
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
      // Assuming `editData` contains the updated values for the quiz
      await onEdit(id, editData);
      handleCloseEditSubject();
    } catch (error) {
      console.error('Failed to edit quiz:', error);
      // Handle error if necessary
    }
  };
  const [showCreateContent, setShowCreateContent] = useState(false);

  const handleAddContentClick = () => {
    setShowCreateContent(true);
  };
  const handleCloseCreateContent = () => {
    setShowCreateContent(false);
  };
  const [openMatchingContent, setOpenMatchingContent] = useState(false);

  const handleOpenMatchingContent = () => {
    setOpenMatchingContent(true);
  };

  const handleCloseMatchingContent = () => {
    setOpenMatchingContent(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{id}</TableCell>

        <TableCell onClick={handleOpenMatchingContent}>{prompt}</TableCell>

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
        <MenuItem onClick={handleAddContentClick}>
          <Iconify icon="eva:plus-fill" sx={{ mr: 2 }} />
          Add content
        </MenuItem>

        <MenuItem onClick={handleOpenMatchingContent}>
          <Iconify icon="eva:eye-outline" sx={{ mr: 2 }} />
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

      {/* {showCreateContent && <CreateMatchingContent id={id} onClose={handleCloseCreateContent} />}   */}
      <CreateMatchingContent
        id={id}
        prompt={prompt}
        open={showCreateContent}
        onClose={handleCloseCreateContent}
      />
      <DialogMatchingContent
        id={id}
        prompt={prompt}
        open={openMatchingContent}
        onClose={handleCloseMatchingContent}
      />

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

      <Dialog open={OpenEditDialog} onClose={handleCloseEditSubject}>
        <DialogContent>
          <InputLabel htmlFor="outlined-basic-name">Prompt:</InputLabel>
          <Input
            id="outlined-basic"
            style={{ width: 400, borderRadius: '2%' }}
            variant="outlined"
            // onBlur={handleBlur}
            onChange={handleInputChange}
            value={editData.prompt ? editData.prompt : ''}
            name="prompt"
            //   error={!!touched.courseName && !!errors.courseName}
            //   helperText={touched.courseName && errors.courseName}
          />

          <Box display="flex" justifyContent="flex-end" sx={{ pt: 2 }}>
            <Button
              variant="outlined"
              color="warning"
              onClick={handleCloseEditSubject}
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

MatchingTable.propTypes = {
  id: PropTypes.any,
  prompt: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
};
