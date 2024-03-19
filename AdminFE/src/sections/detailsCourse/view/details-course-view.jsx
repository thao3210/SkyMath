import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Dialog, TextField, DialogTitle, DialogContent } from '@mui/material';

import { emptyRows, applyFilter, getComparator } from 'src/utils/tableUtils';

import CourseServices from 'src/services/CourseServices';
import LessonServices from 'src/services/LessonServices';
import ThematicServices from 'src/services/ThematicServices';

import Link from 'src/components/link';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from 'src/components/table/table-no-data';
import CourseTableHead from 'src/components/table/table-head';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import TableEmptyRows from 'src/components/table/table-empty-rows';
import CourseTableToolbar from 'src/components/table/table-toolbar';

import DetailsTableRow from '../details-table-row';

const DetailsCourseView = () => {
  const { courseId } = useParams();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [courseDetails, setCourseDetails] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [openAddThematic, setOpenAddThematic] = useState(false);
  const [thematicName, setThematicName] = useState('');

  const handleOpenModal = () => {
    setOpenAddThematic(true);
  };

  const handleCloseModal = () => {
    setOpenAddThematic(false);
    setThematicName('');
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = courseDetails.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: courseDetails,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleAddThematic = async (e) => {
    e.preventDefault();
    const credentials = { name: thematicName, courseId };
    console.log('credentials: ', credentials);
    try {
      const response = await ThematicServices.addThematic(credentials);
      if (response.status === 201) {
        showAlert('success', 'Add thematic successful!');
        handleCloseModal();
        fetchDetailsCourse();
      } else {
        showAlert('error', 'Have something error when add thematic!');
        handleCloseModal();
      }
    } catch (error) {
      console.error('Failed to add thematic:', error);
      showAlert('error', 'Have something error when add thematic!');
      handleCloseModal();
    }
  };

  const fetchDetailsCourse = useCallback(async () => {
    try {
      const response = await CourseServices.getCourseById(courseId);
      console.log('response data >>', response.data);
      if (response?.data && response?.status === 200) {
        setCourseName(response.data.name);
        if (response.data.thematicDtos !== null) {
          setCourseDetails(response.data.thematicDtos);
        }else{
          showAlert("warning","Thematic has no data")
        }
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error);
    }
  }, [courseId]);

  const handleDeleteThematic = async (id) => {
    try {
      // Gọi hàm onDelete và chuyển id của grade cần xóa
      const response = await ThematicServices.deleteThematic(id);

      if (response && response.status === 204) {
        // Hiển thị alert khi xóa thành công
        showAlert('success', 'Delete thematic successful!');

        fetchDetailsCourse();
      } else {
        showAlert('error', 'Have something error when delete thematic!');
      }
    } catch (error) {
      console.error('Failed to delete thematic:', error);
      showAlert('error', 'Have something error when delete thematic!');
    }
  };

  const handleDeleteLesson = async (id) => {
    try {
      // Gọi hàm onDelete và chuyển id của grade cần xóa
      const response = await LessonServices.deleteLesson(id);

      if (response && response.status === 204) {
        // Hiển thị alert khi xóa thành công
        showAlert('success', 'Delete lesson successful!');

        fetchDetailsCourse();
      } else {
        showAlert('error', 'Have something error when delete lesson!');
      }
    } catch (error) {
      console.error('Failed to delete lesson:', error);
      showAlert('error', 'Have something error when delete lesson!');
    }
  };

  useEffect(() => {
    fetchDetailsCourse();
  }, [courseId, fetchDetailsCourse]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="large" />} aria-label="breadcrumb">
          <Link href="/">
            <Stack direction="row" alignItems="center">
              <HomeRoundedIcon sx={{ mr: 0.5 }} fontSize="medium" />
              <Typography variant="h5">HomePage</Typography>
            </Stack>
          </Link>

          <Link href="/course">
            <Typography variant="h5">Course</Typography>
          </Link>

          <Typography variant="h5" color="text.primary">
            {courseName}
          </Typography>
        </Breadcrumbs>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenModal}
        >
          New Thematic
        </Button>
      </Stack>

      <Dialog open={openAddThematic} onClose={handleCloseModal}>
        <DialogTitle>Add New Thematic</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            label="Thematic Name"
            variant="outlined"
            name="thematicName"
            value={thematicName}
            onChange={(e) => setThematicName(e.target.value)}
          />

          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" onClick={handleAddThematic}>
              Add Thematic
            </Button>
            <Button variant="contained" color="warning" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Card>
        <CourseTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <CourseTableHead
                order={order}
                orderBy={orderBy}
                rowCount={courseDetails.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'lesson' },
                  { id: 'name', label: 'Name' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((detailsItem) => (
                    <DetailsTableRow
                      key={detailsItem.id}
                      thematicId={detailsItem.id}
                      thematicName={detailsItem.name}
                      status={detailsItem.status}
                      lessonDtos={detailsItem.lessonDtos}
                      courseId={courseId}
                      selected={selected.indexOf(detailsItem.name) !== -1}
                      handleClick={(event) => handleClick(event, detailsItem.name)}
                      onDelete={handleDeleteThematic}
                      onLoadData={fetchDetailsCourse}
                      onDeleteLesson={handleDeleteLesson}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, courseDetails.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <CustomSnackbar
          open={alert.isOpen}
          onClose={handleCloseAlert}
          message={alert.message}
          severity={alert.severity}
        />

        <TablePagination
          page={page}
          component="div"
          count={courseDetails.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

export default DetailsCourseView;
