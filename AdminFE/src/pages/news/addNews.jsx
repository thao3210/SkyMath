import { Helmet } from 'react-helmet-async';

import { AddNewsView } from '../../sections/news/view';

const AddNews = () => (
  <>
    <Helmet>
      <title> Add News | SkyMath </title>
    </Helmet>

    <AddNewsView />
  </>
);

export default AddNews;
