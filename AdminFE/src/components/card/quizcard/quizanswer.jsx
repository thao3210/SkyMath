import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';

import TrueFalseAnswer from './answer/TrueFalseAns';
import MultipleChoiceAnswer from './answer/MultipleChoiceAns';

const QuestionTypes = {
  TRUE_FALSE: 'true_false',
  MULTIPLE_CHOICE: 'multiple_choice',
  MATCHING: 'matching',
  FILL_BLANK: 'fill_blank',
};

const QuizAnswer = ({ questionType, data }) => {
  switch (questionType) {
    case QuestionTypes.TRUE_FALSE:
      return <TrueFalseAnswer data={data} />;
    case QuestionTypes.MULTIPLE_CHOICE:
      return <MultipleChoiceAnswer data={data} />;
    case QuestionTypes.MATCHING:
      return null;
    case QuestionTypes.FILL_BLANK:
      return null;
    default:
      return <Typography variant="h6">No Answer Data</Typography>;
  }
};

QuizAnswer.propTypes = {
  questionType: PropTypes.any,
  data: PropTypes.any,
};

export default QuizAnswer;
