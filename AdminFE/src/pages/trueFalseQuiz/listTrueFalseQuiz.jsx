import { Helmet } from 'react-helmet-async';

import { ListTrueFalseQuizView } from 'src/sections/trueFalseQuiz/view';

const ListQuiz = () => (
  <>
    <Helmet>
      <title> True-False | SkyMath </title>
    </Helmet>

    <ListTrueFalseQuizView />
  </>
);

export default ListQuiz;
