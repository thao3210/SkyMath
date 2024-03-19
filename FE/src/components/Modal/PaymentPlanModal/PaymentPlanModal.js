import React, { useEffect, useState } from "react";
import "./PaymentPlanModal.css";
import { Link } from "react-router-dom";
import PlanServices from "../../../services/PlanService";

function PaymentPlanModal() {
    const [shortTermPlans, setShortTermPlans] = useState([]);
    const [shortTermPlansCourse, setShortTermPlansCourse] = useState([]);
    const [longTermPlans, setLongTermPlans] = useState([]);

    const getPlan = async () => {
        try {
            const response = await PlanServices.getListPlan();
            if (response.status === 200) {
                const allPlans = response.data;

                // Separate short term and long term plans
                const shortTermPlans = allPlans.filter(
                    (plan) =>
                        plan.planCategoryName === "Ngắn hạn" &&
                        plan.planTypeName === "Tùy chọn"
                );
                const shortTermPlansCourse = allPlans.filter(
                    (plan) =>
                        plan.planCategoryName === "Ngắn hạn" && plan.planTypeName === "Khối"
                );
                const longTermPlans = allPlans.filter(
                    (plan) =>
                        plan.planCategoryName === "Dài hạn" &&
                        plan.planTypeName === "Tùy chọn"
                );

                setShortTermPlans(shortTermPlans);
                setShortTermPlansCourse(shortTermPlansCourse);
                setLongTermPlans(longTermPlans);
            } else {
                console.error("Error response status", response.status);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getPlan();
    }, []);

    return (
        <div className="modal fade" id="paymentPlanModal" tabIndex="-1" aria-labelledby="paymentPlanModalLabel" aria-hidden="true" >
            <div className="modal-dialog modal-dialog-centered  modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="paymentPlanModalLabel">Chọn khóa học tại SkyMath</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-3 col-sm-6 tab-course-register ms-auto">
                                <ul className="nav nav-pills mb-2" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link active"
                                            id="pills-month-modal-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-month-modal"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-month-modal"
                                            aria-selected="true"
                                        >
                                            Ngắn hạn
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-year-modal-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-year-modal"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-year-modal"
                                            aria-selected="false"
                                        >
                                            Dài hạn
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="tab-content" id="pills-tabContent">
                                <div
                                    className="tab-pane fade show active plan-course-register"
                                    id="pills-month-modal"
                                    role="tabpanel"
                                    aria-labelledby="pills-month-modal-tab"
                                    tabIndex="0"
                                >
                                    <div className="row g-3">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            {Array.isArray(shortTermPlans) &&
                                                shortTermPlans.map((data, index) => (
                                                    <div key={index} className="pricing__item">
                                                        <h4>{data.name}</h4>
                                                        <h3>
                                                            {data.price}VND<span>/{data.days} ngày</span>
                                                        </h3>
                                                        <ul>
                                                            <li>{data.description}</li>
                                                        </ul>
                                                        {data.planTypeName !== "Khối" && (
                                                            <>
                                                                <Link
                                                                    type="button"
                                                                    className="primary-btn"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#courseCheckoutModal"
                                                                >
                                                                    Đăng kí
                                                                </Link>
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="pricing__item">
                                                <h4>Tai khoan theo Khoi</h4>
                                                <h3>
                                                    5000VND<span>/5 ngày</span>
                                                </h3>
                                                <ul>
                                                    <li>su dung toan bo trong khoi</li>
                                                </ul>

                                                <Link
                                                    type="button"
                                                    className="primary-btn"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#courseRegisterForm"
                                                >
                                                    Đăng kí
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="tab-pane fade plan-course-register"
                                    id="pills-year-modal"
                                    role="tabpanel"
                                    aria-labelledby="pills-year-modal-tab"
                                    tabIndex="0"
                                >
                                    <div className="row align-content-center g-3">
                                        {Array.isArray(longTermPlans) &&
                                            longTermPlans.map((data, index) => (
                                                <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                                                    <div className="pricing__item">
                                                        <h4>{data.name}</h4>
                                                        <h3>
                                                            {data.price}VND <span>/{data.days} ngày</span>
                                                        </h3>
                                                        <ul>
                                                            <li>{data.description}</li>
                                                        </ul>
                                                        <Link
                                                            type="button"
                                                            className="primary-btn"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#courseCheckoutModal"
                                                        >
                                                            Đăng kí
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPlanModal;
