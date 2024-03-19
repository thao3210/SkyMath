import React from "react";
import "./Button.css";

function ButtonEvent({ className, title, bgrcolor, color }) {
  return (
    <div>
      <button className={`btn ${className}`} style={{ backgroundColor: bgrcolor, color: color }}>
        {title}
      </button>
    </div>
  );
}

export default ButtonEvent;
