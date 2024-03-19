import { Helmet } from 'react-helmet-async';

import { ListDocumentView } from 'src/sections/testDocument/view';


const ListTestDocument = () => (
  <>
    <Helmet>
      <title> Test Document | SkyMath </title>
    </Helmet>

    <ListDocumentView />
  </>
);

export default ListTestDocument;
