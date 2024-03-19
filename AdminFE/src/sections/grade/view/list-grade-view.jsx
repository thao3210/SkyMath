import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import { Box, Breadcrumbs } from '@mui/material';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { emptyRows, applyFilter, getComparator } from 'src/utils/tableUtils';

import GradeServices from 'src/services/GradeServices';

import Link from 'src/components/link';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from 'src/components/table/table-no-data';
import GradeTableHead from 'src/components/table/table-head';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import TableEmptyRows from 'src/components/table/table-empty-rows';
import GradeTableToolbar from 'src/components/table/table-toolbar';

import GradeTableRow from '../grade-table-row';

const ListGradeView = () => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [grade, setGrade] = useState([]);

  const [openAddGrade, setOpenAddGrade] = useState(false);

  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const [gradeName, setGradeName] = useState('');

  const handleOpenModal = () => setOpenAddGrade(true);
  const handleCloseModal = () => setOpenAddGrade(false);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = grade.map((n) => n.name);
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

  const fetchGradeData = async () => {
    try {
      const response = await GradeServices.getListGrade();
      if (response?.data && response?.status === 200) {
        setGrade(response.data);
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
    inputData: grade,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleAddGrade = async (e) => {
    e.preventDefault();
    const credentials = { name: gradeName };
    try {
      const response = await GradeServices.addGrade(credentials);
      if (response.status === 201) {
        showAlert('success', 'Add grade successful!');
        handleCloseModal();
        setGradeName(null);
        fetchGradeData();
      } else {
        showAlert('error', 'Add grade error!');
        handleCloseModal();
      }
    } catch (error) {
      console.error('Failed to add grade:', error);
      showAlert('error', 'Add grade error!');
      handleCloseModal();
    }
  };

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleDeleteRow = async (id) => {
    try {
      // Gọi hàm onDelete và chuyển id của grade cần xóa
      const response = await GradeServices.deleteGrade(id);

      if (response && response.status === 204) {
        // Hiển thị alert khi xóa thành công
        showAlert('success', 'Edit thematic successful!');

        fetchGradeData();
      } else {
        // Hiển thị thông báo lỗi nếu không thành công
        showAlert('success', 'Edit thematic successful!');
      }
    } catch (error) {
      console.error('Failed to delete grade:', error);
      showAlert('success', 'Edit thematic successful!');
    }
  };

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    fetchGradeData();
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
            Grade
          </Typography>
        </Breadcrumbs>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenModal}
        >
          New Grade
        </Button>
      </Stack>

      <Dialog open={openAddGrade} onClose={handleCloseModal}>
        <DialogTitle>Add New Grade</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            label="Grade Name"
            variant="outlined"
            name="gradeName"
            value={gradeName}
            onChange={(e) => setGradeName(e.target.value)}
          />
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleAddGrade}>
              Add Grade
            </Button>
            <Button variant="contained" color="warning" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Card>
        <GradeTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <GradeTableHead
                order={order}
                orderBy={orderBy}
                rowCount={grade.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[{ id: 'name', label: 'Name' }, { id: '' }]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((gradeItem) => (
                    <GradeTableRow
                      key={gradeItem.id}
                      id={gradeItem.id}
                      name={gradeItem.name}
                      selected={selected.indexOf(gradeItem.name) !== -1}
                      handleClick={(event) => handleClick(event, gradeItem.name)}
                      onDelete={handleDeleteRow}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, grade.length)}
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
          count={grade.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

export default ListGradeView;
