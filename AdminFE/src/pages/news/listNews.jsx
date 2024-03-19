import { Helmet } from 'react-helmet-async';

import { ListNewsView } from '../../sections/news/view';

const ListNews = () => (
  <>
    <Helmet>
      <title> News | SkyMath </title>
    </Helmet>

    <ListNewsView />
  </>
);

export default ListNews;
