import React from "react";
import { banner } from "../../Assets";
import "../../Scss/Main.scss";

const InspirationBanner: React.FunctionComponent = () => {
  return (
    <div
      style={{ backgroundImage: `url(${banner})` }}
      className="inspiration__main"
    >
      <div className="container">
        <h2 className="inspiration__title animate__animated  animate__bounceInDown">
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
