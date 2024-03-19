import { Helmet } from 'react-helmet-async';

import ListSubjectView from '../../sections/subject/view/list-subject-view';

const ListSubject = () => (
  <>
    <Helmet>
      <title> Subjects | SkyMath </title>
    </Helmet>

    <ListSubjectView />
  </>
);

export default ListSubject;
