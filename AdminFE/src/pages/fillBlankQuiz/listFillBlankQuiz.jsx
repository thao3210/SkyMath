import { Helmet } from 'react-helmet-async';

import { ListFillBlankQuizView } from 'src/sections/fillBlankQuiz/view';

const ListQuiz = () => (
  <>
    <Helmet>
      <title> FillBlank | SkyMath </title>
    </Helmet>

    <ListFillBlankQuizView />
  </>
);

export default ListQuiz;
