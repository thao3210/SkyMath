import { useState } from 'react';
import PropTypes from 'prop-types';

// import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box, Input, Button, Dialog, InputLabel, DialogTitle, DialogContent } from '@mui/material';

import Label from '../../components/label';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function SubjectTable({
  selected,
  name,
  description,
  createdDate,
  lastModifiedDate,
  status,
  handleClick,
  id,
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

  const handleCloseEditSubject = () => {
    setOpenEditDialog(false);
  };

  const [editData, setEditData] = useState({
    name: '',
    description: '',
  });
  const handleOpenEditDialog = () => {
    setEditData({
      name,
      description,
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
      handleCloseEditSubject();
    } catch (error) {
      console.error('Failed to edit subject:', error);
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>{createdDate}</TableCell>
        <TableCell>{lastModifiedDate}</TableCell>

        <TableCell>
          <Label color={status === true ? 'success' : 'error'}>
            {status ? 'Active' : 'Banned'}
          </Label>
        </TableCell>

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
        <DialogTitle>Delete Subject</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Are you sure you want to delete this subject?
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
          <Typography variant="body2" sx={{ mb: 2 }}>
          <InputLabel htmlFor="outlined-basic-name">Name Subject:</InputLabel>
            <Input
              id="outlined-basic"
              style={{ width: 400,borderRadius: '2%' }}
              variant="outlined"
              // onBlur={handleBlur}
              onChange={handleInputChange}
              value={editData.name ? editData.name : ''}
              name="name"
              //   error={!!touched.courseName && !!errors.courseName}
              //   helperText={touched.courseName && errors.courseName}
            />
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
          <InputLabel htmlFor="outlined-basic-description">Description:</InputLabel>
            <Input
              id="outlined-basic"
              style={{ width: 400,borderRadius: '2%' }}
              variant="outlined"
              // onBlur={handleBlur}
              onChange={handleInputChange}
              value={editData.description ? editData.description : ''}
              name="description"
              //   error={!!touched.courseName && !!errors.courseName}
              //   helperText={touched.courseName && errors.courseName}
            />
          </Typography>

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

SubjectTable.propTypes = {
  name: PropTypes.any,
  description: PropTypes.any,
  createdDate: PropTypes.any,
  lastModifiedDate: PropTypes.any,
  handleClick: PropTypes.func,
  status: PropTypes.any,
  selected: PropTypes.any,
  id: PropTypes.any,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
};
