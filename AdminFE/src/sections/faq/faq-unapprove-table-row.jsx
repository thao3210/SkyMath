import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

import FAQServices from 'src/services/FAQServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

import Label from '../../components/label';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function FAQUnApproveTableRow({
  selected,
  content,
  faqResourceTypeName,
  lastModifiedDate,
  faqType,
  status,
  handleClick,
  id,
  onDelete,
}) {
  const [open, setOpen] = useState(null);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [clickedRowData, setClickedRowData] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    try {
      await onDelete(id);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Failed to delete grade:', error);
    }
  };

  const [openImageDataDialog, setOpenImageDataDialog] = useState(false);

  const handleOpenImageDialog = () => {
    setOpenImageDataDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDataDialog(false);
  };

  const handleOpenAcceptDialog = () => {
    setOpenAcceptDialog(true);
  };

  const handleRowClick = (rowData) => {
    setClickedRowData(rowData);
  };

  const handleCloseAcceptDialog = () => {
    setOpenAcceptDialog(false);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAcceptAPI = async () => {
    try {
      await FAQServices.acceptFAQs(faqType, id);

      handleCloseAcceptDialog();
      setAlertSeverity('success');
      setAlertMessage('Accepted successfully');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to delete FAQs:', error);
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} onClick={handleRowClick}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          {faqResourceTypeName === 'Text' && <Typography>{content}</Typography>}
          {faqResourceTypeName === 'Video' && (
            <video width="320" height="240" controls>
              <source src={content} type="video/mp4" />
              <track kind="captions" src={content} label="English" />
            </video>
          )}
          {!['Text', 'Video'].includes(faqResourceTypeName) && (
            // Render other content types (e.g., images)
            <Stack direction="row" alignItems="center" spacing={2} onClick={handleOpenImageDialog}>
              <img
                alt={content}
                src={content}
                style={{ width: 100, height: 100, borderRadius: '2%' }}
              />
            </Stack>
          )}
        </TableCell>

        <TableCell>{faqType}</TableCell>

        <TableCell>{lastModifiedDate}</TableCell>

        <TableCell>
          <Label onClick={handleOpenAcceptDialog} color={status === 'Pending' ? 'Solved' : 'error'}>
            {status || 'Pending'}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {/* <MenuItem onClick={handleEditCourseClick}>
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                </MenuItem> */}

        <MenuItem onClick={handleOpenDeleteDialog} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <CustomSnackbar
        open={isModalOpen}
        onClose={handleCloseModal}
        message={alertMessage}
        severity={alertSeverity}
      />
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete FAQs</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Are you sure you want to delete this FAQs?
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="warning" onClick={handleCloseDeleteDialog}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ ml: 1 }}>
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={openImageDataDialog} onClose={handleCloseImageDialog}>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <img
                alt={content}
                src={content}
                style={{ width: 600, height: 400, borderRadius: '2%' }}
              />
            </Stack>
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="warning" onClick={handleCloseImageDialog}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openAcceptDialog} onClose={handleCloseAcceptDialog}>
        <DialogTitle>Accept FAQs</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {clickedRowData ? `FAQs Type: ${faqType}` : ''}
            <hr />
            {clickedRowData ? `Accepting FAQs with ID: ${id}` : ''}
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="warning" onClick={handleCloseAcceptDialog}>
              Cancel
            </Button>
            <Button onClick={handleAcceptAPI} variant="contained" color="success" sx={{ ml: 1 }}>
              Accept
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

FAQUnApproveTableRow.propTypes = {
  content: PropTypes.any,
  faqResourceTypeName: PropTypes.any,
  lastModifiedDate: PropTypes.any,
  faqType: PropTypes.any,
  handleClick: PropTypes.func,
  status: PropTypes.string,
  selected: PropTypes.any,
  id: PropTypes.any,
  onDelete: PropTypes.func,
};
