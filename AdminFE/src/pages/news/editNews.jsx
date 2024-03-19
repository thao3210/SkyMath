import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { EditNewsView } from 'src/sections/news/view';

const EditNews = () => {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title> Edit News | SkyMath </title>
      </Helmet>

      <EditNewsView id={id} />
    </>
  );
};

export default EditNews;
