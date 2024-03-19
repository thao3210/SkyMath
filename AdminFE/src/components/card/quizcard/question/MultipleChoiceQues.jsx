import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const MultipleChoiceQues = ({ data }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <Typography variant="body1" fontWeight="bold">
      Question Content:
    </Typography>
    {data.question.questionContentType === 'image' ? (
      <img src={data.question.questionContent} alt="Question" width={500}/>
    ) : (
      <Typography variant="body1" component="span">
        {data.question.questionContent}
      </Typography>
    )}
  </Stack>
);

MultipleChoiceQues.propTypes = {
  data: PropTypes.any,
};

export default MultipleChoiceQues;
