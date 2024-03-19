import { Helmet } from 'react-helmet-async';

import { ListCourseTestView } from 'src/sections/courseTest/view';


const ListTest = () => (
  <>
    <Helmet>
      <title> Course Test | SkyMath </title>
    </Helmet>

    <ListCourseTestView />
  </>
);

export default ListTest;
