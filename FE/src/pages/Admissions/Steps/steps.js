import React from "react";
import "./steps.css";

function Steps() {
  return (
    <div>
      <div className="container-fluid bodyItem">
        <div className="py-2">
          <div className="text-admission-steps">
            <h2 className="text-steps">
              Tham gia SkyMath dễ dàng với 4 bước
            </h2>
          </div>
          <div className="row g-4 mx-5 all-steps">
            <div className="col-xl-3 item-steps">
              <h3 className="py-3 text-center"><i className="fa-solid fa-magnifying-glass mx-0 my-0"></i>Chọn khóa học</h3>
            </div>
            <div className="col-xl-3 item-steps">
              <h3 className="py-3 text-center"><i className="fa-solid fa-book-open mx-0 my-0"></i> Học thử miễn phí</h3>
            </div>
            <div className="col-xl-3 item-steps">
              <h3 className="py-3 text-center"><i className="fa-solid fa-money-check mx-0 my-0"></i>Nộp học phí</h3>
            </div>
            <div className="col-xl-3 item-steps">
              <h3 className="py-3 text-center"><i className="fa-solid fa-chalkboard-user mx-0 my-0"></i>Vào học</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Steps;
