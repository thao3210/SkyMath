import React from "react";
import './LessonList.css';
import { Link } from "react-router-dom";


const LessonList = () => {

    return (
        <div className="">
            <div className="d-flex">
                <div className="col-auto col-md-3 col-xl-3 px-2 my-4 overflow-auto scrollbar">
                    <h5 className="fw-bold ps-2">Bài học</h5>
                    {[...Array(8)].map((_, i) => (
                        <button
                            key={i}
                            className="btn btn-light text-start d-flex align-items-center justify-content-between px-2 py-3 my-1 w-100"
                        >
                            <span>Bài {i+1}: Ôn tập các số đến 100</span>
                            <i className="fa-solid fa-angle-right ps-1 m-0"></i>
                        </button>
                    ))}
                </div>
                <div className="col">
                    <nav className="fw-bold px-4 pt-4" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link className="text-decoration-none" to="/Course">Lớp 1</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Tên khóa học</li>
                        </ol>
                    </nav>
                    <h3 className="fw-bold px-4">Bài 1: Ôn tập các số đến 100</h3>
                    <div className="d-flex flex-wrap mx-4 bg-white border rounded px-3" style={{ flexDirection: 'row' }}>
                        <div className="w-50 py-4">
                            <h5 className="fw-bold pb-2">Lý thuyết</h5>
                            <div className="d-grid">
                                <Link to="/Lesson" className="text-decoration-none fs-5">
                                    <i className="fa-regular fa-circle-play pe-2"></i>
                                    <span>Ôn tập: Các số đến 100</span>
                                    </Link>
                            </div>
                        </div>
                        <div className="w-50 py-4">
                            <h5 className="fw-bold pb-2">Luyện tập</h5>
                            <div className="d-grid">
                                {[...Array(3)].map((_, i) => (
                                    <Link
                                        key={i}
                                        to="/Lesson"
                                        className="text-decoration-none fs-5"
                                    >
                                        <i className="fa-regular fa-circle-check pe-2"></i>
                                        <span>Ôn tập các số đến 100 (Phần 1)</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="w-50 py-4">
                            <h5 className="fw-bold pb-2">Tài liệu dành cho giáo viên</h5>
                            <div className="d-grid">
                                <Link to="/Lesson" className="text-decoration-none fs-5"><i className="fa-regular fa-file-powerpoint pe-2"></i><span>Bài giảng PPT: Ôn tập các số đến 100</span></Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LessonList;