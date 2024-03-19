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
import { Box, Grid, Button, Dialog, TextField, DialogTitle, DialogContent } from '@mui/material';

import { emptyRows, applyFilter, getComparator } from 'src/utils/tableUtils';

import SlideServices from 'src/services/SlideServices';

import Link from 'src/components/link';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from 'src/components/table/table-no-data';
import SlideTableHead from 'src/components/table/table-head';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import TableEmptyRows from 'src/components/table/table-empty-rows';
import SlideTableToolbar from 'src/components/table/table-toolbar';

import SlideTable from '../slide-table-view';

const ListSlideView = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [slide, setSlide] = useState([]);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = slide.map((n) => n.slogan);
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

  const fetchSlideData = async () => {
    try {
      const response = await SlideServices.getListSlide();
      if (response?.data && response?.status === 200) {
        setSlide(response.data);
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
    inputData: slide,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleDeleteRow = async (id) => {
    try {
      const response = await SlideServices.deleteSlide(id);

      if (response && response.status === 204) {
        showAlert('success', 'Delete successful!');
        fetchSlideData();
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
  const [slideData, setSlideData] = useState({
    /* Initial slide data */
  });

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleAdd = async () => {
    const formData = new FormData();
    try {
      formData.append('Slogan', slideData.slogan);
      formData.append('Slide', image);

      const response = await SlideServices.createSlide(formData);

      if (response && response.status === 201) {
        showAlert('success', 'Slide added successfully!');
        handleCloseAddDialog();
        fetchSlideData();
      } else {
        showAlert('error', 'Failed to add slide. Please try again.');
      }
    } catch (error) {
      console.error('Failed to add slide:', error);
      console.error('Server response:', error.response?.data);
      showAlert('error', 'An error occurred while adding the slide.');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSlideData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const newSLideAdded = localStorage.getItem('newSLideAdded') === 'true';

    if (newSLideAdded) {
      showAlert('success', 'Add Slide successful!');
      localStorage.removeItem('newSLideAdded');
    }

    fetchSlideData();
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
            Slide
          </Typography>
        </Breadcrumbs>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenAddDialog}
        >
          New Slide
        </Button>
      </Stack>

      <Card>
        <SlideTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <SlideTableHead
                order={order}
                orderBy={orderBy}
                rowCount={slide.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'imageLink', label: 'Image' },
                  { id: 'slogan', label: 'Slogan' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <SlideTable
                      key={item.id}
                      id={item.id}
                      imageLink={item.imageLink}
                      slogan={item.slogan}
                      status={item.status}
                      selected={selected.indexOf(item.id) !== -1}
                      handleClick={(event) => handleClick(event, item.id)}
                      onDelete={handleDeleteRow}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, slide.length)}
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
          count={slide.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Slide</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <TextField
              margin="dense"
              id="outlined-basic"
              label="Slogan"
              variant="outlined"
              // onBlur={handleBlur}
              onChange={handleInputChange}
              name="slogan"
              //   error={!!touched.courseName && !!errors.courseName}
              //   helperText={touched.courseName && errors.courseName}
            />
          </Typography>
          <Grid item xs={6} sx={{ p: 0 }}>
            <Box>
              <Typography variant="h6">Images</Typography>
              <Stack direction="column" spacing={2}>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: 330, maxHeight: 330, borderRadius: 4 }}
                  />
                )}
                <Button
                  variant="contained"
                  component="label"
                  //  startIcon={<CloudUploadIcon />}
                >
                  Upload File
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
              </Stack>
            </Box>
          </Grid>
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

export default ListSlideView;
