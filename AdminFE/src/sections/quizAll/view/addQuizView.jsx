import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Link from 'src/components/link';

import AddQuizForm from '../../../components/add-quiz/add-new-quiz-form';

const AddQuizView = () => (
  <Container>
    <Breadcrumbs
      sx={{ mb: 5 }}
      separator={<NavigateNextIcon fontSize="large" />}
      aria-label="breadcrumb"
    >
      <Link href="/">
        <Stack direction="row" alignItems="center">
          <HomeRoundedIcon sx={{ mr: 0.5 }} fontSize="medium" />
          <Typography variant="h5">HomePage</Typography>
        </Stack>
      </Link>
      <Link href="/quiz">
        <Stack direction="row" alignItems="center">
          <Typography variant="h5">Quiz</Typography>
        </Stack>
      </Link>

      <Typography variant="h5" color="text.primary">
        Add New Quiz
      </Typography>
    </Breadcrumbs>
    <AddQuizForm />
  </Container>
);

export default AddQuizView;
