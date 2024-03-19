import { Helmet } from 'react-helmet-async';

import ListFaqUnApproveView from '../../sections/faq/view/list-faq-unapprove-view';

const ListFAQsUnApprove = () => (
  <>
    <Helmet>
      <title> FAQs | SkyMath </title>
    </Helmet>

    <ListFaqUnApproveView />
  </>
);

export default ListFAQsUnApprove;
