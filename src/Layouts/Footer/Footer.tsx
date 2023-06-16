import { NavLink } from "react-router-dom";
import { logoSaroj } from "../../Assets";
import "../../Scss/Main.scss";
import Button from "../../Components/Button/Button";

const Footer: React.FunctionComponent = () => {
  const onclickHandler = () => {
    console.log("CV");
  };
  return (
    <div className="footer__main main__1 ">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-12">
            <div className="footer__content">
              <img src={logoSaroj} alt="" />
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="footer__content">
              <h4>My CV</h4>
              <NavLink to="/my_cv">
                <Button
                  style="button__main"
                  handler={onclickHandler}
                  disabled={false}
                  name="See My Works"
                />{" "}
              </NavLink>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="footer__content">
              <h4>Contact</h4>
              <div className="container">
                <ul className="footer__ul">
                  <li>
                    <p>
                      <i className="fa-solid fa-envelope"></i> :{" "}
                      <span>codewithsaroj@gmail.com</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fa-solid fa-phone"></i> :{" "}
                      <span>+977 9808193670</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fa-sharp fa-solid fa-location-dot"></i> :{" "}
                      <span>Kathmandu 35, Koteshwor</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>
            © 2022. <span>Saroj Ghalan</span> . All Rights Reserved. Developed
            By : <span>Saroj G.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
