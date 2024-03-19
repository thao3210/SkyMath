import React, { useState } from "react";
import './TableCompetitionRoom.css';

const TableCompetitionRoom = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleClickPrevious = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleClickNext = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const renderTableRows = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return [...Array(100)].slice(startIndex, endIndex).map((_, index) => (
            <tr key={index}>
                <th scope="row">{startIndex + index + 1}</th>
                <td className="py-3">Thi đấu SkyMath - Lớp 9</td>
                <td className="py-3">9</td>
                <td className="py-3">Toán</td>
                <td className="py-3">2000</td>
            </tr>
        ));
    };

    return (
        <section className="px-lg-5 px-3">
            <h1 className='fw-bold text-white'>Danh sách phòng thi đấu</h1>
            <div className='d-flex flex-wrap align-items-center gap-lg-4 gap-2 py-3'>
                <button className='btn btn-primary px-3 rounded-pill'>Đấu trường</button>
                <button className='btn btn-primary px-3 rounded-pill'>Cuộc thi SkyMath</button>
                <button className='btn btn-primary px-3 rounded-pill'>Chủ đề hot</button>
            </div>
            <table className="table mb-0 rounded-top-4 overflow-hidden">
                <thead className="table-primary">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên cuộc thi</th>
                        <th scope="col">Lớp</th>
                        <th scope="col">Môn học</th>
                        <th scope="col">Player</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>
            <div className="d-flex align-items-center justify-content-center gap-2 bg-primary-subtle py-2 rounded-bottom-4">
                <button
                    className="btn btn-danger btn-pagination-table rounded-circle"
                    disabled={currentPage === 1}
                    onClick={handleClickPrevious}
                >
                    <i className="fa-solid fa-angle-left"></i>
                </button>
                <input type="number" className="form-control rounded-pill text-center me-0 w-25 flex-grow-0" value={currentPage} readOnly />
                <button
                    className="btn btn-danger btn-pagination-table rounded-circle"
                    disabled={currentPage === Math.ceil(100 / itemsPerPage)}
                    onClick={handleClickNext}
                >
                    <i className="fa-solid fa-angle-right"></i>
                </button>
            </div>
        </section>
    )
}

export default TableCompetitionRoom;
