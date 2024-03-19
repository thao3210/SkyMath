import React from "react";
import Avatar from '../../../assets/images/golden-board-student.png';
import GoldenReward from '../../../assets/images/gold-reward.png';
import OrangeReward from '../../../assets/images/orange-reward.png';
import BlueReward from '../../../assets/images/blue-reward.png';
import Reward1 from '../../../assets/images/reward-1.png';
import Reward2 from '../../../assets/images/reward-2.png';
import Reward3 from '../../../assets/images/reward-3.png';
import Reward4 from '../../../assets/images/reward-4.png';
import Reward5 from '../../../assets/images/reward-5.png';
import Reward6 from '../../../assets/images/reward-6.png';
import Reward7 from '../../../assets/images/reward-7.png';
import './Reward.css';
import { Link } from "react-router-dom";

const Reward = () => {
    const rewardImages = [Reward1, Reward2, Reward3, Reward4, Reward5, Reward6, Reward7, Reward1, Reward2, Reward3, Reward4, Reward5, Reward6, Reward7];
    return (
        <section className="reward-section">
            <Link to={`/OnlineExam`} className="btn btn-warning text-white fw-bold me-4 mt-4 float-end"><i className="fa-solid fa-x"></i></Link>
            <h1 className="text-center text-white text-uppercase fw-bold py-5 display-5">Phần thưởng</h1>
            <div className="d-flex flex-lg-row flex-column justify-content-center align-items-start gap-5 px-lg-5 px-3 reward-main pb-5">
                <div className="reward-user-section col-lg-4 d-flex flex-column align-items-center bg-primary-subtle rounded-4 px-4">
                    <div className="text-center board-reward-user text-uppercase">Thành tích</div>
                    <div className=" bg-primary rounded-4 py-3 px-3 my-3 w-100 ">
                        <div className="d-flex align-items-center gap-3 pb-3 border-bottom">
                            <img src={Avatar} alt="avatar" className="object-fit-cover rounded-circle avatar-reward"></img>
                            <div className="text-white">
                                <span className="username-reward">Username</span>
                                <div>
                                    <span>0</span>
                                    <img src={GoldenReward} alt="golden-reward" className="me-1 reward-img-user"></img>
                                    <span>0</span>
                                    <img src={OrangeReward} alt="orange-reward" className="me-1 reward-img-user"></img>
                                    <span>0</span>
                                    <img src={BlueReward} alt="blue-reward" className="me-1 reward-img-user"></img>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pt-3 text-white">
                            <h3 className="fw-bold">Vật phẩm của bạn</h3>
                        </div>
                    </div>
                </div>
                <div className="col store-section">
                    <div className="reward-store-roof"></div>
                    <div className="store-container d-flex flex-wrap align-items-center justify-content-center">
                        {rewardImages.map((image, index) => (
                            <div key={index} className="reward-item-slot d-flex flex-column align-items-center justify-content-end">
                                <img src={image} alt="reward-1" className="reward-item-img"></img>
                                <button className="d-flex align-items-center justify-content-center bg-none border-0 text-white">
                                    <span>1000</span>
                                    <img src={GoldenReward} alt="golden-reward" className="reward-img-store"></img>
                                </button>
                            </div>
                        ))}
                        <div className="d-flex w-100 gap-5 align-items-center justify-content-center pt-3 pb-2">
                            <button className="btn btn-danger"><i className="fa-solid fa-angle-left"></i></button>
                            <button className="btn btn-danger"><i className="fa-solid fa-angle-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reward;