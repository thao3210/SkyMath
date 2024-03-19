import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { emptyRows, applyFilter, getComparator } from 'src/utils/tableUtils';

import GradeServices from 'src/services/GradeServices';
import SubjectServices from 'src/services/SubjectServices';
import TestDocSystemService from 'src/services/TestDocSystemServices';

import Link from 'src/components/link';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableHead from 'src/components/table/table-head';
import TableNoData from 'src/components/table/table-no-data';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import TableEmptyRows from 'src/components/table/table-empty-rows';
import CourseTableToolbar from 'src/components/table/table-toolbar';

import DocumentSystemTable from '../TestDocSystemTable';
import AddTestDocSystemForm from './AddTestDocSystemForm';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ListTestDocSystemView = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [testDocSystem, setTestDocSystem] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [gradeList, setGradeList] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [indexPage, setIndexPage] = useState('');
  const [year, setYear] = useState('');
  const [years, setYears] = useState([]);
  const [provinceId, setProvinceId] = useState('');
  const [showAddTestDocSystemForm, setShowAddTestDocSystemForm] = useState(false);

  const handleAddTestDocSystem = () => {
    setShowAddTestDocSystemForm(true);
  };

  const handleCloseAddTestDocSystem = () => {
    setShowAddTestDocSystemForm(false);
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
      const newSelecteds = testDocSystem.map((n) => n.id);
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
    inputData: testDocSystem,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleDeleteRow = async (id) => {
    try {
      const response = await TestDocSystemService.deleteTestDocument(id);

      if (response && response.status === 204) {
        showAlert('success', 'Delete successful!');
        fetchTestDocSystemData();
      } else {
        showAlert('error', 'Cannot Delete. Have something wrong!');
      }
    } catch (error) {
      console.error('Failed to delete document:', error);
      showAlert('error', 'An error occurred.');
    }
  };

  const fetchTestDocSystemData = useCallback(async () => {
    if (!indexPage) {
      showAlert('error', 'You must enter index page');
      return;
    }
    try {
      const response = await TestDocSystemService.getListTestDocument(
        indexPage,
        year,
        selectedSubject,
        selectedGrade,
        provinceId
      );

      if (response?.data && response?.status === 200) {
        setTestDocSystem(response.data);
        setYear(null);
        setSelectedGrade(null);
        setSelectedSubject(null);
        setProvinceId(null);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [indexPage, year, selectedSubject, selectedGrade, provinceId]);

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

  const handleClearState = () => {
    setYear(null);
    setSelectedGrade(null);
    setSelectedSubject(null);
    setProvinceId(null);
    setIndexPage('');
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearArr = Array.from({ length: currentYear - 1989 }, (_, index) => 1990 + index);
    setYears(yearArr.reverse());
  }, []);

  useEffect(() => {
    fetchSubjectData();
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
            Test Document System
          </Typography>
        </Breadcrumbs>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAddTestDocSystem}
        >
          New Test Document
        </Button>
      </Stack>
      <Stack direction="column" justifyContent="center" spacing={2} marginBottom={1} width="80%">
        <Stack direction="row" spacing={2}>
          <FormControl variant="outlined" sx={{ width: 300 }}>
            <InputLabel id="subject-label">Subject</InputLabel>
            <Select
              labelId="subject-label"
              id="subject"
              value={selectedSubject || ''}
              onChange={(e) => setSelectedSubject(e.target.value)}
              label="Subject"
            >
              {subjectList.map((subject, index) => (
                <MenuItem key={index} value={subject.id}>
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ width: 300 }}>
            <InputLabel id="grade-label">Grade</InputLabel>
            <Select
              labelId="grade-label"
              id="grade"
              value={selectedGrade || ''}
              onChange={(e) => setSelectedGrade(e.target.value)}
              label="grade"
              MenuProps={MenuProps}
            >
              {gradeList.map((grade) => (
                <MenuItem key={grade.id} value={grade.id}>
                  {grade.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ width: 300 }}>
            <InputLabel id="province-label">Province</InputLabel>
            <Select
              labelId="province-label"
              id="province"
              value={provinceId || ''}
              onChange={(e) => setProvinceId(e.target.value)}
              label="Province"
            >
              <MenuItem value="1">Hà Nội</MenuItem>
              <MenuItem value="2">Tp HCM</MenuItem>
              <MenuItem value="3">Đà Nẵng</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <FormControl variant="outlined" sx={{ width: 300 }}>
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              id="year"
              value={year || ''}
              onChange={(e) => setYear(e.target.value)}
              label="Year"
              MenuProps={MenuProps}
            >
              {years.map((yearItem, index) => (
                <MenuItem key={index} value={yearItem}>
                  {yearItem}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="IndexPage"
            variant="outlined"
            name="index-page"
            sx={{ width: 300 }}
            onChange={(e) => setIndexPage(e.target.value)}
          />
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mdi:filter" />}
            sx={{ width: 141, height: 50 }}
            onClick={fetchTestDocSystemData}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="ant-design:clear-outlined" />}
            sx={{ width: 141, height: 50 }}
            onClick={handleClearState}
          >
            Clear
          </Button>
        </Stack>
      </Stack>

      {showAddTestDocSystemForm && (
        <>
          <Box sx={{ border: '0.5px solid #666', marginBottom: 1, width: "85%" }}/>
          <AddTestDocSystemForm
            indexPage={indexPage}
            subject={selectedSubject}
            grade={selectedGrade}
            province={provinceId}
            year={year}
            closeForm={handleCloseAddTestDocSystem}
          />
        </>
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
                rowCount={testDocSystem.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name', align: 'center' },
                  { id: 'timeLimit', label: 'Time Limit', align: 'center' },
                  { id: 'grade', label: 'Grade', align: 'center' },
                  { id: 'subject', label: 'Subject', align: 'center' },
                  { id: 'province', label: 'Province', align: 'center' },
                  { id: 'year', label: 'Year', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <DocumentSystemTable
                      key={index}
                      id={item.id}
                      name={item.name}
                      timeLimit={item.timeLimit}
                      grade={item.grade}
                      subject={item.subject}
                      province={item.province}
                      year={item.year}
                      selected={selected.indexOf(item.id) !== -1}
                      handleClick={(event) => handleClick(event, item.id)}
                      onDelete={handleDeleteRow}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, testDocSystem.length)}
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
          count={testDocSystem.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

export default ListTestDocSystemView;
