import React, { useState } from "react";
import { Link } from "react-router-dom";
import './LeaderboardPage.css';
import GoldenReward from '../../../assets/images/gold-reward.png';
import OrangeReward from '../../../assets/images/orange-reward.png';
import BlueReward from '../../../assets/images/blue-reward.png';
import Crown from '../../../assets/images/crown.png';

const LeaderboardPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const handleClickPrevious = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleClickNext = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const renderLeaderboardItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return [...Array(100)].slice(startIndex, endIndex).map((_, index) => (
            <div key={index} className="d-flex align-items-center justify-content-between px-3 py-1 bg-primary text-white rounded">
                <div>
                    <span>{startIndex + index + 4}</span>
                    <img src={GoldenReward} alt="ranked-user" className="ranked-img object-fit-contain" />
                    <span>Nguyen Van A</span>
                </div>
                <div>
                    <span>10000</span>
                </div>
            </div>
        ));
    };


    return (
        <section className="leaderboard-page-section pb-5">
            <Link to={`/OnlineExam`} className="btn btn-warning text-white fw-bold me-4 mt-4 float-end"><i className="fa-solid fa-x"></i></Link>
            <h1 className="text-center text-white text-uppercase fw-bold pt-5 pb-3 display-5">Bảng xếp hạng</h1>
            <div className="d-flex align-items-center justify-content-center">
                <div className="col-lg-6 col-md-8 col rounded-4 bg-primary-subtle px-lg-4 px-2 py-4 mx-2">
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div>
                            <span>Theo lớp</span>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Tất cả các lớp</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <span>Theo thể lệ</span>
                            <div className="d-flex align-items-center gap-lg-3 gap-1">
                                <img src={GoldenReward} alt="golden-reward" className="rule-img" />
                                <img src={OrangeReward} alt="orange-reward" className="rule-img" />
                                <img src={BlueReward} alt="blue-reward" className="rule-img" />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between bg-primary rounded-pill py-1 px-1 mt-3">
                        <button className="btn btn-warning text-white rounded-pill py-lg-1 py-md-1 px-lg-4 px-md-3 px-2 py-0">Tổng</button>
                        <button className="btn text-white rounded-pill py-lg-1 py-md-1 px-lg-4 px-md-3 px-2 py-0">Tuần này</button>
                        <button className="btn text-white rounded-pill py-lg-1 py-md-1 px-lg-4 px-md-3 px-2 py-0">Tháng này</button>
                    </div>

                    <div className="d-flex align-items-end justify-content-center mt-3 pb-5">
                        <div className="d-flex flex-column align-items-center second-ranked">
                            <span className="pb-3 fs-3 fw-bold d-flex flex-column align-items-center">2<i className="fa-solid fa-caret-down fs-5"></i></span>
                            <img src={OrangeReward} alt="second-ranked" className="mb-2 border border-4 border-primary rounded-circle bg-primary-subtle object-fit-contain second-ranked-img" />
                            <span className="fw-bold text-center top-ranker-name">Phung Thi Nhu Quynh</span>
                            <span className="top-ranker-mark">100000</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <img src={Crown} alt="crown" className="crown-img mb-2" />
                            <img src={GoldenReward} alt="first-ranked" className="mb-2 border border-4 border-primary rounded-circle bg-primary-subtle object-fit-contain z-1 first-ranked-img" />
                            <span className="fw-bold text-center top-ranker-name">Phung Thi Nhu Quynh</span>
                            <span className="top-ranker-mark">100000</span>
                        </div>
                        <div className="d-flex flex-column align-items-center third-ranked">
                            <span className="pb-3 fs-3 fw-bold d-flex flex-column align-items-center">3<i className="fa-solid fa-caret-down fs-5"></i></span>
                            <img src={BlueReward} alt="third-ranked" className="mb-2 border border-4 border-primary rounded-circle bg-primary-subtle object-fit-contain third-ranked-img" />
                            <span className="fw-bold text-center top-ranker-name">Phung Thi Nhu Quynh</span>
                            <span className="top-ranker-mark">100000</span>
                        </div>
                    </div>

                    <div className="d-flex align-items-start">
                        <button className="d-lg-block d-md-block d-none btn btn-warning text-white btn-pagination-leaderboard-left" onClick={handleClickPrevious} disabled={currentPage === 1}><i className="fa-solid fa-angle-left"></i></button>
                        <div className="d-flex flex-column gap-2 w-100">
                            {renderLeaderboardItems()}

                            <div className="d-flex align-items-center justify-content-between px-3 py-1 bg-primary text-white rounded position-sticky bottom-0">
                                <div>
                                    <span>21</span>
                                    <img src={GoldenReward} alt="ranked-user" className="ranked-img object-fit-contain" />
                                    <span>Nguyen Van A</span>
                                </div>
                                <div>
                                    <span>10000</span>
                                </div>
                            </div>
                        </div>
                        <button className="d-lg-block d-md-block d-none btn btn-warning text-white btn-pagination-leaderboard-right" onClick={handleClickNext} disabled={currentPage === Math.ceil(100 / itemsPerPage)}><i className="fa-solid fa-angle-right"></i></button>
                    </div>

                    <div className="d-lg-none d-md-none d-flex gap-3 align-items-center justify-content-center pt-3">
                        <button className="btn btn-warning text-white " onClick={handleClickPrevious} disabled={currentPage === 1}><i className="fa-solid fa-angle-left"></i></button>
                        <button className="btn btn-warning text-white " onClick={handleClickNext} disabled={currentPage === Math.ceil(100 / itemsPerPage)}><i className="fa-solid fa-angle-right"></i></button>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default LeaderboardPage;