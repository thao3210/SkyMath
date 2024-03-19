import React, { useEffect, useState } from "react";
import PlanServices from "../../../services/PlanService";

function CourseRegisterForm() {
  const [items, setPlans] = useState([]);

  const getPlanID = async () => {
    try {
      const response = await PlanServices.getListPlan();
      if (response.status === 200) {
        // Lọc các kế hoạch có id từ 5 trở đi
        const filteredPlans = response.data.filter(plan => plan.id >= 5);
        setPlans(filteredPlans);
      } else {
        console.error("Error response status", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPlanID();
  }, []);
  return (
    <div className="">
      <div
        className="modal modal-xl fade"
        id="courseRegisterForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Chọn khối lớp
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                {Array.isArray(items) &&
                  items.map((data, index) => (
                    <div className=" col-lg-4 px-3" key={data.id}>
                      <div className="bg-secondary-subtle rounded-2">
                        <div className="">
                          <h4 className="pt-3">{data.name}</h4>
                          <h4 className=" bg-light-subtle p-2 ">
                            {data.price}VND<span>/{data.days}ngày</span>
                          </h4>
                          <ul>
                            <li>{data.description}</li>
                          </ul>
                          <button
                            type="button"
                            className="btn btn-primary w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#courseCheckoutModal"
                          >
                            Chọn
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseRegisterForm;
