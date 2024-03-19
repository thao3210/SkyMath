import React from "react";
import './Leaderboard.css';
import GoldReward from '../../../../assets/images/orange-reward.png';

const Leaderboard = () => {
    return (
        <section>
            <div className="bg-primary-subtle rounded-4 py-3 d-flex align-items-center flex-column px-lg-4 px-3">
                <div className="text-center board-leaderboard text-uppercase">Bảng xếp hạng</div>
                <ol className="bg-warning-subtle rounded-4 px-2 py-3 my-3 overflow-y-auto leaderboard-list  list-unstyled w-100" type="1">
                    {[...Array(100)].map((_, index) => (
                        <li key={index} className="d-flex align-items-center justify-content-between py-2 px-2" >
                            <div className="d-flex align-items-center gap-3">
                                <span>{index + 1}.</span>
                                <i className="fa-solid fa-crown"></i>
                                <div className="d-flex flex-column">
                                    <span className="fw-bold fs-6">Nguyễn Thị Thảo</span>
                                    <small>11.123.123</small>
                                </div>
                            </div>
                            <div>
                                <img src={GoldReward} alt="gold-reward" className="reward-img object-fit-contain"></img>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export default Leaderboard;