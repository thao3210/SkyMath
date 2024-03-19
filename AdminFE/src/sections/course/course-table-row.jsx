import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
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
    imageLink,
    info,
    thematicName,
    status,
    gradeName,
    curriculumName,
    handleClick,
    color,
    courseId,
    onDelete,
    // subjectName,
}) {
    const navigate = useNavigate();

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
            await onDelete(courseId);
            handleCloseDeleteDialog();
        } catch (error) {
            console.error('Failed to delete grade:', error);
        }
    };

    const handleEditCourseClick = () => {
        navigate(`/course/editCourse/${courseId}`);
    };

    const handleDetailsCourseClick = () => {
        navigate(`/course/showDetails/${courseId}`);
    };

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected} onClick={handleDetailsCourseClick}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={handleClick} />
                </TableCell>

                <TableCell>
                    <Box
                        sx={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: color,
                            borderRadius: '4px',
                            display: 'inline-block',
                            marginLeft: '8px',
                        }}
                    />
                </TableCell>

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={name} src={imageLink} />
                        <Typography variant="subtitle2" noWrap>
                            {name}
                        </Typography>
                    </Stack>
                </TableCell>

                <TableCell>{ReactHtmlParser(info)}</TableCell>

                <TableCell align="center">{gradeName}</TableCell>

                <TableCell>{curriculumName}</TableCell>

                {/* <TableCell>{thematicName}</TableCell> */}

                <TableCell>
                    <Label color={(status === true ? 'success' : 'error')}>
                        {status ? 'Active' : 'Banned'}
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
                <MenuItem onClick={handleDetailsCourseClick}>
                    <Iconify icon="eva:eye-outline" sx={{ mr: 2 }} />
                    Details
                </MenuItem>

                <MenuItem onClick={handleEditCourseClick}>
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem onClick={handleOpenDeleteDialog} sx={{ color: 'error.main' }}>
                    <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Delete Course</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Are you sure you want to delete this course?
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
    imageLink: PropTypes.any,
    handleClick: PropTypes.func,
    thematicName: PropTypes.any,
    gradeName: PropTypes.any,
    curriculumName: PropTypes.any,
    name: PropTypes.any,
    info: PropTypes.any,
    selected: PropTypes.any,
    status: PropTypes.bool,
    color: PropTypes.any,
    courseId: PropTypes.any,
    onDelete: PropTypes.func
};
