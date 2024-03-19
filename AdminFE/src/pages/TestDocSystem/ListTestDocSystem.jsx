import { Helmet } from 'react-helmet-async';

import { ListTestDocSystemView } from 'src/sections/testDocSystem/view';


const ListTestDocSystem = () => (
  <>
    <Helmet>
      <title> Test Document System | SkyMath </title>
    </Helmet>

    <ListTestDocSystemView />
  </>
);

export default ListTestDocSystem;
