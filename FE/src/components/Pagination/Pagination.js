import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange, pageSize = 5 }) => {
    const totalPageGroups = Math.ceil(totalPages / pageSize);
    const currentPageGroup = Math.ceil(currentPage / pageSize);

    const startPage = (currentPageGroup - 1) * pageSize + 1;
    const endPage = Math.min(startPage + pageSize - 1, totalPages);

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
        <div>
            <div className="d-flex flex-wrap gap-1 pagination">
                <button onClick={() => onPageChange(1)} className={`btn-pagination rounded d-flex align-items-center justify-content-center ${currentPage === 1 ? 'disabled' : ''}`}>
                    <i className='fa-solid fa-angles-left'></i>
                </button>
                <button onClick={() => onPageChange(currentPage - 1)} className={`btn-pagination rounded d-flex align-items-center justify-content-center ${currentPage === 1 ? 'disabled' : ''}`}>
                    <i className='fa-solid fa-angle-left'></i>
                </button>
                {currentPageGroup > 1 && (
                    <button onClick={() => onPageChange(startPage - 1)} className="btn-pagination rounded d-flex align-items-center justify-content-center">
                        ...
                    </button>
                )}
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={`btn-pagination rounded d-flex align-items-center justify-content-center ${pageNumber === currentPage ? 'active' : ''}`}
                    >
                        {pageNumber}
                    </button>
                ))}
                {currentPageGroup < totalPageGroups && (
                    <button onClick={() => onPageChange(endPage + 1)} className="btn-pagination rounded d-flex align-items-center justify-content-center">
                        ...
                    </button>
                )}
                <button onClick={() => onPageChange(currentPage + 1)} className={`btn-pagination rounded d-flex align-items-center justify-content-center ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <i className='fa-solid fa-angle-right'></i>
                </button>
                <button onClick={() => onPageChange(totalPages)} className={`btn-pagination rounded d-flex align-items-center justify-content-center ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <i className='fa-solid fa-angles-right'></i>
                </button>
            </div>
        </div>
    );
};

export default Pagination;
