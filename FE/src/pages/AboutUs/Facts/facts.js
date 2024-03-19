import React from "react";
import "./facts.css";

function Facts() {
  const iconSize = "fa-3x";
  const wowDelay = ["0.1s", "0.3s", "0.5s", "0.7s"];

  const factItems = [
    {
      iconClass: "fa-brands fa-medapps",
      count: "92%",
      text: "Hơn 92% học sinh tiến bộ rõ rệt và yêu thích, tự giác học tập",
      colorClass: "text-warning",
    },
    {
      iconClass: "fa fa-users-cog",
      count: "96%",
      text: "Gợi ý lộ trình học cá nhân hoá",
      colorClass: "text-success",
    },
    {
      iconClass: "fa-solid fa-book",
      count: "1,000++",
      text: "1,000++ nội dung kiến thức theo SGK và nâng cao",
      colorClass: "text-info",
    },
    {
      iconClass: "fa-brands fa-youtube",
      count: "100++",
      text: "100++ video bài giảng hoạt hình từ tình huống thực tế",
      colorClass: "text-danger",
    },
  ];

  return (
    <div className="mt-0 mb-3 w-100 bg-light" data-wow-delay="0.1s">
      <div className="container py-4">
        <div className="row g-4">
          {factItems.map((item, index) => (
            <div
              key={index}
              className={`col-md-6 col-lg-3 text-center wow fadeIn`}
              data-wow-delay={wowDelay[index]}
            >
              <i className={` ${item.iconClass} mt-0 ${iconSize} ${item.colorClass} mb-3`}></i>
              <h1 className="mb-2" data-toggle="counter-up">
                {item.count}
              </h1>
              <p className="mb-0">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Facts;
