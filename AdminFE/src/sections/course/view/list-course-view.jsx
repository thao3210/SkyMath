import { useNavigate } from 'react-router-dom';
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

import { emptyRows, applyFilter, getComparator } from 'src/utils/tableUtils';

import CourseServices from 'src/services/CourseServices';

import Link from 'src/components/link';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from 'src/components/table/table-no-data';
import CourseTableHead from 'src/components/table/table-head';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import TableEmptyRows from 'src/components/table/table-empty-rows';
import CourseTableToolbar from 'src/components/table/table-toolbar';

import CourseTableRow from '../course-table-row';

const ListCourseView = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [course, setCourse] = useState([]);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [isLastPage, setIsLastPage] = useState(false);

  const handleNewCourseClick = () => {
    navigate('/course/addCourse');
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
      const newSelecteds = course.map((n) => n.name);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
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

  const fetchCourseData = useCallback(async () => {
    try {
      const response = await CourseServices.getListCourse(page+1);

      if (response?.data && response?.status === 200) {
        setIsLastPage(response.data.length === 0);
        setCourse(response.data);
        console.log('response >> ', response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [page]);

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
    inputData: course,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleDeleteRow = async (id) => {
    try {
      const response = await CourseServices.deleteCourse(id);
      if (response && response.status === 204) {
        showAlert('success', 'Delete successful!');
        fetchCourseData();
      } else {
        showAlert('error', 'Cannot Delete. Have something wrong!');
      }
    } catch (error) {
      console.error('Failed to delete course:', error);
      showAlert('error', 'An error occurred.');
    }
  };

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  useEffect(() => {
    const newCourseAdded = localStorage.getItem('newCourseAdded') === 'true';
    const editCourse = localStorage.getItem('editCourse') === 'true';
  
    if (newCourseAdded) {
      showAlert('success', 'Add Course successful!');
      localStorage.removeItem('newCourseAdded');
    }
  
    if (editCourse) {
      showAlert('success', 'Edit Course successful!');
      localStorage.removeItem('editCourse');
    }
    fetchCourseData();
  }, [page, fetchCourseData]);
  

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
            Course
          </Typography>
        </Breadcrumbs>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleNewCourseClick}
        >
          New Course
        </Button>
      </Stack>

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
                rowCount={course.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'color', label: 'BgColor' },
                  { id: 'name', label: 'Name' },
                  { id: 'info', label: 'Information' },
                  { id: 'gradeName', label: 'Grade' },
                  { id: 'curriculumName', label: 'Curriculum' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((courseItem) => (
                    <CourseTableRow
                      key={courseItem.id}
                      courseId={courseItem.id}
                      name={courseItem.name}
                      info={courseItem.infomation}
                      status={courseItem.status}
                      imageLink={courseItem.imageLink}
                      gradeName={courseItem.grade}
                      curriculumName={courseItem.curriculum}
                      color={courseItem.backGroundColor}
                      selected={selected.indexOf(courseItem.name) !== -1}
                      handleClick={(event) => handleClick(event, courseItem.name)}
                      onDelete={handleDeleteRow}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, course.length)}
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
          count={-1}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ disabled: isLastPage }}
        />
      </Card>
    </Container>
  );
};

export default ListCourseView;
