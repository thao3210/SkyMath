import React from "react";
import "./choice.css";
import TestImg from "../../../assets/images/about.png";

function Choice() {
  const tabs = [
    { id: "pills-home", label: "Phụ huynh", icon: "fa-brands fa-searchengin" },
    { id: "pills-profile", label: "Học sinh", icon: "fa-medapps" },
    { id: "pills-contact", label: "Giáo viên", icon: "fa-business-time" },
  ];

  const tabContents = [
    {
      id: "pills-home",
      items: [
        { icon: "fa-brands fa-searchengin", title: "Báo cáo trực quan", content: "Nhận báo cáo chi tiết hàng ngày về điểm mạnh, điểm yếu và kết quả học tập của con." },
        { icon: "fa-bell-concierge", title: "Hỗ trợ kèm con học", content: "Sử dụng học liệu, lộ trình gợi ý và các phân tích của VioEdu để hỗ trợ con tự học hoặc có kế hoạch bồi dưỡng phù hợp." },
        { icon: "fa-business-time", title: "Tiết kiệm thời gian", content: "Tiết kiệm thời gian khi con tự giác, chủ động và tiến bộ trong học tập." },
        { icon: "fa-money-bill-1", title: "Tiết kiệm tài chính", content: "Tiết kiệm chi phí, giảm áp lực học thêm khi con tự học hiệu quả." },
      ],
    },
    {
      id: "pills-profile",
      items: [
        { icon: "fa-brands fa-medapps", title: "Linh hoạt, chủ động", content: "Học mọi lúc, mọi nơi trên các thiết bị điện tử có kết nối Internet." },
        { icon: "fa-gift", title: "Cạnh tranh, thu hút", content: "Quà tặng hấp dẫn và nhiều cuộc thi khuyến khích, cổ vũ tinh thần ham học." },
        { icon: "fa-book-tanakh", title: "Lộ trình học cá nhân hóa", content: "Phát hiện điểm mạnh, điểm yếu, đề xuất kiến thức và kỹ năng phù hợp với năng lực học sinh. Rút ngắn thời gian học tập từ 30% - 50%." },
        { icon: "fa-brain", title: "Tăng hứng thú học", content: "Video bài giảng hoạt hình cùng hệ thống câu hỏi luyện tập phong phú và giàu tính tương tác giúp học sinh vững kiến thức, hào hứng học tập." },
      ],
    },
    {
      id: "pills-contact",
      items: [], // Add content for the third tab if needed
    },
  ];

  return (
    <div className="w-100">
      <div className="container">
        <div className="">
          <h2 className="text-center fw-bolder">Tại sao nên chọn SkyMath?</h2>
        </div>
        <div className="d-flex justify-content-center">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            {tabs.map((tab) => (
              <li className="nav-item" key={tab.id} role="presentation">
                <button
                  className={`nav-link ${tab.id === "pills-home" ? "active" : ""} tab-link-about`}
                  id={`${tab.id}-tab`}
                  data-bs-toggle="pill"
                  data-bs-target={`#${tab.id}`}
                  type="button"
                  role="tab"
                  aria-controls={tab.id}
                  aria-selected={tab.id === "pills-home"}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="row d-flex w-100">
          <div className="col-lg-6">
            <div className="tab-content" id="pills-tabContent">
              {tabContents.map((tabContent) => (
                <div
                  className={`tab-pane fade ${tabContent.id === "pills-home" ? "show active" : ""} tab-about-all`}
                  id={tabContent.id}
                  role="tabpanel"
                  aria-labelledby={`${tabContent.id}-tab`}
                  tabIndex="0"
                  key={tabContent.id}
                >
                  <div className="row g-2">
                    {tabContent.items.map((item, index) => (
                      <div className="col-6" key={index}>
                        <span className={`fa ${item.icon} my-0 icon-about`}></span>
                        <h4 className="fw-bolder">{item.title}</h4>
                        <p>{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <img src={TestImg} alt="placeholder" className="d-lg-block d-md-none d-sm-none d-none mt-4 img-about" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Choice;
