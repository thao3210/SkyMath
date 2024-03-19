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
import { Box, Button, Dialog, TextField, DialogTitle, DialogContent } from '@mui/material';

import { emptyRows, applyFilter, getComparator } from 'src/utils/tableUtils';

import SubjectServices from 'src/services/SubjectServices';

import Link from 'src/components/link';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from 'src/components/table/table-no-data';
import CourseTableHead from 'src/components/table/table-head';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import TableEmptyRows from 'src/components/table/table-empty-rows';
import CourseTableToolbar from 'src/components/table/table-toolbar';

import SubjectTable from '../subject-table-row';

const ListSubjectView = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [course, setCourse] = useState([]);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

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

  const fetchSubjectData = async () => {
    try {
      const response = await SubjectServices.getListSubject();
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
    inputData: course,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleDeleteRow = async (id) => {
    try {
      const response = await SubjectServices.deleteSubject(id);

      if (response && response.status === 204) {
        showAlert('success', 'Delete successful!');
        fetchSubjectData();
      } else {
        showAlert('error', 'Cannot Delete. Have something wrong!');
      }
    } catch (error) {
      console.error('Failed to delete slide:', error);
      showAlert('error', 'An error occurred.');
    }
  };

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };
  const handleEditRow = async (id, updatedData) => {
    try {
      // const response = await SubjectServices.editSubject(id, updatedData);
      await SubjectServices.editSubject(id, updatedData);

      // if (response && response.status === 200) {
      showAlert('success', 'Edit successful!');
      fetchSubjectData();
      // } else {
      //   showAlert('error', 'Cannot Edit. Have something wrong!');
      // }
    } catch (error) {
      console.error('Failed to edit subject:', error);
      showAlert('error', 'An error occurred.');
    }
  };

  const [subjectName, setSubjectName] = useState('');
  const [description, setDescription] = useState('');
  const handleAdd = async (e) => {
    e.preventDefault();
    const credentials = { name: subjectName, description };
    try {
      const response = await SubjectServices.addSubject(credentials);
      console.log('response status: ', response.status);
      if (response.status === 201) {
        showAlert('success', 'Add subject successful!');
        handleCloseAddDialog();
        fetchSubjectData();
      } else {
        showAlert('success', 'Add subject successful!');
        handleCloseAddDialog();
      }
    } catch (error) {
      console.error('Failed to add grade:', error);
      showAlert('success', 'Add subject successful!');
      handleCloseAddDialog();
    }
  };

  useEffect(() => {
    fetchSubjectData();
  }, []);

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
            Subject
          </Typography>
        </Breadcrumbs>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenAddDialog}
        >
          New Subject
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
                  { id: 'name', label: 'Name' },
                  { id: 'description', label: 'Description' },
                  { id: 'createdDate', label: 'Created Date' },
                  { id: 'lastModifiedDate', label: 'Last Modified Date' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <SubjectTable
                      key={index}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      createdDate={item.createdDate}
                      lastModifiedDate={item.lastModifiedDate}
                      status={item.status}
                      selected={selected.indexOf(item.name) !== -1}
                      handleClick={(event) => handleClick(event, item.name)}
                      onDelete={handleDeleteRow}
                      onEdit={(id, updatedData) => handleEditRow(id, updatedData)}
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
          count={course.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Subject</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <TextField
              margin="dense"
              id="outlined-basic"
              label="Subject Name"
              variant="outlined"
              style={{ width: 400, borderRadius: '2%' }}
              // onBlur={handleBlur}
              onChange={(e) => setSubjectName(e.target.value)}
              // value={values.courseName ? values.courseName : ''}
              name="subjectName"
              //   error={!!touched.courseName && !!errors.courseName}
              //   helperText={touched.courseName && errors.courseName}
            />
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              style={{ width: 400, borderRadius: '2%' }}
              // onBlur={handleBlur}
              onChange={(e) => setDescription(e.target.value)}
              // value={values.courseName ? values.courseName : ''}
              name="description"
              //   error={!!touched.courseName && !!errors.courseName}
              //   helperText={touched.courseName && errors.courseName}
            />
          </Typography>

          <Box display="flex" justifyContent="flex-end" sx={{ pt: 2 }}>
            <Button
              variant="outlined"
              color="warning"
              onClick={handleCloseAddDialog}
              sx={{ mx: 1 }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ListSubjectView;
