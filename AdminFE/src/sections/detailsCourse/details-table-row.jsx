import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Stack,
  Table,
  Button,
  Dialog,
  Collapse,
  TableHead,
  TableBody,
  TextField,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import Label from '../../components/label';
import Iconify from '../../components/iconify';
import LessonTableRow from './lesson-table-row';
import LessonServices from '../../services/LessonServices';
import ThematicServices from '../../services/ThematicServices';
import CustomSnackbar from '../../components/snackbar/snackbar';

// ----------------------------------------------------------------------

export default function DetailsCourseTableRow({
  selected,
  thematicName,
  lessonDtos,
  status,
  handleClick,
  thematicId,
  onDelete,
  onLoadData,
  onDeleteLesson,
  courseId,
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openThematicOption, setOpenThematicOption] = useState(null);

  const [openLesson, setOpenLesson] = useState(false);

  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const [openAddLesson, setOpenAddLesson] = useState(false);

  const [lessonName, setLessonName] = useState('');

  const [isFree, setIsFree] = useState(false);

  const [openEditThematic, setOpenEditThematic] = useState(false);

  const [editThematicName, setEditThematicName] = useState(thematicName);

  const handleOpenAddLesson = () => {
    setOpenAddLesson(true);
  };

  const handleCloseAddLesson = () => {
    setOpenAddLesson(false);
    setLessonName('');
    setIsFree(false);
  };

  const handleOpenEditThematic = () => {
    setOpenEditThematic(true);
  };

  const handleCloseEditThematic = () => {
    setOpenEditThematic(false);
    if (editThematicName === '') {
      setEditThematicName(thematicName);
    }
  };

  const handleOpenThematicMenu = (event) => {
    setOpenThematicOption(event.currentTarget);
  };

  const handleCloseThematicMenu = () => {
    setOpenThematicOption(null);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    const credentials = { name: lessonName, isFree, thematicId };
    console.log('credentials: ', credentials);
    try {
      const response = await LessonServices.addLesson(credentials);
      if (response.status === 201) {
        showAlert('success', 'Add Lesson successful!');
        handleCloseAddLesson();
        onLoadData();
      } else {
        showAlert('error', 'Have something error when add lesson!');
        handleCloseAddLesson();
      }
    } catch (error) {
      console.error('Failed to add thematic:', error);
      showAlert('error', 'Have something error when add lesson!');
      handleCloseAddLesson();
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(thematicId);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Failed to delete grade:', error);
    }
  };

  const handleEditThematic = async () => {
    try {
      const editedName = editThematicName.trim();

      // Check if thematicName is not empty and has changed
      if (editedName !== '' && editedName !== thematicName) {
        const credentials = { name: editedName };
        const response = await ThematicServices.editThematic(thematicId, credentials);

        if (response && response.status === 204) {
          showAlert('success', 'Edit thematic successful!');
          handleCloseEditThematic();
          onLoadData();
        } else {
          showAlert('error', 'Have something error when edit thematic!');
          handleCloseEditThematic();
        }
      } else {
        showAlert('info', 'No changes made to the thematic name.');
        handleCloseEditThematic();
      }
    } catch (error) {
      console.error('Failed to edit thematic:', error);
      showAlert('error', 'Have something error when edit thematic!');
      handleCloseEditThematic();
    }
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onClick={() => setOpenLesson(!openLesson)}
      >
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell padding="checkbox">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenLesson(!openLesson)}
          >
            {openLesson ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle2" noWrap sx={{ pl: 2 }}>
              {thematicName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Label color={status === true ? 'success' : 'error'}>
            {status ? 'Active' : 'Banned'}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenThematicMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openLesson} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {lessonDtos && lessonDtos.length > 0 ? (
                <>
                  <Typography variant="h6" gutterBottom component="div">
                    Lesson
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Free</TableCell>
                        <TableCell>{null}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lessonDtos.map((lessonItems) => (
                        <LessonTableRow
                          key={lessonItems.id}
                          lessonId={lessonItems.id}
                          lessonName={lessonItems.name}
                          isFree={lessonItems.isFree}
                          onDeleteLesson={onDeleteLesson}
                          onLoadData={onLoadData}
                          courseId={courseId}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </>
              ) : (
                <Typography variant="h6" gutterBottom component="div">
                  No Data
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openThematicOption}
        anchorEl={openThematicOption}
        onClose={handleCloseThematicMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpenAddLesson}>
          <Iconify icon="eva:plus-fill" sx={{ mr: 2 }} />
          Add Lesson
        </MenuItem>

        <MenuItem onClick={handleOpenEditThematic}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleOpenDeleteDialog} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Dialog open={openAddLesson} onClose={handleCloseAddLesson}>
        <DialogTitle>Add New Lesson</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            label="Lesson Name"
            variant="outlined"
            name="lessonName"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
                color="primary"
              />
            }
            label="Free"
          />

          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" onClick={handleAddLesson}>
              Add Lesson
            </Button>
            <Button variant="contained" color="warning" onClick={handleCloseAddLesson}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditThematic} onClose={handleCloseEditThematic}>
        <DialogTitle>Edit Thematic</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            label="Thematic Name"
            variant="outlined"
            name="editThematicName"
            value={editThematicName}
            onChange={(e) => setEditThematicName(e.target.value)}
          />

          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" onClick={handleEditThematic}>
              Edit Thematic
            </Button>
            <Button variant="contained" color="warning" onClick={handleCloseEditThematic}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Are you sure you want to delete this course?
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

DetailsCourseTableRow.propTypes = {
  handleClick: PropTypes.func,
  lessonDtos: PropTypes.array,
  thematicName: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.bool,
  thematicId: PropTypes.any,
  courseId: PropTypes.any,
  onDelete: PropTypes.func,
  onLoadData: PropTypes.func,
  onDeleteLesson: PropTypes.func,
};
