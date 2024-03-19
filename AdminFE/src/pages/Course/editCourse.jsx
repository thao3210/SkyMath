import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { EditCourseView } from 'src/sections/course/view';

const EditCourse = () => {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title> Edit Course | SkyMath </title>
      </Helmet>

      <EditCourseView id={id} />
    </>
  );
};

export default EditCourse;
