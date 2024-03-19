import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,Grid,Card,Stack,Dialog,Button,CardMedia,TextField,Typography,DialogTitle,CardContent,DialogContent,DialogActions,
} from '@mui/material';

import MatchingService from 'src/services/MatchingServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

function DialogMatchingContent({ id, prompt, open, onClose }) {
  const [contentData, setContentData] = useState({ aSide: [], bSide: [] });
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedContent, setEditedContent] = useState({ ASide: '', BSide: '', AFile: '', BFile: '' });
  const [imagePreviewA, setImagePreviewA] = useState(null);
  const [imageA, setImageA] = useState(null);
  const [imagePreviewB, setImagePreviewB] = useState(null);
  const [imageB, setImageB] = useState(null);

  const fetchQuizData = useCallback(async () => {
    try {
      const response = await MatchingService.getQuizContent(id);
      if (response?.data && response?.status === 200) {
        setContentData(response.data.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [id]);

  useEffect(() => {
    if (open) {
      fetchQuizData();
    }
  }, [open, fetchQuizData]);

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await MatchingService.deleteQuizContent(itemId);

      if (response && response.status === 204) {
        showAlert('success', 'Delete successful!');
        handleCloseDeleteDialog();
        fetchQuizData();
      } else {
        showAlert('error', 'Cannot Delete. Have something wrong!');
      }
    } catch (error) {
      console.error('Failed to delete slide:', error);
      showAlert('error', 'An error occurred.');
    }
  };
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = (itemId) => {
    setSelectedItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEdit = (itemId, initialData) => {
    setSelectedItemId(itemId);
    setEditedContent(initialData || { ASide: '', BSide: '', AFile: '', BFile: '' });
    setImagePreviewA(initialData?.AFile ? initialData.AFile : null);
    setImagePreviewB(initialData?.BFile ? initialData.BFile : null);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();
    try {
      formData.append('BSide', editedContent.BSide);
      formData.append('ASide', editedContent.ASide);
      if (imageA) {
        formData.append('AFile', imageA);
      }

      if (imageB) {
        formData.append('BFile', imageB);
      }

      await MatchingService.editContent(selectedItemId, formData);
      fetchQuizData();
      showAlert('success', 'Edit successful!');
      setEditDialogOpen(false); // Close the dialog
      resetEditedContent(); // Reset the edited content
    } catch (error) {
      console.error('Failed to edit quiz:', error);
      showAlert('error', 'Edit failed. Something went wrong!');
    }
  };

  const resetEditedContent = () => {
    setEditedContent({ ASide: '', BSide: '', AFile: '', BFile: '' });
    setImagePreviewA(null);
    setImagePreviewB(null);
    setImageA(null);
    setImageB(null);
  };

  const handleFileChangeA = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewA(reader.result);
        setImageA(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChangeB = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewB(reader.result);
        setImageB(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
      <DialogTitle>{prompt}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {contentData.aSide.map((aItem) => {
            const matchingBItem = contentData.bSide.find((bItem) => bItem.id === aItem.id);
            return (
              <React.Fragment key={aItem.id}>
                <Grid item xs={6}>
                  <Card>
                    {aItem.contentType === 'image' ? (
                      <CardMedia
                        style={{ width: 200 }}
                        component="img"
                        src={aItem.content}
                        alt={`Matching Image ${aItem.id}`}
                      />
                    ) : (
                      <CardContent>
                        <Typography>{aItem.content}</Typography>
                      </CardContent>
                    )}
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  {matchingBItem && matchingBItem.contentType === 'image' ? (
                    <Card>
                      <CardMedia
                        style={{ width: 200 }}
                        component="img"
                        src={matchingBItem.content}
                        alt={`Matching Image ${matchingBItem.id}`}
                      />
                    </Card>
                  ) : (
                    <Card>
                      <CardContent>
                        <Typography>{matchingBItem ? matchingBItem.content : 'No data'}</Typography>
                      </CardContent>
                    </Card>
                  )}
                  <DialogActions>
                  <Button onClick={() => handleEdit(aItem.id, { ASide: aItem.content, BSide: matchingBItem ? matchingBItem.content : '', AFile: aItem.contentType === 'image' ? aItem.content : '', BFile: matchingBItem && matchingBItem.contentType === 'image' ? matchingBItem.content : '' })} color="primary">
                      Edit
                    </Button>
                    <Button onClick={() => handleOpenDeleteDialog(aItem.id)} color="secondary">
                      Delete
                    </Button>
                  </DialogActions>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md">
        <DialogTitle>Edit Content</DialogTitle>
        <DialogContent>
          <TextField
            label="ASide"
            value={editedContent.ASide}
            onChange={(e) => setEditedContent({ ...editedContent, ASide: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="BSide"
            value={editedContent.BSide}
            onChange={(e) => setEditedContent({ ...editedContent, BSide: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Grid item xs={6} sx={{ p: 0, ml: 1 }}>
            <Box>
              <Typography variant="h6">AImage</Typography>
              <Stack direction="column" spacing={2}>
                {imagePreviewA && (
                  <img
                    src={imagePreviewA}
                    alt="Preview"
                    style={{ maxWidth: 100, maxHeight: 100, borderRadius: 4 }}
                  />
                )}
                <Button
                  sx={{ width: 18, height: 18, background: 'transparent' }}
                  variant="contained"
                  component="label"
                >
                  <CloudUploadIcon sx={{ width: 18, color: 'orange' }} />
                  <input type="file" hidden onChange={handleFileChangeA} />
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ p: 0, ml: 1 }}>
            <Box>
              <Typography variant="h6">BImage</Typography>
              <Stack direction="column" spacing={2}>
                {imagePreviewB && (
                  <img
                    src={imagePreviewB}
                    alt="Preview"
                    style={{ maxWidth: 100, maxHeight: 100, borderRadius: 4 }}
                  />
                )}
                <Button
                  sx={{ width: 18, height: 18, background: 'transparent' }}
                  variant="contained"
                  component="label"
                >
                  <CloudUploadIcon sx={{ width: 18, color: 'orange' }} />
                  <input type="file" hidden onChange={handleFileChangeB} />
                </Button>
              </Stack>
            </Box>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(selectedItemId)}
              sx={{ ml: 1 }}
            >
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}

DialogMatchingContent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  prompt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default DialogMatchingContent;
