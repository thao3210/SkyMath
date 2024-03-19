import React from "react";
import './LookUpScore.css';
import StudentMale from '../../../assets/images/StudentMale.png';
import GraduationCap from '../../../assets/images/GraduationCap.png';
import Trophy from '../../../assets/images/Trophy.png';
import BgLookUp from '../../../assets/images/bg-lookup.jpeg';

const LookUpScore = () => {
    return (
        <section className="lookup-section rounded-4 py-5">
            <div className="d-flex flex-column align-items-center px-lg-5 px-3">
                <h3 className='fw-bold lookup-title text-uppercase'>Tra cứu điểm thi</h3>
                <div className="w-100  rounded-5 py-3 px-4 shadow-sm" style={{
                    backgroundImage: `url('${BgLookUp}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    <div className="d-flex flex-lg-row flex-column">
                        <div className="col">
                            <div className="d-flex align-items-center gap-4 mb-5">
                                <img src={GraduationCap} alt="graduation-cap" className="graduation-cap-img"></img>
                                <h4 className="text-uppercase fw-bold">Điểm cao nhất địa phương</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="student-main-container border border-3 border-dark rounded-circle d-flex align-items-center justify-content-center bg-white">
                                    <img src={StudentMale} alt="StudentMale" className="object-fit-cover student-main-img"></img>
                                </div>
                                <img src={Trophy} alt="trophy" className="trophy-main-img"></img>
                            </div>
                            <div className="text-center text-warning fw-bold mt-lg-4 mt-3 winner-text">
                                <p className="mb-1">Nguyễn Trần Minh Quân</p>
                                <p className="mb-1">-Lớp 1A3-</p>
                                <p className="mb-1">Trường Tiểu học Lê Văn Tám, Hà Nội</p>
                            </div>
                        </div>
                        <div className="col py-3 px-2">
                            <div className="d-flex align-items-center justify-content-end gap-3">
                                <select className="fw-bold px-2 py-1 rounded border-0">
                                    <option selected>Khối</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <select className="fw-bold px-2 py-1 rounded border-0">
                                    <option selected>Thành phố</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="d-flex gap-2 align-items-center justify-content-between border-bottom border-2 mt-2 mb-1">
                                    <div className="d-flex flex-column ">
                                        <div className="student-sm-container border border-3 border-dark rounded-circle d-flex align-items-center justify-content-center bg-white">
                                            <img src={StudentMale} alt="student-male-sm" className="student-sm-img"></img>
                                        </div>
                                        <span className="ontop-text fw-bold">Đào Phương Anh</span>
                                        <span className="ontop-text">Trường Tiểu học Đoàn Thị Điểm, Hà Nội</span>
                                    </div>
                                    <span className="display-6 fw-bold pe-1">{i + 2}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LookUpScore;