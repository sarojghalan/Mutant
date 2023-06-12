import React, { useState, useEffect, useRef } from "react";
import firebaseDb from "../../firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import "../../Scss/Main.scss";
import { ServiceDataProps } from "../../Interface/ServiceDataInterface";

const MyServices: React.FunctionComponent = () => {
  const image = useRef<HTMLDivElement | null>(null);
  const image1 = useRef<HTMLDivElement | null>(null);
  const [imageExists, setImageExists] = useState<boolean>(false);
  const [imageExists1, setImageExists1] = useState<boolean>(false);
  const [serviceData, setServiceData] = useState<ServiceDataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(firebaseDb, "myservice"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const service: any[] = [];
      querySnapshot.forEach((doc) => {
        service.push(doc.data());
      });
      setServiceData(service);
    });
    setLoading(false);
  }, []);

  console.log("service data", serviceData);

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
    <div className="main">
      <div className="service-main">
        <div className="container">
          <div className="main-title">
            <h3>My Services</h3>
          </div>
          {serviceData.length === 0 ? (
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={210} height={400} />
            </Stack>
          ) : (
            serviceData.map((get, keys) => {
              return (
                <>
                  {keys % 2 == 0 ? (
                    <div className="service-card" key={keys}>
                      <div className="row">
                        <div className="col-md-5">
                          <div
                            ref={(el) => {
                              image.current = el;
                              setImageExists(true);
                            }}
                            className="service-image "
                          >
                            <img src={get.image} alt="" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div
                            ref={(el) => {
                              image1.current = el;
                              setImageExists1(true);
                            }}
                            className="service-content"
                          >
                            <div className="main-sec-title">
                              <h4>
                                <span className="span-span">
                                  <i className="fa-solid fa-feather-pointed"></i>
                                </span>
                                {get?.title}
                              </h4>
                            </div>
                            <p>{get.description}</p>
                            <button className="button-main">
                              {" "}
                              Want to Read More
                            </button>
                          </div>
                        </div>
                        <div className="col-md-1"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="service-card" key={keys}>
                      <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-6 order-md-second order-lg-second order-second">
                          <div
                            ref={(el) => {
                              image.current = el;
                              setImageExists(true);
                            }}
                            className="service-content-1"
                          >
                            <div className="main-sec-title-2">
                              <h4>
                                <span className="span-span">
                                  <i className="fa-solid fa-feather-pointed"></i>
                                </span>
                                {get?.title}
                              </h4>
                            </div>
                            <p>{get.description}</p>
                            <button className="button-main">
                              Want to Read More
                            </button>
                          </div>
                        </div>
                        <div className="col-md-5 order-md-first order-lg-last order-first">
                          <div
                            ref={(el) => {
                              image1.current = el;
                              setImageExists1(true);
                            }}
                            className="service-image "
                          >
                            <img src={get.image} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MyServices;
