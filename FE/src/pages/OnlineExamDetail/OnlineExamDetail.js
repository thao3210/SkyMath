import React, { useEffect, useState } from "react";
import './OnlineExamDetail.css';
import { Link } from "react-router-dom";

const OnlineExamDetail = () => {
    const examDurationInSeconds = 60 * 90;
    const [remainingTime, setRemainingTime] = useState(examDurationInSeconds);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1);
        }, 1000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(countdownInterval);
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    return (
        <section>
            <header className="bg-info-subtle border-bottom py-2 position-sticky top-0">
                <div className="d-flex align-items-center justify-content-between  px-lg-5 px-md-4 px-md-4 px-3">
                    <div className="time">
                        <i className="fa-regular fa-clock pe-2"></i>
                        <span>Remaining times: </span>
                        <span className="fw-bold">{formatTime(remainingTime)}</span>
                    </div>
                    <button type="button" className="btn border-0" data-bs-toggle="modal" data-bs-target="#modalExitOnlineExam">
                        Thoát
                        <i className="fa-solid fa-arrow-right-from-bracket ps-2"></i>
                    </button>

                </div>
            </header>

            <div className="modal fade" id="modalExitOnlineExam" tabIndex="-1" aria-labelledby="modalExitOnlineExamLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            <h1>Nộp bài?</h1>
                            <p>Bạn đã sẵn sàng nộp bài?</p>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button type="button" className="btn btn-primary">Nộp bài</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Tiếp tục</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-3">
                <div className="py-3">
                    <h3 className='text-uppercase fw-bold'>ĐỀ Thi TUYỂN SINH LỚP 10 MÔN TOÁN - HÀ NỘI NĂM 2023 - 2024 (ĐỀ CHÍNH THỨC)</h3>
                    {[...Array(10)].map((_, i) => (
                        <div className="bg-white shadow-sm rounded-3 py-2 px-3 mb-3" key={i}>
                            <p className="fw-bold fs-5 mb-2">Câu {i + 1}:</p>
                            <p>Mark the letter A, B, C, or D on your answer sheet to indicate the word whose underlined part differs from the other three in pronunciation in each of the following questions</p>
                            <div className="ps-3">
                                {[...Array(4)].map((_, index) => (
                                    <div className="form-check pb-2" key={index}>
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id={`flexRadioDefault_${i}_${index}`} />
                                        <label className="form-check-label" htmlFor={`flexRadioDefault_${i}_${index}`}>
                                            Default radio {index}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-primary"><i className="fa-solid fa-check small pe-2"></i>Nộp bài</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OnlineExamDetail;