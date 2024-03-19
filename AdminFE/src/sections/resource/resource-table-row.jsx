import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Table, TableBody, TableHead } from '@mui/material';

import ResourceServices from 'src/services/ResourceServices';

import AddQuizBankForm from 'src/components/add-quiz/add-quiz-bank-form';

import { EditResourceView } from './view';
import Iconify from '../../components/iconify';
import VideoInterTableRow from './video-interact-row';

// ----------------------------------------------------------------------

export default function ResourceTableRow({
  resourceId,
  resourceName,
  resourceContent,
  resourceType,
  onDeleteResource,
  onLoadData,
  showAlert,
}) {
  const [videoInteract, setVideoInteract] = useState([]);
  const [openResourceOption, setOpenResourceOption] = useState(null);
  const [openEditResource, setOpenEditResource] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddQuiz, setOpenAddQuiz] = useState(false);
  const [selectedQuizData, setSelectedQuizData] = useState([]);
  const [openAddQuizBank, setOpenAddQuizBank] = useState(false);
  const [quizDataString, setQuizDataString] = useState('');
  const [openVideoInterDialog, setOpenVideoInteractDialog] = useState(false);
  const [timeQuiz, setTimeQuiz] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleQuizSelect = (quizData) => {
    setSelectedQuizData(quizData);
  };

  const handleOpenAddQuizBank = () => {
    setOpenAddQuizBank(true);
  };

  const handleCloseAddQuizBank = () => {
    setOpenAddQuizBank(false);
  };

  const handleClearState = () => {
    setSelectedQuizData(null);
  };

  const handleOpenResourceMenu = (event) => {
    setOpenResourceOption(event.currentTarget);
  };

  const handleCloseResourceMenu = () => {
    setOpenResourceOption(null);
  };

  const handleOpenAddQuiz = () => {
    setOpenAddQuiz(true);
  };

  const handleCloseAddQuiz = () => {
    setOpenAddQuiz(false);
  };

  const handleOpenEditResource = () => {
    setOpenEditResource(true);
  };

  const handleCloseEditResource = () => {
    setOpenEditResource(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenVideoInteactDialog = () => {
    setOpenVideoInteractDialog(true);
  };

  const handleCloseVideoInterDialog = () => {
    setOpenVideoInteractDialog(false);
  };

  const handleDelete = async () => {
    try {
      await onDeleteResource(resourceId);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Failed to delete grade:', error);
    }
  };

  const clearState = () => {
    setSelectedQuizData('');
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const renderVideoInteractDialog = () => (
    <DialogContent
      style={{
        overflow: 'auto',
        maxHeight: 400,
      }}
    >
      <Table size="small" aria-label="video-interact" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Seconds</TableCell>
            <TableCell>QuizId</TableCell>
            <TableCell>{null}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {videoInteract.map((item, index) => (
            <VideoInterTableRow key={index} quizId={item.quizId} seconds={item.seconds} />
          ))}
        </TableBody>
      </Table>
    </DialogContent>
  );

  const handleAddQuizResource = async (e) => {
    e.preventDefault();
    if (!selectedQuizData) {
      showAlert('error', 'You must choose quiz');
    } else if (
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59 ||
      seconds < 0 ||
      seconds > 59
    ) {
      showAlert('error', 'Please enter valid values for hours, minutes, and seconds.');
    } else {
      const quizId = String(selectedQuizData[0]);
      const credentials = [
        {
          seconds: timeQuiz,
          quizId,
          resourceId,
        },
      ];

      try {
        const response = await ResourceServices.addQuizResource(credentials);
        if (response.status === 200) {
          showAlert('success', 'Add quiz successful!');
          clearState();
          handleCloseAddQuiz();
        } else {
          showAlert('error', 'Add quiz failed.');
          console.error('Failed to add quiz:', response.status);
        }
      } catch (error) {
        console.error('Failed to add quiz:', error);
        console.error('Server response:', error.response?.data);
        showAlert('error', 'An error occurred while adding the quiz.');
      }
    }
  };

  const renderTime = () => (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <TextField
        margin="dense"
        id="outlined-basic"
        label="Hours"
        variant="outlined"
        type="number"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        sx={{ width: 90 }}
      />
      <Typography>:</Typography>
      <TextField
        margin="dense"
        id="outlined-basic"
        label="Minutes"
        variant="outlined"
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        sx={{ width: 90 }}
      />
      <Typography>:</Typography>
      <TextField
        margin="dense"
        id="outlined-basic"
        label="Seconds"
        variant="outlined"
        type="number"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
        sx={{ width: 90 }}
      />
    </Stack>
  );

  useEffect(() => {
    const fetchVideoInteract = async () => {
      try {
        const response = await ResourceServices.getVideoInter(resourceId);
        if (response && response.status === 200) {
          setVideoInteract(response.data);
        } else {
          console.error('Failed to add quiz:', response.status);
        }
      } catch (error) {
        console.error('Failed to add quiz:', error);
        console.error('Server response:', error.response?.data);
      }
    };
    fetchVideoInteract();
  }, [resourceId, showAlert]);

  useEffect(() => {
    if (selectedQuizData) {
      setQuizDataString(selectedQuizData.join(', '));
    } else {
      setQuizDataString('');
    }
  }, [selectedQuizData]);

  useEffect(() => {
    const totalSeconds =
      (parseInt(hours, 10) || 0) * 3600 +
      (parseInt(minutes, 10) || 0) * 60 +
      (parseInt(seconds, 10) || 0);
    setTimeQuiz(totalSeconds);
  }, [hours, minutes, seconds]);

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell>{resourceName}</TableCell>

        <TableCell>{resourceContent}</TableCell>

        <TableCell>{resourceType}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenResourceMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openResourceOption}
        anchorEl={openResourceOption}
        onClose={handleCloseResourceMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {resourceType === 'Video' ? (
          <MenuItem onClick={handleOpenVideoInteactDialog}>
            <Iconify icon="eva:eye-outline" sx={{ mr: 2 }} />
            Show Quiz
          </MenuItem>
        ) : null}

        {resourceType === 'Video' ? (
          <MenuItem onClick={handleOpenAddQuiz}>
            <Iconify icon="eva:plus-fill" sx={{ mr: 2 }} />
            Add Quiz
          </MenuItem>
        ) : null}

        <MenuItem onClick={handleOpenEditResource}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleOpenDeleteDialog} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Dialog open={openAddQuiz} onClose={handleCloseAddQuiz} fullWidth maxWidth="md">
        <DialogContent>
          <Typography variant="h5">Add Quiz to Resource</Typography>
          <Stack direction="row" marginTop={2} spacing={3}>
            <iframe
              width="560"
              height="315"
              src={resourceContent}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            <Stack direction="column" justifyContent="space-between">
              <Stack spacing={2}>
                <TextField
                  margin="dense"
                  id="outlined-basic"
                  label="Quiz"
                  variant="outlined"
                  name="quiz"
                  value={quizDataString}
                  onChange={(e) => setSelectedQuizData(e.target.value.split(', '))}
                  sx={{ width: 300 }}
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleOpenAddQuizBank}
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    sx={{ width: 141, height: 40 }}
                  >
                    Add Quiz
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<Iconify icon="ant-design:clear-outlined" />}
                    sx={{ width: 142, height: 40 }}
                    onClick={handleClearState}
                  >
                    Clear
                  </Button>
                </Stack>
              </Stack>

              {renderTime()}

              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  color="danger"
                  startIcon={<Iconify icon="material-symbols:cancel-outline" />}
                  sx={{ width: 142, height: 50 }}
                  onClick={handleCloseAddQuiz}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddQuizResource}
                  startIcon={<Iconify icon="eva:checkmark-fill" />}
                  sx={{ width: 141, height: 50 }}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openVideoInterDialog}
        onClose={handleCloseVideoInterDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" color="text.primary">
              Video Interact
            </Typography>
          </Stack>
        </DialogTitle>
        {renderVideoInteractDialog()}
      </Dialog>

      <Dialog open={openAddQuizBank} onClose={handleCloseAddQuizBank}>
        <DialogContent>
          <Typography variant="h5" marginBottom={3}>
            Add Quiz From Bank
          </Typography>
          <AddQuizBankForm
            onSelectQuiz={handleQuizSelect}
            closeAddQuizTestSys={handleCloseAddQuizBank}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openEditResource} onClose={handleCloseEditResource}>
        <DialogTitle>Edit Resource</DialogTitle>
        <EditResourceView
          resourceId={resourceId}
          showAlert={showAlert}
          onLoadData={onLoadData}
          handleCloseEditResource={handleCloseEditResource}
        />
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Grade</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Are you sure you want to delete this grade?
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

ResourceTableRow.propTypes = {
  resourceId: PropTypes.any,
  resourceName: PropTypes.any,
  resourceContent: PropTypes.any,
  resourceType: PropTypes.any,
  onDeleteResource: PropTypes.func,
  showAlert: PropTypes.func,
  onLoadData: PropTypes.func,
};
