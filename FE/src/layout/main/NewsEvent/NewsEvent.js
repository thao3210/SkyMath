import React, { useEffect, useState } from "react";
// import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./NewsEven.css";
import CardNews from "../../../components/Card/CardNews";
import ButtonEvent from "../../../components/Button/Button";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import NewsEventService from "../../../services/NewsEventService";

const SlideCardNewsCard = () => {
  const [cards, setCards] = useState([]);
  const getNewsEvent = async () => {
    try {
      const response = await NewsEventService.getListNewsAndEvent();
      // console.log("News data response:", response.data);
      if (response.status === 200) {
        setCards(response.data);
      } else {
        console.error("Error response status", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getNewsEvent();
  }, []);
  return (
    <div className="slide-news">
      <div className="text-center">
        <h3 className='fw-bold intro-title text-uppercase'>Tin tức - Sự kiện</h3>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={true}
        // pagination={{
        //     clickable: true,
        //   }}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
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
          100: {
            slidesPerView: 1,
          },
        }}
      >
        {Array.isArray(cards) &&
          cards.map((data, index) => (
            <SwiperSlide key={data.id}>
              <div>
                <Link to="/NewsAndEventDetail">
                  <CardNews
                    key={index}
                    className="card-slide"
                    imageSrc={data.imageLink}
                    title={data.title}
                    description={data.content}
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        {Array.isArray(cards) &&
          cards.map((data, index) => (
            <SwiperSlide key={data.id}>
              <Link to="/NewsAndEventDetail">
                <CardNews
                  key={index}
                  className="card-slide"
                  imageSrc={data.imageLink}
                  title={data.title}
                  description={data.content}
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="text-center">
        <Link to="/NewsAndEvent">
          <ButtonEvent
            className="button-event"
            title="Xem thêm"
            bgrcolor="#2884da"
            color="#FFFFFF"
          />
        </Link>
      </div>
    </div>
  );
};
export default SlideCardNewsCard;
