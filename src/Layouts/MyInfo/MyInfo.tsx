import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import firebaseDb from "../../firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import "../../Scss/Main.scss";
import SkillCard from "../../Components/Card/SkillCard";
import { WelcomeInterface } from "../../Interface/WelcomeInterface";
import { LanguageInterface } from "../../Interface/LanguageInterface";

const MyInfo: React.FunctionComponent = () => {
  const [welcomeData, setWelcomeData] = useState<WelcomeInterface[]>([]);
  const [languageData, setLanguageData] = useState<LanguageInterface[]>([]);

  useEffect(() => {
    const q = query(collection(firebaseDb, "welcome"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const welcomeInfo: any[] = [];
      querySnapshot.forEach((doc) => {
        welcomeInfo.push(doc.data());
      });
      setWelcomeData(welcomeInfo);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(firebaseDb, "language"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const languageInfo: any[] = [];
      querySnapshot.forEach((doc) => {
        languageInfo.push(doc.data());
      });
      setLanguageData(languageInfo);
    });
    return () => unsubscribe();
  }, []);

  console.log(languageData);
  console.log(welcomeData);

  const reverseLanguageData = languageData?.reverse();

  return (
    <div className="main-1">
      <div className="container">
        <div className="welcome__div">
          <p>
            <span className="welcome__span"> Hi I'm Saroj Ghalan</span>
          </p>
          {welcomeData.length === 0 ? (
            <Stack spacing={1} className="mb-2">
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </Stack>
          ) : (
            <p className="saroj__welcome__info">{welcomeData[0]?.info}</p>
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
                  <div
                    className="col-md-6 col-lg-3 col-sm-12 col-12"
                    key={keys}
                  >
                    <SkillCard image={get?.image} title={get?.title} />
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
