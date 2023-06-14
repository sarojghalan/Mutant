import React from "react";
import MasterBanner from "../Layouts/MasterBanner/MasterBanner";
import InspirationBanner from "../Layouts/InspirationBanner/InspirationBanner";
import MyInfo from "../Layouts/MyInfo/MyInfo";
import MyServices from "../Layouts/MyServices/MyServices";
import AboutMe from "../Layouts/AboutMe/AboutMe";
import MyProjects from "./HomeComponents/MyProjects/MyProjects";

const Home: React.FunctionComponent = () => {
  return (
    <>
      <MasterBanner />
      <InspirationBanner />
      <MyInfo />
      <MyServices />
      <AboutMe />
      {/* <MyProjects /> */}
    </>
  );
};

export default Home;
