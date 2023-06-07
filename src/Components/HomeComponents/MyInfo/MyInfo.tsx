import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import firebaseDb from "../../../firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import "./MyInfo.scss";

const MyInfo: React.FunctionComponent = () => {
  const [welcomeData, setWelcomeData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [languageData, setLanguageData] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(firebaseDb, "welcome"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const welcomeInfo: any[] = [];
      querySnapshot.forEach((doc) => {
        welcomeInfo.push(doc.data());
      });
      setWelcomeData(welcomeInfo);
    });
    setLoading(false);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(firebaseDb, "language"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const languageInfo: any[] = [];
      querySnapshot.forEach((doc) => {
        languageInfo.push(doc.data());
      });
      setLanguageData(languageInfo);
    });
    setLoading(false);
    return () => unsubscribe();
  }, []);

  const reverseLanguageData = languageData?.reverse();

  return (
    <div className="main-1">
      <div className="container">
        <div className="welcome-div">
          <p>
            <span className="welcome-span"> Hi I'm Saroj Ghalan</span>
          </p>
          {welcomeData.length === 0 ? (
            <Stack spacing={1} className="mb-2">
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </Stack>
          ) : (
            <p className="saroj-welcome-info">{welcomeData[0]?.info}</p>
          )}

          <div className="row">
            {languageData.length === 0 ? (
              <div className="row">
                <div className="col-md-6 col-lg-3 col-sm-12 col-12">
                  <Stack spacing={1}>
                    <Skeleton variant="rectangular" height={200} />
                  </Stack>
                </div>
                <div className="col-md-6 col-lg-3 col-sm-12 col-12">
                  <Stack spacing={1}>
                    <Skeleton variant="rectangular" height={200} />
                  </Stack>
                </div>
                <div className="col-md-6 col-lg-3 col-sm-12 col-12">
                  <Stack spacing={1}>
                    <Skeleton variant="rectangular" height={200} />
                  </Stack>
                </div>
                <div className="col-md-6 col-lg-3 col-sm-12 col-12">
                  <Stack spacing={1}>
                    <Skeleton variant="rectangular" height={200} />
                  </Stack>
                </div>
              </div>
            ) : (
              reverseLanguageData.map((get, keys) => {
                return (
                  <div className="col-md-6 col-lg-3 col-sm-12 col-12" key={keys}>
                    <div className="card-skill">
                      <img src={get?.image} alt="" />
                      <p>{get?.title}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
