import { Helmet } from 'react-helmet-async';

import { ListIntroduceView } from '../../sections/introduce/view';

const ListIntroduce = () => (
  <>
    <Helmet>
      <title> Introduce | SkyMath </title>
    </Helmet>

    <ListIntroduceView />
  </>
);

export default ListIntroduce;
