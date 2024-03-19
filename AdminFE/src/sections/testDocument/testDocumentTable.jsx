import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
  Box,
  Stack,
  Input,
  Button,
  Dialog,
  Select,
  InputLabel,
  DialogTitle,
  DialogContent,
  FormControlLabel,
} from '@mui/material';

import Label from '../../components/label';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function TestDocumentTable({
  selected,
  id,
  name,
  description,
  content,
  contentSolve,
  price,
  year,
  isFree,
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

  const handleCloseEditSubject = () => {
    setOpenEditDialog(false);
  };

  const [editData, setEditData] = useState({
    name: '',
    description: '',
    content: null,
    contentSolve: null,
    price: 0,
    year: 0,
    isFree: false,
  });

  const handleEdit = async () => {
    try {
      await onEdit(id, editData);
      handleCloseEditSubject();
    } catch (error) {
      console.error('Failed to edit subject:', error);
    }
  };

  const handleOpenEditDialog = (prevData) => {
    setEditData({
      name: prevData.name || '',
      description: prevData.description || '',
      content: prevData.content || null,
      contentSolve: prevData.contentSolve || null,
      price: prevData.price || 0,
      year: prevData.year || 0,
      isFree: prevData.isFree || false,
    });
    setOpenEditDialog(true);
  };

  const handleInputChange = (e) => {
    const { name: inputName, value, files } = e.target;

    setEditData((prevData) => ({
      ...prevData,
      [inputName]: files ? files[0] : value,
    }));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{id}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          {name}
        </TableCell>

        <TableCell>{description}</TableCell>
        <TableCell>{content}</TableCell>
        <TableCell>{contentSolve}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>
          <Label color={isFree === true ? 'success' : 'error'}>{isFree ? 'Free' : 'Priced'}</Label>
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
        <MenuItem
          onClick={() =>
            handleOpenEditDialog({ name, description, content, contentSolve, price, year, isFree })
          }
        >
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleOpenDeleteDialog} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Test Document</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Are you sure you want to delete this document?
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
          <Stack spacing={2}>
            <InputLabel htmlFor="outlined-basic-name">Name:</InputLabel>
            <Input
              id="outlined-basic"
              style={{ width: 400, borderRadius: '2%' }}
              variant="outlined"
              onChange={handleInputChange}
              value={editData.name ? editData.name : ''}
              name="name"
            />

            <InputLabel htmlFor="outlined-basic-description">Description:</InputLabel>
            <Input
              id="outlined-basic"
              style={{ width: 400, borderRadius: '2%' }}
              variant="outlined"
              onChange={handleInputChange}
              value={editData.description ? editData.description : ''}
              name="description"
            />

            <InputLabel htmlFor="content">Content:</InputLabel>
            <Input id="content" type="file" onChange={handleInputChange} name="content" />
            <InputLabel htmlFor="contentSolve">Content Solve:</InputLabel>
            <Input id="contentSolve" type="file" onChange={handleInputChange} name="contentSolve" />
            <InputLabel htmlFor="outlined-basic-description">Price:</InputLabel>
            <Input
              id="outlined-basic"
              style={{ width: 400, borderRadius: '2%' }}
              variant="outlined"
              onChange={handleInputChange}
              value={editData.price ? editData.price : ''}
              name="price"
            />
            <Select
              labelId="year-label"
              id="year"
              value={editData.year ? editData.year : ''}
              label="Year"
              onChange={(event) => setEditData({ ...editData, year: event.target.value })}
            >
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </Select>

            <FormControlLabel
              control={<Checkbox />}
              label="Is Free"
              checked={editData.isFree}
              onChange={(event) => setEditData({ ...editData, isFree: event.target.checked })}
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
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

TestDocumentTable.propTypes = {
  id: PropTypes.any,
  name: PropTypes.any,
  description: PropTypes.any,
  content: PropTypes.any,
  contentSolve: PropTypes.any,
  price: PropTypes.any,
  year: PropTypes.number,
  isFree: PropTypes.bool,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};
