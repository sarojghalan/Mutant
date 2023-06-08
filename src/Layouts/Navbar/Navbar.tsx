import React, { useState, useEffect } from "react";
import firebaseDb from "../../firebaseConfig";
import { logoSaroj } from "../../Assets";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { NavLink } from "react-router-dom";
import "../../Scss/Main.scss";

interface NavbarList {
  id: string;
  title: string;
}

interface Skill {
  createdAt: string;
  description: string;
  id: string;
  skill: string;
}

interface Service {
  description: string;
  id: string;
  title: string;
  image: string;
  description_title: string;
}

function Navbar() {
  const [navbarListData, setNavbarListData] = useState<NavbarList[]>([]);
  const [mySkill, setMySkill] = useState<Skill[]>([]);
  const [myService, setMyService] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [skillLoader, setSkillLoader] = useState<boolean>(false);
  const [navbarClass, setNavbarClass] = useState<string>("main__navbar");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setNavbarClass("main__navbar__2");
    } else {
      setNavbarClass("main__navbar");
    }
  };

  useEffect(() => {
    setLoading(true);
    const q = query(collection(firebaseDb, "navbarlist"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const navbarList: NavbarList[] = [];
      querySnapshot.forEach((doc) => {
        navbarList.push(doc.data() as NavbarList);
      });
      setNavbarListData(navbarList);
    });
    setLoading(false);
  }, []);

  console.log("navbar  : ", myService);

  useEffect(() => {
    setSkillLoader(true);
    const q = query(collection(firebaseDb, "myskill"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const skill: Skill[] = [];
      querySnapshot.forEach((doc) => {
        skill.push(doc.data() as Skill);
      });
      setMySkill(skill);
    });
    setSkillLoader(false);
  }, []);

  useEffect(() => {
    const q = query(collection(firebaseDb, "myservice"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const service: Service[] = [];
      querySnapshot.forEach((doc) => {
        service.push(doc.data() as Service);
      });
      setMyService(service);
    });
  }, []);
  const navbarCss = navbarListData.map((get, keys) => {
    if (get.id == "YrPd2sVMNDb7QMEuBJmm") {
      return (
        <>
          <li className="nav-item dropdown" key={keys}>
            <a
              className="nav__link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {get.title}
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {mySkill.map((get, keys) => {
                return (
                  <li key={keys}>
                    <NavLink to="/about_me">
                      <p className="dropdown-item">
                        <span className="span-span">
                          <i className="fa-solid fa-feather-pointed"></i>
                        </span>
                        {get.skill}
                      </p>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </li>
        </>
      );
    } else if (get.id == "64WPvgzSwOnwPixS0Z28") {
      return (
        <>
          <li className="nav-item dropdown" key={keys}>
            <a
              className="nav__link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {get.title}
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {myService.map((get, keys) => {
                return (
                  <li key={keys}>
                    <NavLink to="/my_services">
                      <p className="dropdown-item__1">
                        <span className="span__span">
                          <i className="fa-solid fa-feather-pointed"></i>
                        </span>
                        {get.title}
                      </p>
                    </NavLink>
                    <NavLink to="/my_services">
                      <p className="dropdown__sub__list">
                        {get.description_title}
                      </p>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </li>
        </>
      );
    } else {
      return (
        <li className="nav-item" key={keys}>
          {get.id == "5y41csy64oWqYHLHEeFa" ? (
            <NavLink className="nav__link" to="/about_me">
              {get.title}
            </NavLink>
          ) : (
            get.id == "fMGmnDck4PQPuNUG2Evj" && (
              <NavLink className="nav__link" to="/my_projects">
                {get.title}
              </NavLink>
            )
          )}
        </li>
      );
    }
  });
  return (
    <div className={`${navbarClass}`}>
      <div className="container-fluid">
        <div className="container">
          <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <NavLink className="navbar__brand" to="/">
                <img className="logo" src={logoSaroj} alt="" />
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon">
                  <i className="fa-solid fa-bars"></i>
                </span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {loading ? <p>loading</p> : navbarCss}
                </ul>
                <p className="d-flex">
                  <span>
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  codewithsaroj@gmail.com
                </p>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
