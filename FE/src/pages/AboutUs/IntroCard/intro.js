import React, { useEffect, useState } from "react";


import TestImg from "../../../assets/images/intro.png";
import CloudBg from "../../../assets/images/skybgr.png";
import HomepageServices from "../../../services/HomepageService";


function Intro() {
  const [introData, setIntroData] = useState([]);
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
    IntroData();
  }, []);
  return (
    <section class=" w-100">
      <div
        style={{
          backgroundImage: `url(${CloudBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        {introData.map((intro) => (
          <div className="container p-4" key={intro.id}>
            <div className="d-lg-inline-flex align-items-center justify-content-center">
              <div className="col px-4 py-2">
                <div className="d-flex align-items-center justify-content-center">
                  <h3 className="fw-bold intro-title text-uppercase">
                    {intro.title}
                  </h3>
                </div>
                <p className="intro-text">{intro.content}</p>
              </div>
              <div className="col px-2 py-2">
                <img src={TestImg} alt="intro-img" className="d-lg-block d-md-none d-sm-none d-none img-fluid" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Intro;
