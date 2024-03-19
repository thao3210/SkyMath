import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Dialog, TextField, DialogTitle, Breadcrumbs, DialogContent } from '@mui/material';

import { emptyRows, applyFilter, getComparator } from 'src/utils/tableUtils';

import CurriculumServices from 'src/services/CurriculumServices';

import Link from 'src/components/link';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from 'src/components/table/table-no-data';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import CurriculumTableHead from 'src/components/table/table-head';
import TableEmptyRows from 'src/components/table/table-empty-rows';
import CurriculumTableToolbar from 'src/components/table/table-toolbar';

import CurriculumTableRow from '../curriculum-table-row';

const ListCurriculumView = () => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [curriculum, setCurriculum] = useState([]);

  const [openAddCurriculum, setOpenAddCurriculum] = useState(false);

  const [curriculumName, setCurriculumName] = useState('');

  const [description, setDescription] = useState('');

  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const handleOpenModal = () => {
    setOpenAddCurriculum(true);
  };

  const handleCloseModal = () => {
    setOpenAddCurriculum(false);
    setCurriculumName('');
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
      const newSelecteds = curriculum.map((n) => n.name);
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

  const fetchCurriculumData = async () => {
    try {
      const response = await CurriculumServices.getListCurriculum();
      // console.log("response data: ", response.data);
      if (response?.data && response?.status === 200) {
        setCurriculum(response.data);
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
    inputData: curriculum,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const notFound = !dataFiltered.length && !!filterName;

  const handleAddCurriculum = async (e) => {
    e.preventDefault();
    const credentials = { name: curriculumName, description };
    console.log('credentials: ', credentials);
    try {
      const response = await CurriculumServices.addCurriculum(credentials);
      if (response.status === 201) {
        showAlert('success', 'Add curriculum successful!');
        handleCloseModal();
        fetchCurriculumData();
      } else {
        showAlert('error', 'Add curriculum successful!');
        handleCloseModal();
      }
    } catch (error) {
      console.error('Failed to add curriculum:', error);
      showAlert('error', 'Add curriculum successful!');
      handleCloseModal();
    }
  };

  const handleDeleteRow = async (id) => {
    try {
      // Gọi hàm onDelete và chuyển id của grade cần xóa
      const response = await CurriculumServices.deleteCurriculum(id);

      if (response && response.status === 204) {
        // Hiển thị alert khi xóa thành công
        showAlert('success', 'Delete curriculum successful!');

        fetchCurriculumData();
      } else {
        showAlert('error', 'Delete curriculum successful!');
      }
    } catch (error) {
      console.error('Failed to delete curriculum:', error);
      showAlert('error', 'Delete curriculum successful!');
    }
  };

  useEffect(() => {
    fetchCurriculumData();
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
            Curriculum
          </Typography>
        </Breadcrumbs>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenModal}
        >
          New Curriculum
        </Button>
      </Stack>

      <Dialog open={openAddCurriculum} onClose={handleCloseModal}>
        <DialogTitle>Add New Curriculum</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            label="Curriculum Name"
            variant="outlined"
            name="curriculumName"
            value={curriculumName}
            onChange={(e) => setCurriculumName(e.target.value)}
          />

          <TextField
            margin="dense"
            fullWidth
            label="Curriculum Description"
            variant="outlined"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" onClick={handleAddCurriculum}>
              Add Curriculum
            </Button>
            <Button variant="contained" color="warning" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Card>
        <CurriculumTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <CurriculumTableHead
                order={order}
                orderBy={orderBy}
                rowCount={curriculum.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'description', label: 'Description' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <CurriculumTableRow
                      key={index}
                      id={item.id}
                      name={item.name}
                      status={item.status}
                      description={item.description}
                      selected={selected.indexOf(item.name) !== -1}
                      handleClick={(event) => handleClick(event, item.name)}
                      onDelete={handleDeleteRow}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, curriculum.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={curriculum.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </Container>
  );
};

export default ListCurriculumView;
