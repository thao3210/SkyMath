import React, { useEffect, useRef, useState } from 'react';
import './MainOnlineExam.css';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/LogoSkyMath.png';
import TableCompetitionRoom from './TableCompetitionRoom/TableCompetitionRoom';
import Leaderboard from './Leaderboard/Leaderboard';

const MainOnlineExam = () => {
    return (
        <>
            <header className='d-flex align-items-center justify-content-between px-lg-5 px-2 online-test-header shadow-sm position-sticky top-0'>
                <div>
                    <button className="btn border-0 text-white dropdown-toggle d-lg-none d-inline-flex" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className='fa-solid fa-bars'></i>
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link to={`/OnlineExam/Leaderboard`} className="dropdown-item">Bảng xếp hạng</Link></li>
                        <li><Link to={`/Schedule`} className="dropdown-item">Lịch thi</Link></li>
                        <li><Link to={`/OnlineExam/Reward`} className="dropdown-item">reward</Link></li>
                    </ul>
                    <Link to={'/'} ><img src={Logo} alt='logo' className='logo-online-exam'></img></Link>
                    <div className='d-lg-inline-flex align-items-center d-none'>
                        <Link to={`/OnlineExam/Leaderboard`} className='btn d-inline-flex align-items-center gap-2 text-white fw-bold border-0'>
                            <i className='fa-solid fa-ranking-star'></i>
                            <span>Bảng xếp hạng</span>
                        </Link>
                        {/* <Link to={`/OnlineExam/Reward`} type='button' className='btn d-inline-flex align-items-center gap-2 text-white fw-bold border-0' >
                            <i className='fa-solid fa-gift'></i>
                            <span>Phần thưởng</span>
                        </Link> */}
                        <Link to={`/Schedule`} className='btn d-inline-flex align-items-center gap-2 text-white fw-bold border-0'>
                            <i className='fa-solid fa-calendar-days'></i>
                            <span>Lịch thi</span>
                        </Link>
                    </div>
                </div>
                <Link to={'/Login'} className='btn btn-dark px-3 rounded-pill '>Đăng nhập</Link>
            </header>

            <section className=' py-3 online-test-section' >

                <div className='pt-4 d-flex align-items-center gap-5 online-exam-container'>
                    <div className='col-lg-8 col'>
                        <TableCompetitionRoom />
                    </div>
                    <div className='col mt-5'>
                        <Leaderboard />
                    </div>
                </div>

                <div className='pt-4'>

                </div>
            </section>
        </>
    );
}

export default MainOnlineExam;