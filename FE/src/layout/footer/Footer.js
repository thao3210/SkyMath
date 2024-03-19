import React, { useState } from 'react';
import logoWhite from '../../assets/images/logo-white.png';
import TikTok from '../../assets/images/TikTok.png';
import Instagram from '../../assets/images/Instagram.png';
import YouTube from '../../assets/images/YouTube.png';
import Zalo from '../../assets/images/Zalo.png';
import Messenger from '../../assets/images/Messenger.png';
import Facebook from '../../assets/images/Facebook.png';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {

    const currentYear = new Date().getFullYear();
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    window.addEventListener('scroll', handleScroll);

    return (
        <section>
            <div className="bg-primary">
                <footer className="container">
                    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-5 pt-5 pb-4'>
                        <div className="col mb-3">
                            <Link to="/" >
                                <img src={logoWhite} className='logo-footer w-100' alt='sample' />
                            </Link>
                            <ul className="list-unstyled text-white flex-column ps-3">
                                <li className="mb-3"><Link to="/" className="fw-light nav-link"><i className="fa-solid fa-location-dot px-2 m-0"></i>Địa chỉ</Link></li>
                                <li className="mb-3"><Link to="/" className="fw-light nav-link"><i className="fa-solid fa-phone px-2 m-0"></i>Hotline</Link></li>
                                <li className="mb-3"><Link to="/" className="fw-light nav-link"><i className="fa-solid fa-envelope px-2 m-0"></i>Email</Link></li>
                            </ul>
                        </div>

                        <div className="col mb-3">
                            <h5 className='text-uppercase mb-3 fw-bold footer-title text-white'>về skymath</h5>
                            <ul className="text-white flex-column ps-3">
                                <li className="mb-3"><Link to="/" className="fw-light nav-link p-0">Trang chủ</Link></li>
                                <li className="mb-3"><Link to="/" className="fw-light nav-link p-0">Giới thiệu</Link></li>
                                <li className="mb-3"><Link to="/Course" className="fw-light nav-link p-0">Khóa học</Link></li>
                                <li className="mb-3"><Link to="/" className="fw-light nav-link p-0">Bảng thành tích</Link></li>
                            </ul>
                        </div>

                        <div className="col mb-3">
                            <h5 className='text-uppercase mb-3 fw-bold footer-title invisible'>về skymath</h5>
                            <ul className="text-white flex-column ps-3">
                                <li className="mb-3"><Link to="/DocumentStorage" className="fw-light nav-link p-0">Kho tài liệu</Link></li>
                                <li className="mb-3"><Link to="/" className="fw-light nav-link p-0">Tin tức</Link></li>
                                <li className="mb-3"><Link to="/" className="fw-light nav-link p-0">Tuyển sinh</Link></li>
                                <li className="mb-3"><Link to="/" className="fw-light nav-link p-0">Liên hệ</Link></li>
                            </ul>
                        </div>

                        <div className="col mb-3">
                            <h5 className='text-uppercase mb-3 fw-bold footer-title text-white'>Hỗ trợ</h5>
                            <ul className="text-white flex-column ps-3">
                                <li className="mb-3"><Link to="/" className="fw-light nav-link p-0">Quy định chung</Link></li>
                                <li className="mb-3"><Link to="/" className="fw-light nav-link p-0">Hướng dẫn</Link></li>
                                <li className="mb-3"><Link to="/" className="fw-light nav-link p-0">Hỏi - đáp</Link></li>
                                <li className="mb-3"><Link to="/" className="fw-light nav-link p-0">Sự kiện</Link></li>
                            </ul>
                        </div>

                        <div className="col mb-3">
                            <h5 className='text-uppercase mb-3 fw-bold footer-title text-white'>Liên kết</h5>
                            <div className='d-flex'>
                                <a href="{}" className=""><img src={Facebook} className='social-icon' alt='sample' /></a>
                                <a href="{}" className=""><img src={Zalo} className='social-icon' alt='sample' /></a>
                                <a href="{}" className=""><img src={Instagram} className='social-icon' alt='sample' /></a>
                                <a href="{}" className=""><img src={TikTok} className='social-icon' alt='sample' /></a>
                                <a href="{}" className=""><img src={YouTube} className='social-icon' alt='sample' /></a>
                            </div>
                            <div className='my-1'>
                                <iframe title='map' className='' style={{ width: '100%', height: '100%' }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.792898501772!2d105.83923687499977!3d21.00093728873417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac70966e1b25%3A0xee0a3fc2df447167!2zMTkgTmcuIDEyMSBQLiBMw6ogVGhhbmggTmdo4buLLCDEkOG7k25nIFTDom0sIEhhaSBCw6AgVHLGsG5nLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1701194684659!5m2!1sen!2s"></iframe>
                            </div>
                        </div>

                    </div>

                </footer>

            </div>
            <div className="text-center text-white bg-dark text-white py-2 small">&copy; Copyright {currentYear} for SKYMATH, All right reversed. Designed by VISSSOFT</div>
            {/* {showButton && (
                <div className="scroll-up-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                   <img src={Messenger} className='' alt='sample' />
                </div>
            )} */}
        </section>
    );
};

export default Footer;
