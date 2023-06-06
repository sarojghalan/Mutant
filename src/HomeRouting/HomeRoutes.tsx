import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import("../Components/Home"));
const AboutPage = lazy(() => import("../Pages/About/AboutPage"));

const HomeRoutes = () => {
  return (
    <Suspense fallback={<p>loading</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about_me" element={<AboutPage />} />
      </Routes>
    </Suspense>
  );
};

export default HomeRoutes;
