import React, { useState, useEffect, useRef } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import firebaseDb from "../../../firebaseConfig";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import "slick-carousel/slick/slick-theme.css";
import './MyProjects.scss';

const MyProjects: React.FC = () => {
  const slider = useRef<Slider | null>(null);
  const [myProjectData, setMyProjectData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(firebaseDb, "myproject"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const project: any[] = [];
      querySnapshot.forEach((doc) => {
        project.push(doc.data());
      });
      setMyProjectData(project);
    });
    setLoading(false);
  }, []);

  console.log("My Projects: ", myProjectData);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="main">
      <div className="container">
        <div className="main-title">
          <h3>Welcome To My Recent Works</h3>
        </div>
        {loading ? (
          <Stack spacing={1}>
            <Skeleton variant="rectangular" height={500} />
          </Stack>
        ) : (
          <div className="myproject-content">
            <Slider ref={slider} {...settings}>
              {myProjectData.map((get, keys): JSX.Element => {
                return (
                  <React.Fragment key={keys}>
                    <div className="project-slider">
                      <a target="_blank" href={get.link} rel="noreferrer">
                        <img className="project-img" src={get.image} alt="" />
                      </a>
                    </div>
                    <div className="project-title">
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
            <div className="slider-arrow">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;
