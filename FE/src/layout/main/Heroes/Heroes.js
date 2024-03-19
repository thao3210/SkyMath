import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import HomepageServices from '../../../services/HomepageService';
import CourseServices from '../../../services/CourseService';
import 'swiper/css';
import 'swiper/css/autoplay';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Heros.css';
import { Link } from 'react-router-dom';
import IntroImg from '../../../../src/assets/images/intro.png'
import CloudBg from '../../../../src/assets/images/skybgr.png';

const Heroes = () => {
    const [heroesData, setHeroesData] = useState([]);
    const [coursesData, setCoursesData] = useState([]);
    const [introData, setIntroData] = useState([]);

    const HeroData = async () => {
        try {
            const response = await HomepageServices.getAllSlide();
            //   console.log("Heroes data response:", response.data);
            if (response.status === 200) {
                setHeroesData(response.data);
            } else {
                console.error("Error Hero response status", response.status);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const CourseData = async () => {
        try {
            const response = await CourseServices.getCourseProminent();
            if (response.status === 200) {
                setCoursesData(response.data);
            } else {
                console.error("Error Course response status", response.status);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const IntroData = async () => {
        try {
            const response = await HomepageServices.getAllIntro();
            if (response.status === 200) {
                setIntroData(response.data);
            } else {
                console.error("Error Intro response status", response.status);
            }
        } catch (err) {
            console.error(err.message);
        }
    };


    useEffect(() => {
        HeroData();
        CourseData();
        IntroData();
    }, []);


    return (
        <div className=''>
            <div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={heroesData.length > 1}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    className='swiperHeroes'
                >
                    <div className='px-5'>
                        {heroesData.map((hero) => (
                            <SwiperSlide
                                key={hero.id}
                                style={{
                                    backgroundImage: `url(${hero.imageLink})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'left',
                                }}
                                className='heroes-img d-flex justify-content-end pb-4'
                            >
                                <div className='text-uppercase col-lg-7 col-md-6 mx-4 float-end d-grid'>
                                    <span className='heroes-text fw-bolder display-3'>{hero.slogan}</span>
                                    <div className='d-flex align-items-center justify-content-center gap-4 mt-4'>
                                        <Link to='/OnlineExam' className='text-uppercase btn px-lg-5 btn-primary border border-2 border-white btn-heroes fw-bold'>
                                            Vào thi
                                        </Link>
                                        <Link to="/Schedule" className='text-uppercase btn px-lg-5 btn-primary border border-2 border-white btn-heroes fw-bold'>
                                            Lịch thi
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
            </div>
            <div className='container courses-section'>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    loop={coursesData.length > 1}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="swiperCourse pb-5"
                    breakpoints={{
                        1200: {
                            slidesPerView: 4,
                        },
                        992: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        450: {
                            slidesPerView: 2,
                        },
                        0: {
                            slidesPerView: 2,
                        },
                    }}
                >
                    <div className='card-group'>
                        {coursesData.map((course) => (
                            <SwiperSlide key={course.id} >
                                <div
                                    className="d-flex align-items-center justify-content-center card card-course-hero rounded-5 overflow-hidden p-lg-2 p-md-2 p-sm-2 p-1"
                                    style={{
                                        width: '18rem',
                                        backgroundColor: `${course.backGroundColor}`,
                                        borderBottom: `solid 8px rgba(0,0,0, 0.1)`,
                                        borderRight: '0px',
                                        borderLeft: '0px',
                                        borderTop: '0px'
                                    }}
                                >
                                    <img src={`${course.imageLink}`} alt={course.name} className="object-fit-cover rounded-5 course-hero-img" />
                                    <div className="d-flex flex-column align-items-center justify-content-center p-lg-3">
                                        <p className="text-center text-white py-2 fw-bold course-hero-name m-0">{course.name}</p>
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <Link to={`/Course/${course.id}`} className="btn btn-light border-dark border-2 rounded-5 px-lg-4 px-md-3 px-sm-3 py-lg-2 py-1 mt-lg-2 mt-md-2 mt-sm-2 mt-2 mb-2 w-75 fw-bold btn-course-more">Xem thêm</Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
            </div>

            <div style={{
                backgroundImage: `url(${CloudBg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
            }}>
                {introData.map((intro) => (
                    <div className='container mb-5 p-4' key={intro.id}>
                        <div className='d-lg-inline-flex align-items-center justify-content-center'>
                            <div className='col px-4 py-2'>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <h3 className='fw-bold intro-title text-uppercase'>{intro.title}</h3>
                                </div>
                                <p className='intro-text'>{intro.content}</p>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <Link to="/" className="btn btn-primary fw-bold px-4 btn-intro">
                                        <span>Tìm hiểu thêm </span>
                                        <i className="fa-solid fa-arrow-right p-0 m-0"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className='col px-2 py-2'>
                                <img src={IntroImg} alt='intro-img' className='img-fluid' />
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Heroes;