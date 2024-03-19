import { Helmet } from 'react-helmet-async';

import { ListMatchingQuizView } from 'src/sections/matchingQuiz/view';



const ListQuiz = () => (
  <>
    <Helmet>
      <title> Matching | SkyMath </title>
    </Helmet>

    <ListMatchingQuizView />
  </>
);

export default ListQuiz;
