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

import IntroduceServices from 'src/services/IntroduceServices';

import Link from 'src/components/link';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from 'src/components/table/table-no-data';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import IntroduceTableHead from 'src/components/table/table-head';
import TableEmptyRows from 'src/components/table/table-empty-rows';
import IntroduceTableToolbar from 'src/components/table/table-toolbar';

import IntroduceTableRow from '../introduce-table-row';

const ListIntroduceView = () => {
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [introduce, setIntroduce] = useState([]);

    const [openAddIntroduce, setOpenAddIntroduce] = useState(false);

    const [alertMessage, setAlertMessage] = useState(null);

    const [alertSeverity, setAlertSeverity] = useState('success');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState('');
    
    const [content, setContent] = useState('');

    const handleOpenModal = () => setOpenAddIntroduce(true);
    const handleCloseModal = () => setOpenAddIntroduce(false);

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = introduce.map((n) => n.name);
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

    const fetchIntroduceData = async () => {
        try {
            const response = await IntroduceServices.getListIntroduce();
            // console.log("response data: ", response.data);
            if (response?.data && response?.status === 200) {
                setIntroduce(response.data);
            } else {
                console.error(response ?? 'Unexpected response structure');
            }
        } catch (error) {
            console.error(error.message);
        }
    }

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
        inputData: introduce,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const handleAddIntroduce = async (e) => {
        e.preventDefault();
        const credentials = { title, content };
        console.log("credentials: ", credentials);
        try {
            const response = await IntroduceServices.addIntroduce(credentials);
            if (response.status === 201) {
                setAlertSeverity('success');
                setAlertMessage('Add Introduce successful!');
                setIsModalOpen(true);
                handleCloseModal();
                fetchIntroduceData();
            } else {
                setAlertSeverity('error');
                setAlertMessage('Cannot Add Introduce. Have something wrong!');
                setIsModalOpen(true);
                handleCloseModal();
            }
        } catch (error) {
            console.error('Failed to add Introduce:', error);
            setAlertSeverity('error');
            setAlertMessage('Have something wrong.');
            setIsModalOpen(true);
            handleCloseModal();
        }
    };

    const handleDeleteRow = async (id) => {
        try {
            // Gọi hàm onDelete và chuyển id của Introduce cần xóa
            const response = await IntroduceServices.deleteIntroduce(id);

            if (response && response.status === 204) {
                // Hiển thị alert khi xóa thành công
                setAlertSeverity('success');
                setAlertMessage('Delete successful!');
                handleCloseDeleteModal();
                setIsModalOpen(true);

                fetchIntroduceData();
            } else {
                // Hiển thị thông báo lỗi nếu không thành công
                setAlertSeverity('error');
                setAlertMessage('Cannot Delete. Have something wrong!');
                handleCloseDeleteModal();
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Failed to delete Introduce:', error);
            setAlertSeverity('error');
            setAlertMessage('Đã có lỗi xảy ra.');
            handleCloseDeleteModal();
            setIsModalOpen(true);
        }
    };

    const handleCloseDeleteModal = () => {
        setIsModalOpen(false);
    };

    const notFound = !dataFiltered.length && !!filterName;

    useEffect(() => {
        fetchIntroduceData();
    }, []);

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="large" />}
                    aria-label="breadcrumb"
                >
                    <Link href="/">
                        <Stack direction="row" alignItems="center">
                            <HomeRoundedIcon sx={{ mr: 0.5 }} fontSize="medium" />
                            <Typography variant="h5">HomePage</Typography>
                         </Stack>
                    </Link>

                    <Typography variant="h5" color="text.primary">Introduce</Typography>
                </Breadcrumbs>

                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenModal}>
                    New Introduce
                </Button>
            </Stack>

            <Dialog open={openAddIntroduce} onClose={handleCloseModal}>
                <DialogTitle>Add New Introduce</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        fullWidth
                        label="Introduce Title"
                        variant="outlined"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <TextField
                        margin="dense"
                        fullWidth
                        label="Introduce Content"
                        variant="outlined"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mt: 2 }}
                    >
                        <Button variant="contained" color="primary" type='submit' onClick={handleAddIntroduce}>
                            Add Introduce
                        </Button>
                        <Button variant="contained" color="warning" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            <Card>
                <IntroduceTableToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <IntroduceTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={introduce.length}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: 'title', label: 'Title' },
                                    { id: 'content', label: 'Content' },
                                    { id: 'status', label: 'Status' },
                                    { id: '' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((introduceItem) => (
                                        <IntroduceTableRow
                                            key={introduceItem.id}
                                            id={introduceItem.id}
                                            title={introduceItem.title}
                                            content={introduceItem.content}
                                            selected={selected.indexOf(introduceItem.name) !== -1}
                                            handleClick={(event) => handleClick(event, introduceItem.name)}
                                            onDelete={handleDeleteRow}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(page, rowsPerPage, introduce.length)}
                                />

                                {notFound && <TableNoData query={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <CustomSnackbar
                    open={isModalOpen}
                    onClose={handleCloseDeleteModal}
                    message={alertMessage}
                    severity={alertSeverity}
                />

                <TablePagination
                    page={page}
                    component="div"
                    count={introduce.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}

export default ListIntroduceView;