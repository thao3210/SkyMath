import { useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Grid,
  Stack,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import MatchingService from 'src/services/MatchingServices';

import Iconify from 'src/components/iconify';

import CustomSnackbar from '../snackbar/snackbar';

const CreateMatchingContent = ({ id, open, onClose, prompt }) => {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreviewB, setImagePreviewB] = useState(null);
  const [imageB, setImageB] = useState(null);

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };
  const [matchingData, setMatchingData] = useState({});
  const handleAdd = async () => {
    const formData = new FormData();
    try {
      formData.append('ASide', matchingData.ASide);
      formData.append('BSide', matchingData.BSide);
      formData.append('AFile', image);
      formData.append('BFile', imageB);
      formData.append('MatchingQuizId', id);

      const response = await MatchingService.addQuizContent(formData);

      if (response && response.status === 201) {
        showAlert('success', 'Quiz added successfully!');
      } else {
        showAlert('success', 'Quiz added successfully!');
      }
    } catch (error) {
      console.error('Failed to add quiz:', error);
      console.error('Server response:', error.response?.data);
      showAlert('error', 'An error occurred while adding the quiz.');
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMatchingData((prevData) => ({
      ...prevData,
      [name]: value,
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
    <>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />

      <Dialog open={open} onClose={onClose} maxWidth="md">
        <CustomSnackbar
          open={alert.isOpen}
          onClose={handleCloseAlert}
          message={alert.message}
          severity={alert.severity}
        />
        <DialogTitle>{prompt}</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="flex-start" sx={{ pt: 2 }}>
            <Box>
              <TextField
                sx={{ mb: 2, width: 200 }}
                id="outlined-basic"
                label="ASide"
                variant="outlined"
                // onBlur={handleBlur}
                onChange={handleInputChange}
                name="ASide"
                //   error={!!touched.courseName && !!errors.courseName}
                //   helperText={touched.courseName && errors.courseName}
              />

              <Grid item xs={6} sx={{ p: 0, mr: 1 }}>
                <Box>
                  <Typography variant="h6">AImage</Typography>
                  <Stack direction="column" spacing={2}>
                    {imagePreview && (
                      <img
                        src={imagePreview}
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
                      <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            </Box>
            <Box>
              <TextField
                sx={{ mb: 2, width: 250 }}
                id="outlined-basic"
                label="BSide"
                variant="outlined"
                // onBlur={handleBlur}
                onChange={handleInputChange}
                name="BSide"
                //   error={!!touched.courseName && !!errors.courseName}
                //   helperText={touched.courseName && errors.courseName}
              />

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
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            sx={{ ml: 2, background: '#C1F2B0', color: '#416D19' }}
            onClick={handleAdd}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add content
          </Button>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
CreateMatchingContent.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  prompt: PropTypes.any.isRequired,
};
export default CreateMatchingContent;
