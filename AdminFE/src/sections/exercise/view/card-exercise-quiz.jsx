import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';

import QuizAnswer from 'src/components/card/quizcard/QuizAnswer';
import QuizHeader from 'src/components/card/quizcard/QuizHeader';

const CardExerciseQuiz = ({ questionId, questionType, data }) => (
  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <Stack spacing={1}>
        <QuizHeader questionId={questionId} questionType={questionType} data={data} />
        <QuizAnswer data={data} questionType={questionType} />
      </Stack>
    </CardContent>
  </Card>
);

CardExerciseQuiz.propTypes = {
  questionId: PropTypes.any,
  questionType: PropTypes.any,
  data: PropTypes.any,
};

export default CardExerciseQuiz;
