import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MatchingQues from './question/MatchingQues';
import TrueFalseQues from './question/TrueFalseQues';
import FillBlankQues from './question/FillBlankQues';
import MultipleChoiceQues from './question/MultipleChoiceQues';

const QuestionTypes = {
  TRUE_FALSE: 'true_false',
  MULTIPLE_CHOICE: 'multiple_choice',
  MATCHING: 'matching',
  FILL_BLANK: 'fill_blank',
};

const QuizHeader = ({ questionId, questionType, data }) => {
  const formatQuestionType = (inputString) => {
    const words = inputString.split('_');
    const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    const formattedString = formattedWords.join(' ');
    return formattedString;
  };

  const renderQuestion = () => {
    switch (questionType) {
      case QuestionTypes.MULTIPLE_CHOICE:
        return <MultipleChoiceQues data={data} />;
      case QuestionTypes.TRUE_FALSE:
        return <TrueFalseQues data={data} />;
      case QuestionTypes.FILL_BLANK:
        return <FillBlankQues data={data} />;
      case QuestionTypes.MATCHING:
        return <MatchingQues data={data} />;
      default:
        return <Typography variant="h6">No Question Data</Typography>;
    }
  };

  return (
    <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
      <Stack direction="column" spacing={1} maxWidth="70%">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1" fontWeight="bold">
            ID:
          </Typography>
          <Typography variant="caption text">{questionId}</Typography>
        </Stack>

        {renderQuestion()}
      </Stack>

      <Stack direction="column" maxWidth="30%">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1" fontWeight="bold">
            Question Type:
          </Typography>
          <Typography variant="caption text">{formatQuestionType(questionType)}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

QuizHeader.propTypes = {
  questionId: PropTypes.any,
  questionType: PropTypes.any,
  data: PropTypes.any,
};

export default QuizHeader;
