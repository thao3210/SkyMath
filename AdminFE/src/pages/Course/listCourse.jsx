import { Helmet } from 'react-helmet-async';

import { ListCourseView } from '../../sections/course/view';

const ListCourse = () => (
  <>
    <Helmet>
      <title> Course | SkyMath </title>
    </Helmet>

    <ListCourseView />
  </>
);

export default ListCourse;
