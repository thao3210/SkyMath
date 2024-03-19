import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';

import TestDocSystemService from 'src/services/TestDocSystemServices';

import Iconify from 'src/components/iconify';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import AddQuizBankForm from 'src/components/add-quiz/add-quiz-bank-form';

const AddTestDocSysForm = ({ indexPage, subject, grade, province, year, closeForm }) => {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [name, setName] = useState('');
  const [timeLimit, setTime] = useState(0);
  const [selectedQuizData, setSelectedQuizData] = useState([]);
  const [openAddQuizBank, setOpenAddQuizBank] = useState(false);
  const [quizDataString, setQuizDataString] = useState('');

  const handleQuizSelect = (quizData) => {
    setSelectedQuizData(quizData);
  };

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
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

  const handleAdd = async (e) => {
    e.preventDefault();
    if (indexPage) {
      showAlert('warning', "You don't need enter index page");
    } else {
      const credentials = {
        name,
        timeLimit,
        year,
        quizzesId: selectedQuizData,
        gradeId: grade,
        subjectId: subject,
        provinceId: province,
      };

      try {
        const response = await TestDocSystemService.addTestDocument(credentials);
        if (response.status === 201) {
          showAlert('success', 'Add test successful!');
        } else {
          showAlert('error', 'Add test failed.');
          console.error('Failed to add test:', response.status);
        }
      } catch (error) {
        console.error('Failed to add test:', error);
        console.error('Server response:', error.response?.data);
        showAlert('error', 'An error occurred while adding the test.');
      }
    }
  };

  useEffect(() => {
    if (selectedQuizData) {
      setQuizDataString(selectedQuizData.join(', '));
    } else {
      setQuizDataString('');
    }
  }, [selectedQuizData]);

  return (
    <Stack direction="column" width="54%" spacing={2} marginBottom={2}>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          name="name"
          sx={{ width: 300 }}
        />

        <TextField
          id="outlined-basic"
          label="Quiz"
          variant="outlined"
          name="quiz"
          value={quizDataString}
          onChange={(e) => setSelectedQuizData(e.target.value.split(', '))}
          sx={{ width: 300 }}
        />
      </Stack>

      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <TextField
          id="outlined-basic"
          label="Time Limit"
          variant="outlined"
          onChange={(e) => setTime(e.target.value)}
          name="time"
          sx={{ width: 300 }}
        />
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="ant-design:clear-outlined" />}
            sx={{ width: 141, height: 55 }}
            onClick={handleClearState}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenAddQuizBank}
            startIcon={<Iconify icon="eva:plus-fill" />}
            sx={{ width: 141, height: 55 }}
          >
            Add Quiz
          </Button>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between" width="48%">
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<Iconify icon="material-symbols:cancel-outline" />}
          sx={{ width: 141, height: 55 }}
          onClick={closeForm}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          startIcon={<Iconify icon="eva:plus-fill" />}
          sx={{ width: 141, height: 55 }}
        >
          Add Test
        </Button>
      </Stack>

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
    </Stack>
  );
};
AddTestDocSysForm.propTypes = {
  indexPage: PropTypes.any,
  subject: PropTypes.any,
  grade: PropTypes.any,
  province: PropTypes.any,
  year: PropTypes.any,
  closeForm: PropTypes.any,
};
export default AddTestDocSysForm;
