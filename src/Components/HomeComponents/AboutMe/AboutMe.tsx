import React, { useState, useEffect, useRef } from "react";
import firebaseDb from "../../../firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import './AboutMe.scss';

const AboutMe: React.FC = () => {
  const image = useRef<HTMLDivElement | null>(null);
  const image1 = useRef<HTMLDivElement | null>(null);
  const [imageExists, setImageExists] = useState(false);
  const [imageExists1, setImageExists1] = useState(false);
  const [aboutMe, setAboutMe] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (imageExists) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("intersected");
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
          console.log("intersected1");
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
    <div className="main main-1">
      <div className="container">
        <div className="main-title">
          <h3>Who Am I ?</h3>
        </div>
        <div className="about-me-content">
          <div className="row">
            <div className="col-md-6">
              <div
                ref={(el) => {
                  image.current = el;
                  setImageExists(true);
                }}
                className="about-me-img"
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
                className="about-me-description"
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
