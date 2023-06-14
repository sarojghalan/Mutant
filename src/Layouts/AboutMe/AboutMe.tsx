import React, { useState, useEffect, useRef } from "react";
import firebaseDb from "../../firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import "../../Scss/Main.scss";
import { AboutMeInterface } from "../../Interface/AboutMeInterface";

const AboutMe: React.FunctionComponent = () => {
  const image = useRef<HTMLDivElement | null>(null);
  const image1 = useRef<HTMLDivElement | null>(null);
  const [imageExists, setImageExists] = useState<boolean>(false);
  const [imageExists1, setImageExists1] = useState<boolean>(false);
  const [aboutMe, setAboutMe] = useState<AboutMeInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(firebaseDb, "aboutme"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const about: any[] = [];
      querySnapshot.forEach((doc) => {
        about.push(doc.data());
      });
      setAboutMe(about);
    });
    setLoading(false);
  }, []);

  console.log(aboutMe);

  useEffect(() => {
    if (imageExists) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          image?.current?.classList.add(
            "animate__animated",
            "animate__backInLeft"
          );
          observer.disconnect();
        }
      });
      observer.observe(image.current as Element);
      return () => {
        observer.disconnect();
      };
    }
  }, [imageExists]);

  useEffect(() => {
    if (imageExists1) {
      const observer1 = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          image1.current?.classList.add(
            "animate__animated",
            "animate__backInRight"
          );
          observer1.disconnect();
        }
      });
      observer1.observe(image1.current as Element);
      return () => {
        observer1.disconnect();
      };
    }
  }, [imageExists1]);

  return (
    <div className="main about__me__wrapper">
      <div className="container">
        <div className="main__title">
          <h3>Who Am I ?</h3>
        </div>
        <div className="about__me__content">
          <div className="row">
            <div className="col-md-6">
              <div
                ref={(el) => {
                  image.current = el;
                  setImageExists(true);
                }}
                className="about__me__img"
              >
                <img src={aboutMe[0]?.image} alt="" />
              </div>
            </div>
            <div className="col-md-5">
              <div
                ref={(el) => {
                  image1.current = el;
                  setImageExists1(true);
                }}
                className="about__me__description"
              >
                <p>" {aboutMe[0]?.description} "</p>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
