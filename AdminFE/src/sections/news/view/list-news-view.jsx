import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

import NewsServices from 'src/services/NewsServices';

import Link from 'src/components/link';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import NewsTableHead from 'src/components/table/table-head';
import TableNoData from 'src/components/table/table-no-data';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import NewsTableToolbar from 'src/components/table/table-toolbar';
import TableEmptyRows from 'src/components/table/table-empty-rows';

import NewsTableRow from '../news-table-row';

const ListNewsView = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [news, setNews] = useState([]);
    const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

    const handleNewNewsClick = () => {
        navigate('/news/addNews');
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
            const newSelecteds = news.map((n) => n.name);
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

    const fetchNewsData = async () => {
        try {
            const response = await NewsServices.getListNews();
            if (response?.data && response?.status === 200) {
                setNews(response.data);
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
        inputData: news,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    const handleDeleteRow = async (id) => {
        try {
            const response = await NewsServices.deleteNews(id);

            if (response && response.status === 204) {
                showAlert('success', 'Delete successful!');
                fetchNewsData();
            } else {
                showAlert('error', 'Cannot Delete. Have something wrong!');
            }
        } catch (error) {
            console.error('Failed to delete news:', error);
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
        const newNewsAdded = localStorage.getItem('newNewsAdded') === 'true';
        const editNews = localStorage.getItem('editNews') === 'true';

        if (newNewsAdded) {
            showAlert('success', 'Add News successful!');
            localStorage.removeItem('newNewsAdded');
        }

        if (editNews) {
            showAlert('success', 'Edit News successful!');
            localStorage.removeItem('editNews');
        }

        fetchNewsData();
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

                    <Typography variant="h5" color="text.primary">News</Typography>
                </Breadcrumbs>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={handleNewNewsClick}
                >
                    New News
                </Button>
            </Stack>

            <Card>
                <NewsTableToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <NewsTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={news.length}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: 'image', label: 'Image' },
                                    { id: 'title', label: 'Title' },
                                    { id: 'overview', label: 'Overview' },
                                    { id: 'content', label: 'Content' },
                                    { id: 'status', label: 'Status' },
                                    { id: '' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((newsItem) => (
                                        <NewsTableRow
                                            key={newsItem.id}
                                            id={newsItem.id}
                                            title={newsItem.title}
                                            overview={newsItem.overview}
                                            status={newsItem.status}
                                            imageLink={newsItem.imageLink}
                                            content={newsItem.content}
                                            newsAndEventAttributes={newsItem.newsAndEventAttributes}
                                            selected={selected.indexOf(newsItem.name) !== -1}
                                            handleClick={(event) => handleClick(event, newsItem.name)}
                                            onDelete={handleDeleteRow}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(page, rowsPerPage, news.length)}
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
                    count={news.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
};

export default ListNewsView;
