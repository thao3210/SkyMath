import React, { useState } from 'react';

import './Books.css';
import { Link } from 'react-router-dom';
import Pagination from '../../../components/Pagination/Pagination';
import FlipBookModal from '../../../components/Modal/FlipBookModal/FlipBookModal';

const Books = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;
    const totalBooks = 200;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = [...Array(200)].slice(indexOfFirstBook, indexOfLastBook);


    return (
        <div className="bg-dark">
            <div className="container py-3">

                <div className='d-flex align-items-center my-2'>
                    <div className='d-flex align-items-center bg-white px-2 rounded-3'>
                        <i className="fa-solid fa-magnifying-glass fs-5 m-0"></i>
                        <input className='border border-0 p-2 rounded input-search' type='text' placeholder='Tìm kiếm sách'></input>
                    </div>
                    <button className='py-2 px-4 rounded-3 mx-1 btn btn-primary fw-bold'>Tìm kiếm</button>
                </div>

                <div className="bg-white rounded-3 px-lg-3 my-2">
                    <div className="container my-2 pb-5">
                        <h3 className='text-uppercase fw-bold py-lg-3 py-2'>Kho Tàng Tri Thức</h3>
                        <div className='d-flex flex-wrap gap-lg-3 gap-md-3 gap-sm-2 gap-2 align-items-center justify-content-center'>
                            {currentBooks.map((_, i) => (
                                <div key={i} className="card rounded-3 card-book">
                                    <img src={"https://picsum.photos/200/300"} alt={`book-img`} className='rounded-3 object-fit-cover book-img' />
                                    <div className="p-lg-3 p-2">
                                        <div className='line-clamp' >
                                            <Link to="/BookDetails" className="card-title fw-bold card-book-title text-decoration-none">{`Book name ${i}`}</Link>

                                            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#flipBookModal">
                                                Launch demo modal
                                            </button>
                                            <FlipBookModal></FlipBookModal> */}
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className='d-flex align-items-center justify-content-center mt-5'>
                            <Pagination currentPage={currentPage} totalPages={Math.ceil(totalBooks / booksPerPage)} onPageChange={handlePageChange} pageSize={3} />
                        </div>
                    </div>

                </div>
            </div>
        </div >

    );
};

export default Books;
