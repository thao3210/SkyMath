import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Select, Button, MenuItem, InputLabel, FormControl } from '@mui/material';

import { emptyRows, applyFilter, getComparator } from 'src/utils/tableUtils';

import CourseServices from 'src/services/CourseServices';
import CourseTestService from 'src/services/CourseTestServices';

import Link from 'src/components/link';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from 'src/components/table/table-no-data';
import CourseTableHead from 'src/components/table/table-head';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import TableEmptyRows from 'src/components/table/table-empty-rows';
import CourseTableToolbar from 'src/components/table/table-toolbar';

import CourseTestTable from '../CourseTestTable';
import AddCourseTestForm from './AddCourseTestView';

const ListCourseTestView = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [courseTest, setCourseTest] = useState([]);
  const [course, setCourse] = useState([]);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [showAddCourseTestForm, setShowAddCourseTestForm] = useState(false);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = courseTest.map((n) => n.name);
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

  const fetchCourseTestData = async (courseID) => {
    try {
      const response = await CourseTestService.getCourse(courseID);
      if (response?.data && response?.status === 200) {
        setCourseTest(response.data);
        // console.log('response', response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const fetchCourseData = async () => {
    try {
      const response = await CourseServices.getListCourse(1);
      if (response?.data && response?.status === 200) {
        setCourse(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
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
    inputData: courseTest,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleDeleteRow = async (id) => {
    try {
      const response = await CourseTestService.deleteCourseTest(id);

      if (response && response.status === 204) {
        showAlert('success', 'Delete successful!');
        fetchCourseTestData(selectCourse);
      } else {
        showAlert('error', 'Cannot Delete. Have something wrong!');
      }
    } catch (error) {
      console.error('Failed to delete slide:', error);
      showAlert('error', 'An error occurred.');
    }
  };
  const handleAddCourseTestClick = () => {
    setShowAddCourseTestForm(true);
  };

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };
  const handleEditRow = async (id, updatedData) => {
    try {
      const response = await CourseTestService.editCourseTest(id, updatedData);

      if (response && response.status === 204) {
        showAlert('success', 'Edit successful!');
        fetchCourseTestData(selectCourse);
      } else {
        showAlert('error', 'Cannot Edit. Have something wrong!');
      }
    } catch (error) {
      console.error('Failed to edit subject:', error);
      showAlert('error', 'An error occurred.');
    }
  };
  const handleAddSuccess = () => {
    fetchCourseTestData(selectCourse);
  };
  const [selectCourse, setSelectCourse] = useState('');

  useEffect(() => {
    if (selectCourse !== '') {
      fetchCourseTestData(selectCourse);
    }
    fetchCourseData();
  }, [selectCourse]);

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
          <Typography variant="h5" color="text.primary">
            Course test
          </Typography>
        </Breadcrumbs>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2} marginBottom={3}>
        <FormControl variant="outlined" sx={{ width: 300 }}>
          <InputLabel id="course-label">Course</InputLabel>
          <Select
            labelId="course-label"
            id="course"
            value={selectCourse}
            onChange={(e) => setSelectCourse(e.target.value)}
            label="course"
          >
            {Array.isArray(course) &&
              course.map((courses) => (
                <MenuItem key={courses.id} value={courses.id}>
                  {courses.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <Button
          sx={{ background: '#1074b8' }}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAddCourseTestClick}
        >
          New Course Test
        </Button>
      </Stack>

      {showAddCourseTestForm && (
        <AddCourseTestForm courseId={selectCourse} onAddSuccess={handleAddSuccess} />
      )}

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
                rowCount={courseTest.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'id', label: 'ID', align: 'center' },
                  { id: 'name', label: 'Name Test' },
                  { id: 'timeLimit', label: 'Time Limit', align: 'center' },
                  { id: 'course', label: 'Course' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <CourseTestTable
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      timeLimit={item.timeLimit}
                      course={item.course}
                      selected={selected.indexOf(item.name) !== -1}
                      handleClick={(event) => handleClick(event, item.name)}
                      onDelete={handleDeleteRow}
                      onEdit={(id, updatedData) => handleEditRow(id, updatedData)}
                      onLoadData={() => fetchCourseTestData(item.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, courseTest.length)}
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
          count={courseTest.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

export default ListCourseTestView;
