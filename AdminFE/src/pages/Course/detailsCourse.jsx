import { Helmet } from 'react-helmet-async';

import { DetailsCourseView } from '../../sections/detailsCourse/view';

const DetailsCourse = () => (
  <>
    <Helmet>
      <title> Details Course | SkyMath </title>
    </Helmet>

    <DetailsCourseView />
  </>
);

export default DetailsCourse;
