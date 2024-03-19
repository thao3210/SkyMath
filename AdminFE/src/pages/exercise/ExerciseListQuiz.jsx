import { Helmet } from 'react-helmet-async';

import { ListExerciseQuiz } from 'src/sections/exercise/view';

const ExerciseListQuiz = () => (
  <>
    <Helmet>
      <title> Quiz in Exercise | SkyMath </title>
    </Helmet>

    <ListExerciseQuiz />
  </>
);

export default ExerciseListQuiz;
