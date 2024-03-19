import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function VideoInterTableRow({ quizId, seconds }) {
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell>{quizId}</TableCell>

      <TableCell>{seconds}</TableCell>

      <TableCell align="right">
        <IconButton>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

VideoInterTableRow.propTypes = {
  quizId: PropTypes.any,
  seconds: PropTypes.any,
};
