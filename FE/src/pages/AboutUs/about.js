import React from "react";
import Intro from "./IntroCard/intro";
import Facts from "./Facts/facts";
import Choice from "./Choice/choice";

function AboutUs() {
  return (
    <div>
      <Intro />
      <Facts/>
      <Choice/>     
    </div>
  );
}

export default AboutUs;
