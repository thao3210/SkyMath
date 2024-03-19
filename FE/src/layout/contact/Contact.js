import React from "react";
import './Contact.css';
import Zalo from '../../assets/images/icons8-zalo-480.png';
import Phone from '../../assets/images/phone-icon.png';
import FacebookMsg from "../../components/FacebookMsg/FacebookMsg";

const Contact = () => {
    return (
        <section>
            <div className="d-flex flex-column align-items-end gap-1 position-fixed z-3 contact-section">
                <FacebookMsg />

                <button className="btn-contact p-0 border-0">
                    <img src={Zalo} alt="zalo" className="w-100"></img>
                </button>
                <a href="tel:0347225127" className="btn-contact p-0 border-0 fa-shake">
                    <img src={Phone} alt="phone" className="w-100"></img>
                </a>
            </div>
        </section>
    );
}

export default Contact;
