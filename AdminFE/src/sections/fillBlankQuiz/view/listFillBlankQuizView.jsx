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

import { emptyRows, applyFilter, getComparator } from 'src/utils/tableUtils';

import FillBlankService from 'src/services/FillBlankService';

import Link from 'src/components/link';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from 'src/components/table/table-no-data';
import CourseTableHead from 'src/components/table/table-head';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import TableEmptyRows from 'src/components/table/table-empty-rows';
import CourseTableToolbar from 'src/components/table/table-toolbar';

import FillBlankTable from '../fillBlankQuizTable';

const ListFillBlankQuizView = () => {
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

  const fetchQuizData = async () => {
    try {
      const response = await FillBlankService.getQuiz();
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
      const response = await FillBlankService.deleteQuiz(id);

      if (response && response.status === 204) {
        showAlert('success', 'Delete successful!');
        fetchQuizData();
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
  const handleEditRow = async (id, updatedData) => {
    try {
      const response = await FillBlankService.editQuiz(id, updatedData);
      // await FillBlankService.editQuiz(id, updatedData);

      if (response && response.status === 201) {
        fetchQuizData();
        showAlert('success', 'Edit successful!');
      } else {
        showAlert('error', 'Cannot Edit. Have something wrong!');
      }
    } catch (error) {
      console.error('Failed to edit subject:', error);
      showAlert('error', 'An error occurred.');
    }
  };

  useEffect(() => {
    fetchQuizData();
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
          <Link href="/quiz">
            <Stack direction="row" alignItems="center">
              <Typography variant="h5">Quiz</Typography>
            </Stack>
          </Link>
          <Typography variant="h5" color="text.primary">
            FillBlank
          </Typography>
        </Breadcrumbs>
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
                  { id: 'id', label: 'ID' },
                  { id: 'prompt', label: 'Prompt' },
                  { id: 'question', label: 'Question' },
                  { id: 'answer', label: 'Answer' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <FillBlankTable
                      key={item.id}
                      id={item.id}
                      prompt={item.prompt}
                      question={item.question}
                      answer={item.answer}
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
    </Container>
  );
};

export default ListFillBlankQuizView;
