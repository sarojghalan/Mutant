import React, { useState, useEffect, useRef } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import firebaseDb from "../../firebaseConfig";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import "slick-carousel/slick/slick-theme.css";
import "../../Scss/Main.scss";
import { MyProjectInterface } from "../../Interface/MyProjectsInterface";

const MyProjects: React.FunctionComponent = () => {
  const slider = useRef<Slider | null>(null);
  const [myProjectData, setMyProjectData] = useState<MyProjectInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(firebaseDb, "myproject"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const project: any[] = [];
      querySnapshot.forEach((doc) => {
        project.push(doc.data());
      });
      console.log("project project : ", project)
      setMyProjectData(project);
    });
    setLoading(false);
  }, []);
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log("project data are : ", myProjectData);

  return (
    <div className="main">
      <div className="container">
        <div className="main__title">
          <h3>Welcome To My Recent Works</h3>
        </div>
        {loading ? (
          <Stack spacing={1}>
            <Skeleton variant="rectangular" height={500} />
          </Stack>
        ) : (
          <div className="my__project__content">
            <Slider ref={slider} {...settings}>
              {myProjectData.map((get, keys): JSX.Element => {
                return (
                  <React.Fragment key={keys}>
                    <div className="project__slider">
                      <a target="_blank" href={get.link} rel="noreferrer">
                        <img className="project__img" src={get.image} alt="" />
                      </a>
                    </div>
                    <div className="project__title">
                      <span>
                        <i className="fa-solid fa-fire-flame-curved"></i>
                      </span>
                      {get.title}
                      <span>
                        <i className="fa-solid fa-fire-flame-curved"></i>
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </Slider>
            <div className="slider__arrow">
              <ul>
                <li>
                  <p
                    className="slider__p"
                    onClick={() => slider?.current?.slickPrev()}
                  >
                    <span className="slider__span1">
                      <i className="fa-solid fa-circle-left"></i>
                    </span>
                    Prev
                  </p>
                </li>
                <li>
                  <p
                    className="slider__p"
                    onClick={() => slider?.current?.slickNext()}
                  >
                    Next{" "}
                    <span className="slider__span2">
                      <i className="fa-solid fa-circle-right"></i>
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;
