import React from 'react';
import './GoldenBoard.css';
import Trophy from '../../../assets/images/Trophy-real.png';
import GoldenBoardStudent from '../../../assets/images/golden-board-student.png';

const GoldenBoard = () => {
    return (
        <section className='golden-board-section py-5'>
            <div className=''>
                <div className='d-flex align-items-center justify-content-center'>
                    <img src={Trophy} alt='trophy' className='trophy-real-img'></img>
                    <h3 className='fw-bold text-uppercase bg-warning rounded-5 py-2 px-3 text-center mb-0'>Bảng vàng thành tích</h3>
                    <img src={Trophy} alt='trophy' className='trophy-real-img'></img>
                </div>
                <div className='d-flex align-items-center justify-content-center overflow-hidden'>
                    <div className='pt-5 pb-3 d-inline-flex flex-lg-row flex-md-row flex-sm-column flex-column align-items-center'>
                        <div className='bg-white winner-container py-lg-3 py-md-2 rounded-5 shadow'>
                            <div className='d-flex gap-2 align-items-center fs-5'>
                                <i className='fa-solid fa-star text-warning '></i>
                                <span className=' fw-bold'>Vũ Lan Anh</span>
                            </div>
                            <div className=' d-flex align-items-center justify-content-center text-center'>
                                <img src={GoldenBoardStudent} alt="Vũ Lan Anh" className='w-100 object-fit-cover pt-3'></img>
                            </div>
                        </div>
                        <div className='other-students-container d-inline-flex'>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className='bg-white student-img-container py-lg-3 py-md-2 shadow'>
                                    <span className='fw-bold'>Phương Linh</span>
                                    <div className=' d-flex align-items-center justify-content-center text-center'>
                                        <img src={GoldenBoardStudent} alt="Vũ Lan Anh" className='w-100 object-fit-cover pt-2'></img>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GoldenBoard;