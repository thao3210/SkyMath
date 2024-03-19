import { parseInt } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import {
  Radio,
  Input,
  Dialog,
  Button,
  Checkbox,
  Typography,
  RadioGroup,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  FormControlLabel,
} from '@mui/material';

import MultipleChoiceService from 'src/services/MultipleChoiceService';

import CustomSnackbar from 'src/components/snackbar/snackbar';

function DialogDetailMultipleChoice({ id, prompt, open, onClose }) {
  const [contentData, setContentData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [answerType, setAnswerType] = useState('Single');
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };
  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };
  const fetchQuizData = useCallback(async () => {
    try {
      const response = await MultipleChoiceService.getQuizContent(id);
      if (response?.data && response?.status === 200) {
        const { data } = response.data;
        setEditedContent({
          prompt: data.prompt,
          question: data.question.questionContent,
          correctAnswer: data.correctAnswer,
        });
        setContentData(response.data.data);
        setAnswerType(response.data.answerType);
        if (response.data.answerType === 'Multiple') {
          setSelectedAnswers(response.data.data.correctAnswer.split(',').map(Number));
        } else {
          setSelectedAnswers([parseInt(response.data.data.correctAnswer)]);
        }
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [id]);
  const handleAnswerChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedAnswers([...selectedAnswers, parseInt(value)]);
    } else {
      setSelectedAnswers(selectedAnswers.filter((answer) => answer !== parseInt(value)));
    }
  };
  useEffect(() => {
    if (open) {
      fetchQuizData();
    }
  }, [open, fetchQuizData]);
  const [editedContent, setEditedContent] = useState({
    prompt: '',
    question: '',
    correctAnswer: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContent({ ...editedContent, [name]: value });
  };
  const handleEdit = async () => {
    try {
      await MultipleChoiceService.editQuiz(id, editedContent);
      fetchQuizData();
      showAlert('success', 'Edit successful!');
      onClose();
    } catch (error) {
      console.error('Failed to edit quiz:', error);
      showAlert('error', 'Edit failed. Something went wrong!');
    }
  };

  // const resetEditedContent = () => {
  //   setEditedContent({ ASide: '', BSide: '', AFile: '', BFile: '' });
  //   setImagePreviewA(null);
  //   setImagePreviewB(null);
  //   setImageA(null);
  //   setImageB(null);
  // };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
      <DialogTitle>{prompt}</DialogTitle>
      <DialogContent>
        {contentData && (
          <>
            <Typography variant="subtitle1">Question:</Typography>
            <Typography>{contentData.question.questionContent}</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="answer"
                name="answer"
                value={selectedAnswers[0]?.toString() || ''}
                onChange={handleAnswerChange}
              >
                {contentData.answer.map((choice) => (
                  <FormControlLabel
                    key={choice.id}
                    value={choice.id.toString()}
                    control={answerType === 'Multiple' ? <Checkbox /> : <Radio />}
                    checked={selectedAnswers.includes(choice.id)}
                    label={
                      choice.answerContentType === 'image' ? (
                        <img
                          src={choice.answerContent}
                          alt={`Answer ${choice.id}`}
                          style={{ maxWidth: 200 }}
                        />
                      ) : (
                        choice.answerContent
                      )
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </>
        )}
        <InputLabel htmlFor="outlined-basic-question">Prompt</InputLabel>
        <Input
          fullWidth
          name="prompt"
          value={editedContent.prompt}
          onChange={handleInputChange}
          style={{ marginTop: '1rem' }}
        />
        <InputLabel htmlFor="outlined-basic-question">Question</InputLabel>
        <Input
          fullWidth
          multiline
          rows={4}
          name="question"
          value={editedContent.question}
          onChange={handleInputChange}
          style={{ marginTop: '1rem' }}
        />
        <InputLabel htmlFor="outlined-basic-question">New Correct Answer</InputLabel>
        <Input
          fullWidth
          name="correctAnswer"
          value={editedContent.correctAnswer}
          onChange={handleInputChange}
          style={{ marginTop: '1rem' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEdit} color="primary">
          Edit
        </Button>

        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogDetailMultipleChoice.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  prompt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default DialogDetailMultipleChoice;
