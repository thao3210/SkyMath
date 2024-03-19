import { Helmet } from 'react-helmet-async';

import { ListFAQView } from '../../sections/faq/view';

const ListFAQs = () => (
  <>
    <Helmet>
      <title> FAQs | SkyMath </title>
    </Helmet>

    <ListFAQView />
  </>
);

export default ListFAQs;
