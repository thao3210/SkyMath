import { useState } from 'react';
import PropTypes from 'prop-types';

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

export default function CourseTableRow({
    selected,
    name,
    description,
    status,
    handleClick,
    id,
    onDelete,
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

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={handleClick} />
                </TableCell>

                <TableCell component="th" scope="row" padding="none">
                    <Typography variant="subtitle2" noWrap sx={{ pl: 2 }}>
                        {name}
                    </Typography>
                </TableCell>

                <TableCell>{description}</TableCell>

                <TableCell>
                    <Label color={(status === true ? 'success' : 'error')}>
                        {status ? 'Success' : 'Error'}
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
                {/* <MenuItem onClick={handleCloseMenu}>
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                </MenuItem> */}

                <MenuItem onClick={handleOpenDeleteDialog} sx={{ color: 'error.main' }}>
                    <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Delete Grade</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Are you sure you want to delete this grade?
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
        </>
    );
}

CourseTableRow.propTypes = {
    description: PropTypes.any,
    handleClick: PropTypes.func,
    name: PropTypes.any,
    selected: PropTypes.any,
    status: PropTypes.bool,
    id: PropTypes.any,
    onDelete: PropTypes.func
};
