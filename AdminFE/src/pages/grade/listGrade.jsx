import { Helmet } from 'react-helmet-async';

import { ListGradeView } from '../../sections/grade/view';

const ListGrade = () => (
  <>
    <Helmet>
      <title> Grade | SkyMath </title>
    </Helmet>

    <ListGradeView />
  </>
);

export default ListGrade;
