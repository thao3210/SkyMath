import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./InforTeacher.css";
import ButtonEvent from "../../../components/Button/Button";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import BgCloud from '../../../assets/images/skybgr.png';

import TeacherServices from "../../../services/TeacherService";

const InforTeacher = () => {
  const [cards, setCards] = useState([]);
  const fetchTeachers = async () => {
    try {
      const response = await TeacherServices.getListTeacher();
      if (response.status === 200) {
        setCards(response.data);
      } else {
        console.error("Error response status", response.status);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);
  return (
    <section style={{
      backgroundImage: `url(${BgCloud})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'bottom',
    }}
      className="">
      <div className="slide-teacher container py-5">
        <div className="text-center pb-3">
          <h3 className='fw-bold intro-title text-uppercase'>Đội ngũ giáo viên</h3>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation, Pagination]}
          className="swiperTeacher"
          breakpoints={{
            1200: {
              slidesPerView: 4,
            },
            992: {
              slidesPerView: 3,
            },
            450: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {Array.isArray(cards) &&
            cards.map((data, index) => (
              <SwiperSlide key={data.id}>
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={data.avatar}
                    alt={`teacher-${data.name}-${index}`}
                    className="object-fit-cover rounded-circle teacher-home-img"
                  />
                  <h5 className="fw-bold teacher-name mt-4">{data.name}</h5>
                  <p className="fs-6 mb-1">{data.workPlace}</p>
                  <p className="text-limit-descriptions fs-6">
                    {data.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          {Array.isArray(cards) &&
            cards.map((data, index) => (
              <SwiperSlide key={data.id}>
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={data.avatar}
                    alt={`teacher-${data.name}-${index}`}
                    className="object-fit-cover rounded-circle teacher-home-img"
                  />
                  <h5 className="fw-bold teacher-name mt-4">{data.name}</h5>
                  <p className="fs-6 mb-1">{data.workPlace}</p>
                  <p className="text-limit-descriptions fs-6">
                    {data.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>

  );
};
export default InforTeacher;
