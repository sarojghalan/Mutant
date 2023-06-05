import React from "react";
import banner from "../../../Assets/banner.png";
import './InspirationBanner.scss';

const InspirationBanner: React.FC = () => {
  return (
    <div
      style={{ backgroundImage: `url(${banner})` }}
      className="inspiration-main"
    >
      <div className="container">
        <h2 className="inspiration-title animate__animated  animate__bounceInDown">
          " Be The Change{" "}
          <span>
            <i className="fa-solid fa-cloud-sun-rain"></i>
          </span>{" "}
          "
        </h2>
      </div>
    </div>
  );
};

export default InspirationBanner;
