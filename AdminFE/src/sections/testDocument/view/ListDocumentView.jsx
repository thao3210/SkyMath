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
import { Select, Button, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import { emptyRows, applyFilter, getComparator } from 'src/utils/tableUtils';

import GradeServices from 'src/services/GradeServices';
import SubjectServices from 'src/services/SubjectServices';
import TestDocumentService from 'src/services/TestDocumentService';

import Link from 'src/components/link';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableHead from 'src/components/table/table-head';
import TableNoData from 'src/components/table/table-no-data';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import TableEmptyRows from 'src/components/table/table-empty-rows';
import CourseTableToolbar from 'src/components/table/table-toolbar';

import DocumentTable from '../TestDocumentTable';
import AddTestDocumentForm from './AddTestDocumentView';

const ListDocumentView = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [testDocument, setTestDocument] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [gradeList, setGradeList] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [indexPage, setIndexPage] = useState('');
  const [year, setYear] = useState('');
  const [provinceId, setProvinceId] = useState('');
  const [showAddTestDocumentForm, setShowAddTestDocumentForm] = useState(false);

  const handleAddTestDocument = () => {
    setShowAddTestDocumentForm(true);
  };
  const handleCloseAddTestDocument = () => {
    setShowAddTestDocumentForm(false);
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
      const newSelecteds = testDocument.map((n) => n.name);
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

  const fetchTestDocumentData = async () => {
    try {
      const response = await TestDocumentService.getListTestDocument(
        indexPage,
        year,
        selectedSubject,
        selectedGrade,
        provinceId
      );
      if (response?.data && response?.status === 200) {
        setTestDocument(response.data);
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
    inputData: testDocument,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleDeleteRow = async (id) => {
    try {
      const response = await TestDocumentService.deleteTestDocument(id);

      if (response && response.status === 204) {
        showAlert('success', 'Delete successful!');
        fetchTestDocumentData();
      } else {
        showAlert('error', 'Cannot Delete. Have something wrong!');
      }
    } catch (error) {
      console.error('Failed to delete document:', error);
      showAlert('error', 'An error occurred.');
    }
  };

  const handleEditRow = async (id, updatedData) => {
    try {
      const formData = new FormData();

      formData.append('Name', updatedData.name);
      formData.append('Description', updatedData.description);
      formData.append('Content', updatedData.content);
      formData.append('ContentSolve', updatedData.contentSolve);
      formData.append('Price', updatedData.price);
      formData.append('Year', updatedData.year);
      formData.append('IsFree', updatedData.isFree);

      await TestDocumentService.editTestDocument(id, updatedData);
      showAlert('success', 'Edit successful!');
      fetchTestDocumentData();
    } catch (error) {
      console.error('Failed to edit test document:', error);
      showAlert('error', 'Cannot Edit. Have something wrong!');
    }
  };

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };
  const fetchSubjectData = async () => {
    try {
      const response = await SubjectServices.getListSubject();
      if (response?.data && response?.status === 200) {
        setSubjectList(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const fetchGradeData = async () => {
    try {
      const response = await GradeServices.getListGrade();
      if (response?.data && response?.status === 200) {
        setGradeList(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const fetchTestDocumentData = async () => {
      try {
        // Check if all required parameters are set
        if (selectedSubject && selectedGrade && provinceId && indexPage) {
          const response = await TestDocumentService.getListTestDocument(
            indexPage,
            year,
            selectedSubject,
            selectedGrade,
            provinceId
          );
          if (response?.data && response?.status === 200) {
            setTestDocument(response.data);
          } else {
            console.error(response ?? 'Unexpected response structure');
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTestDocumentData();
    fetchSubjectData();
    fetchGradeData();
  }, [selectedSubject, selectedGrade, provinceId, indexPage, year]);

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
            Test Document
          </Typography>
        </Breadcrumbs>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAddTestDocument}
        >
          New Test Document
        </Button>
      </Stack>
      <FormControl variant="outlined" sx={{ width: 300, m: 2 }}>
        <InputLabel id="subject-label">Subject</InputLabel>
        <Select
          labelId="subject-label"
          id="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          label="Subject"
        >
          {subjectList.map((subject) => (
            <MenuItem key={subject.id} value={subject.id}>
              {subject.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ width: 300, m: 2 }}>
        <InputLabel id="grade-label">Grade</InputLabel>
        <Select
          labelId="grade-label"
          id="grade"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          label="grade"
        >
          {gradeList.map((grade) => (
            <MenuItem key={grade.id} value={grade.id}>
              {grade.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ width: 300, m: 2 }}>
        <InputLabel id="province-label">Province</InputLabel>
        <Select
          labelId="province-label"
          id="province"
          value={provinceId}
          onChange={(e) => setProvinceId(e.target.value)}
          label="Province"
        >
          <MenuItem value="1">Hà Nội</MenuItem>
          <MenuItem value="2">Tp HCM</MenuItem>
          <MenuItem value="3">Đà Nẵng</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ width: 300, m: 2 }}>
        <InputLabel id="year-label">Year</InputLabel>
        <Select
          labelId="year-label"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          label="Year"
        >
          <MenuItem value="2022">2022</MenuItem>
          <MenuItem value="2023">2023</MenuItem>
          <MenuItem value="2024">2024</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label="IndexPage"
        variant="outlined"
        name="index-page"
        onChange={(e) => setIndexPage(e.target.value)}
        sx={{ width: 300, m: 2 }}
      />
      {showAddTestDocumentForm && (
        <AddTestDocumentForm
          onClose={handleCloseAddTestDocument}
          selectedGrade={selectedGrade}
          selectedSubject={selectedSubject}
          year={year}
          provinceId={provinceId}
        />
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
              <TableHead
                order={order}
                orderBy={orderBy}
                rowCount={testDocument.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'id', label: 'ID' },
                  { id: 'name', label: 'Name' },
                  { id: 'description', label: 'Description' },
                  { id: 'content', label: 'Content' },
                  { id: 'contentSolve', label: 'ContentSolve' },
                  { id: 'price', label: 'Price' },
                  { id: 'isFree', label: 'IsFree' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <DocumentTable
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      content={item.content}
                      contentSolve={item.contentSolve}
                      price={item.price}
                      isFree={item.isFree}
                      year={item.year}
                      selected={selected.indexOf(item.name) !== -1}
                      handleClick={(event) => handleClick(event, item.name)}
                      onDelete={handleDeleteRow}
                      onEdit={(id, updatedData) => handleEditRow(id, updatedData)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, testDocument.length)}
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
          count={testDocument.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

export default ListDocumentView;
