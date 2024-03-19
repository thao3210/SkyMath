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

import Label from '../../components/label';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function FAQTableRow({
  selected,
  content,
  faqResourceTypeName,
  lastModifiedDate,
  faqType,
  status,
  handleClick,
  color,
  id,
  onDelete,
  // subjectName,
}) {

  const [open, setOpen] = useState(null);

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

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          {faqResourceTypeName === 'Text' && content && (
            <Typography dangerouslySetInnerHTML={{ __html: content }} />
          )}
          {faqResourceTypeName === 'Video' && (
            // Render video content differently
            <video width="320" height="240" controls>
              <source src={content} type="video/mp4" />
              <track kind="captions" src={content} label="English" />
              Your browser does not support the video tag.
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
          <Label color={status === 'Active' ? 'success' : 'success'}>
            {status ? 'Active' : 'Active'}
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
    </>
  );
}

FAQTableRow.propTypes = {
  content: PropTypes.any,
  faqResourceTypeName: PropTypes.any,
  lastModifiedDate: PropTypes.any,
  faqType: PropTypes.any,
  handleClick: PropTypes.func,
  status: PropTypes.func,
  selected: PropTypes.any,
  color: PropTypes.any,
  id: PropTypes.any,
  onDelete: PropTypes.func,
};
