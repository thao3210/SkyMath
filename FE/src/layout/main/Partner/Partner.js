import React from "react";
import Logo1 from '../../../assets/images/Google_logo_2015_svg.png';
import Logo2 from '../../../assets/images/logo-bao.jpg';
import Logo3 from '../../../assets/images/bannertcgd.png';
import Logo4 from '../../../assets/images/Logo-BGDDT2.png';
import Logo5 from '../../../assets/images/1-5816.jpg';

import './Partner.css';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import 'swiper/css/navigation';

const Partner = () => {
    return (
        <section className="container py-5">
            <div className="text-center pb-3">
                <h3 className='fw-bold intro-title text-uppercase'>Đối tác của chúng tôi</h3>
            </div>

            <div className='d-flex flex-wrap justify-content-center gap-4'>
                <img src={Logo1} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo2} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo3} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo4} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo5} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo1} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo2} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo3} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo4} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo5} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo1} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo2} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo3} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo4} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo5} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo1} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo2} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo3} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo4} alt="logo-1" className="object-fit-contain partner-img"></img>
                <img src={Logo5} alt="logo-1" className="object-fit-contain partner-img"></img>
            </div>


        </section>
    );
}

export default Partner;