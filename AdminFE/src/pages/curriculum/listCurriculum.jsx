import { Helmet } from 'react-helmet-async';

import { ListCurriculumView } from '../../sections/curriculum/view';

const ListCurriculum = () => (
  <>
    <Helmet>
      <title> Curriculum | SkyMath </title>
    </Helmet>

    <ListCurriculumView />
  </>
);

export default ListCurriculum;
