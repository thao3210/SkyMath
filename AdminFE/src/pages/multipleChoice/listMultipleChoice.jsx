import { Helmet } from 'react-helmet-async';

import { ListMultipleChoiceQuizView } from 'src/sections/multipleChoiceQuiz/view';


const ListQuiz = () => (
  <>
    <Helmet>
      <title> Multiple Choice | SkyMath </title>
    </Helmet>

    <ListMultipleChoiceQuizView />
  </>
);

export default ListQuiz;
