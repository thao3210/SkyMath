import React from "react";
import Steps from "./Steps/steps";
import CourseRegister from "./Course/courseRegister";
import FormRegisterCourse from "./Form/formRegister";

function AdmissionsComponent() {
  return (
    <div className="w-100 z-3">
      <FormRegisterCourse />
      <CourseRegister />
      <Steps/>
    </div>
  );
}

export default AdmissionsComponent;
