import React, { useEffect, useState, useRef } from "react";
import firebaseDb from "../../firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import AboutMe from "../../Components/HomeComponents/AboutMe/AboutMe";
import "slick-carousel/slick/slick.css";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "./AboutPage.scss";
// interface MySkillProps{

// }

const AboutPage: React.FC = () => {
  const slider = useRef<Slider | null>(null);
  const [mySkill, setMySkill] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [id, setID] = useState<number>();
  const [modalTopic, setModelTopic] = useState<string>("");
  const [modalDescription, setModelDescription] = useState<string>("");
  const [modalShow, setModalShow] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const q = query(collection(firebaseDb, "myskill"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const skill: any[] = [];
      querySnapshot.forEach((doc) => {
        skill.push(doc.data());
      });
      setMySkill(skill);
    });
    setLoading(false);
  }, []);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 920,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const skillHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    description: string,
    skill: string,
    keys: number
  ) => {
    e.preventDefault();
    setModelDescription(description);
    setModelTopic(skill);
    setID(keys);
    setModalShow(true);
  };
  return (
    <>
      <section className="about__section">
        <AboutMe />
        <div className="about-back">
          <div className="container">
            <div className="main ">
              <div className="main-title" id="skill">
                <h3>My Skills</h3>
              </div>
              <div className="about-slider">
                <Slider ref={slider} {...settings}>
                  {mySkill.map((get, keys) => {
                    return (
                      <>
                        <button
                          className="button-main"
                          data-bs-toggle="modal"
                          data-bs-target={`#a${keys}`}
                          onClick={(e) =>
                            skillHandler(e, get?.description, get?.skill, keys)
                          }
                        >
                          <span>
                            <i className="fa-solid fa-fire-flame-curved"></i>
                          </span>
                          {get?.skill}
                          <span>
                            <i className="fa-solid fa-fire-flame-curved"></i>
                          </span>
                        </button>
                      </>
                    );
                  })}
                </Slider>
                <div className="slider-arrow slider-arrow-1">
                  <ul>
                    <li>
                      <p
                        className="slider-p"
                        onClick={() => slider?.current?.slickPrev()}
                      >
                        <span className="slider-span1">
                          <i className="fa-solid fa-circle-left"></i>
                        </span>
                        Prev
                      </p>
                    </li>
                    <li>
                      <p
                        className="slider-p"
                        onClick={() => slider?.current?.slickNext()}
                      >
                        Next{" "}
                        <span className="slider-span2">
                          <i className="fa-solid fa-circle-right"></i>
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="project-title">
                  <span>
                    <i className="fa-solid fa-fire-flame-curved"></i>
                  </span>
                  Double click to know more about my skill
                  <span>
                    <i className="fa-solid fa-fire-flame-curved"></i>
                  </span>
                </div>
              </div>
            </div>
            {modalShow && (
              <>
                <div
                  className="modal fade"
                  id={`a${id}`}
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content ">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          {modalTopic}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={() => setModalShow(false)}
                        ></button>
                      </div>
                      <div className="modal-body">{modalDescription}</div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          onClick={() => setModalShow(false)}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                          onClick={() => setModalShow(false)}
                        >
                          Ok
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default AboutPage;
