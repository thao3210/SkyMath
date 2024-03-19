import { useState } from 'react';
import PropTypes from 'prop-types';

// import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Grid,
  Stack,
  Input,
  Button,
  Dialog,
  Checkbox,
  InputLabel,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import Label from '../../components/label';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function TrueFalseTable({
  selected,
  id,
  prompt,
  question,
  questionType,
  questionFile,
  quizThematicId,
  difficultyId,
  answer,
  handleClick,
  onDelete,
  onEdit,
}) {
  const [open, setOpen] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

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

  const [openImageDataDialog, setOpenImageDataDialog] = useState(false);

  const handleOpenImageDialog = () => {
    setOpenImageDataDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDataDialog(false);
  };

  const [OpenEditDialog, setOpenEditDialog] = useState(false);

  const handleCloseEditSubject = () => {
    setOpenEditDialog(false);
  };

  const [editData, setEditData] = useState({
    prompt: '',
    question: '',
    questionFile: image,
    difficultyId: 0,
    quizThematicId: 0,
    answer: false,
  });
  const handleEdit = async () => {
    try {
      await onEdit(id, editData);
      handleCloseEditSubject();
    } catch (error) {
      console.error('Failed to edit subject:', error);
    }
  };

  const handleOpenEditDialog = () => {
    setEditData({
      prompt,
      question,
      answer,
      questionFile,
      difficultyId,
      quizThematicId,
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
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
        <TableCell>
          {questionType === 'text' && <Typography>{question}</Typography>}
          {questionType === 'image' && (
            <Stack direction="row" alignItems="center" spacing={2} onClick={handleOpenImageDialog}>
              <img
                alt={question}
                src={question}
                style={{ width: 100, height: 100, borderRadius: '2%' }}
              />
            </Stack>
          )}
        </TableCell>

        <TableCell>{questionType}</TableCell>
        <TableCell>
          <Label color={answer === true ? 'success' : 'error'}>{answer ? 'True' : 'False'}</Label>
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
      <Dialog open={openImageDataDialog} onClose={handleCloseImageDialog}>
        <DialogContent>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="warning" onClick={handleCloseImageDialog}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={OpenEditDialog} onClose={handleCloseEditSubject}>
        <DialogContent>
          <Stack spacing={2}>
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

            <InputLabel htmlFor="outlined-basic-description">Question:</InputLabel>
            <Input
              id="outlined-basic"
              style={{ width: 400, borderRadius: '2%' }}
              variant="outlined"
              // onBlur={handleBlur}
              onChange={handleInputChange}
              value={editData.question ? editData.question : ''}
              name="question"
              //   error={!!touched.courseName && !!errors.courseName}
              //   helperText={touched.courseName && errors.courseName}
            />

            <InputLabel htmlFor="outlined-basic-description">Answer:</InputLabel>
            <Input
              id="outlined-basic"
              style={{ width: 400, borderRadius: '2%' }}
              variant="outlined"
              // onBlur={handleBlur}
              onChange={handleInputChange}
              value={editData.answer ? editData.answer : ''}
              name="answer"
              //   error={!!touched.courseName && !!errors.courseName}
              //   helperText={touched.courseName && errors.courseName}
            />
            {/* <Select
              labelId="answer-label"
              id="answer"
              value={editData.answer ? editData.answer : ''}
              // value={selectedQuizThematic }
              // onChange={handleInputChange}
              onChange={(e) => setSelectedQuizThematic(e.target.value)}
              label="answer"
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select> */}

            <Grid item xs={6} sx={{ p: 0 }}>
              <Box>
                <Typography variant="h6">Images</Typography>
                <Stack direction="column" spacing={2}>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ maxWidth: 330, maxHeight: 330, borderRadius: 4 }}
                    />
                  )}
                  <Button
                    sx={{ width: 200, background: 'orange' }}
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload File
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                </Stack>
              </Box>
            </Grid>
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

TrueFalseTable.propTypes = {
  id: PropTypes.any,
  prompt: PropTypes.any,
  question: PropTypes.any,
  questionType: PropTypes.any,
  questionFile: PropTypes.any,
  difficultyId: PropTypes.any,
  quizThematicId: PropTypes.any,
  answer: PropTypes.bool,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};
