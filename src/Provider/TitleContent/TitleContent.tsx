import React from "react";
import banner from "../../Assets/banner.png";
import './TitleContent.scss';

const TitleContent = ({ heading }: { heading: string }) => {
  return (
    <div
      style={{ backgroundImage: `url(${banner})` }}
      className="inspiration-main"
    >
      <div className="container">
        <h2 className="inspiration-title animate__animated  animate__bounceInDown">
          {heading}
        </h2>
      </div>
    </div>
  );
};

export default TitleContent;
