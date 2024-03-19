import React, { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Link } from "react-router-dom";
import "./courseRegister.css";

import PlanServices from "../../../services/PlanService";

function CourseRegister() {
  // const [items, setPlans] = useState([]);
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
    <section className="pricing-section spad">
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <div className="section-title-course normal-title">
              <h3 className="">Chọn khóa học tại SkyMath</h3>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 tab-course-register ms-auto">
            <ul className="nav nav-pills mb-2" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-month-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-month"
                  type="button"
                  role="tab"
                  aria-controls="pills-month"
                  aria-selected="true"
                >
                  Ngắn hạn
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-year-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-year"
                  type="button"
                  role="tab"
                  aria-controls="pills-year"
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
              id="pills-month"
              role="tabpanel"
              aria-labelledby="pills-month-tab"
              tabIndex="0"
            >
              <div className="row g-2">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  {Array.isArray(shortTermPlans) &&
                    shortTermPlans.map((data, index) => (
                      <div className="pricing__item">
                        <h4>{data.name}</h4>
                        <h3>
                          {data.price}VND<span>/{data.days} ngày</span>
                        </h3>
                        <ul>
                          <li>{data.description}</li>
                        </ul>
                        {data.planTypeName !== "Khối" && (
                          <Link
                            type="button"
                            className="primary-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#courseCheckoutModal"
                          >
                            Đăng kí
                          </Link>
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
              id="pills-year"
              role="tabpanel"
              aria-labelledby="pills-year-tab"
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
    </section>
  );
}

export default CourseRegister;
