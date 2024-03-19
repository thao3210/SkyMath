import React, { useEffect, useState } from 'react';
import './DocumentDetail.css';
import { Link, useParams } from 'react-router-dom';
import TestDocumentService from '../../../services/TestDocumentService';

const DocumentDetail = () => {
    const { id } = useParams();
    const [docDetailData, setDocDetailData] = useState(null);
    const [docsData, setDocsData] = useState([]);

    useEffect(() => {
        const fetchDocDetailData = async () => {
            try {
                const result = await TestDocumentService.getDocumentDetailByID(id);
                console.log(result);
                console.log(id)
                if (result.status === 200) {
                    setDocDetailData(result.data);
                } else {
                    console.error("Error courses result status", result.status);
                }
            } catch (err) {
                console.error(err.message);
            }
        };
        console.log(id)
        fetchDocDetailData();
    }, [id]);

    useEffect(() => {
        const fetchDocsData = async () => {
            try {
                const indexPage = 1;
                const year = 0;
                const subject = 0;
                const grade = 0;
                const province = 0;
                const response = await TestDocumentService.getListTestDocuments(indexPage, year, subject, grade, province);
                setDocsData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDocsData();
    }, []);

    return (
        <section>
            <div className="container py-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb fs-6">
                        <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                        <li className="breadcrumb-item"><Link to="/Documents">Tài liệu</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{docDetailData?.name}</li>
                    </ol>
                </nav>
                <h3 className='text-uppercase fw-bold pt-3'>{docDetailData?.name}</h3>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center justify-content-start fs-6 gap-lg-4 gap-2'>
                        <div className='small'>
                            <i className="small p-2 fa-solid fa-graduation-cap m-0"></i>
                            <span>{docDetailData?.grade}</span>
                        </div>
                        <div className='small'>
                            <i className="small p-2 fa-solid fa-clock m-0"></i>
                            <span>{docDetailData?.year}</span>
                        </div>
                        <div className='small'>
                            <i className="small p-2 fa-solid fa-location-dot m-0"></i>
                            <span>{docDetailData?.province}</span>
                        </div>
                    </div>
                </div>
                <div className='container border-bottom'>
                    <div className='m-lg-4 pt-3' >
                        <h4 className='text-center text-uppercase fw-bold mb-lg-4 mb-2'>Đề bài</h4>
                        <div id='pdf-exam-container'>
                            <div className='d-flex flex-grow-1 overflow-hidden bg-dark' >
                                <div className='col'>
                                    <iframe className='iframe-pdf' src={docDetailData?.content} title={`${docDetailData?.name}-doc`} allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='m-lg-4 pt-5' >
                        <h4 className='text-center text-uppercase fw-bold mb-lg-4 mb-2'>Đáp án</h4>
                        <div id='pdf-answer-container'>
                            <div className='d-flex flex-grow-1 overflow-hidden bg-dark' >
                                <div className='col'>
                                    <iframe className='iframe-pdf' src={docDetailData?.contentSolve} title={`${docDetailData?.name}-answer`} allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container mt-5'>
                    <h4 className='text-uppercase fw-bold'>Các tài liệu khác</h4>
                    <ul className="list-unstyled ps-0">
                        <li className=" border-bottom mb-1">
                            <div className={`collapse mt-1 ps-2 show`} id="course1-collapse">
                                <ul className="btn-toggle-nav list-unstyled py-1">
                                    {docsData.map((doc, index) => (
                                        <li key={index}
                                            className='py-2 d-block border-bottom mx-4'
                                        >
                                            <div className='fs-5 fw-bold mb-2'>
                                                <Link
                                                    to="/Documents"
                                                    className="link-dark link-exam"
                                                >
                                                    <i className="fa-solid fa-caret-right pe-2 text-primary m-0"></i> {doc.name}
                                                </Link>
                                            </div>
                                            <div className='d-flex align-items-center justify-content-start mt-2' style={{ fontSize: '15px' }}>
                                                <div className='small pe-4'>
                                                    <i className="small pe-2 fa-solid fa-book-open-reader m-0"></i>
                                                    <span>{doc.subject}</span>
                                                </div>
                                                <div className='small pe-4'>
                                                    <i className="small pe-2 fa-solid fa-graduation-cap m-0"></i>
                                                    <span>{doc.grade}</span>
                                                </div>
                                                <div className='small pe-4'>
                                                    <i className="small pe-2 fa-solid fa-clock m-0"></i>
                                                    <span>{doc.year}</span>
                                                </div>
                                                <div className='small pe-4'>
                                                    <i className="small pe-2 fa-solid fa-location-dot m-0"></i>
                                                    <span>{doc.province}</span>
                                                </div>
                                                <div className='small pe-4'>
                                                    <span className='text-success'>Có đáp án</span>
                                                </div>
                                            </div>
                                        </li>

                                    ))}
                                </ul>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <Link to={`/Documents`} className="my-2 border-0 bg-white text-primary" >
                                        <span>Hiển thị tất cả </span>
                                        <i className="fa-solid fa-angles-right small m-0"></i>
                                    </Link>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>

            </div>
        </section >
    );
};

export default DocumentDetail;
