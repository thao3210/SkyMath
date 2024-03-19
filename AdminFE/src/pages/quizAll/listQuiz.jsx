import { Helmet } from 'react-helmet-async';

import { ListQuizView } from 'src/sections/quizAll/view';

const ListQuiz = () => (
  <>
    <Helmet>
      <title> Quiz | SkyMath </title>
    </Helmet>

    <ListQuizView />
  </>
);

export default ListQuiz;
