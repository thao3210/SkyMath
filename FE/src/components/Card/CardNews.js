
import React from "react";
import "./Card.css";

function Card({ className, imageSrc, title, description }) {
  return (
    <div className={`card card-c ${className}`}>
      <img className="card-image-c" src={imageSrc} alt={title} />
      <div className="card-body-c ">
        <h5 className="card-title-c">{title}</h5>
        <p className="card-text-c">{description}</p>
      </div>
    </div>
  );
}

export default Card;
