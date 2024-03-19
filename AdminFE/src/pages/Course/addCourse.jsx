import { Helmet } from 'react-helmet-async';

import { AddCourseView } from '../../sections/course/view';

const AddCourse = () => (
  <>
    <Helmet>
      <title> Add Course | SkyMath </title>
    </Helmet>

    <AddCourseView />
  </>
);

export default AddCourse;
