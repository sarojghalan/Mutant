import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { collection, query, onSnapshot } from "firebase/firestore";
import { mountain, birds2, sun } from "../../Assets";
import firebaseDb from "../../firebaseConfig";
import "../../Scss/Main.scss";
import Button from "../../Components/Button/Button";
import { MasterBannerInterface } from "../../Interface/MasterBannerInterface";

const MasterBanner: React.FunctionComponent = () => {
  const [masterBanner, setMasterBanner] = useState<MasterBannerInterface[]>([]);

  useEffect(() => {
    const q = query(collection(firebaseDb, "masterBanner"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const banner: any[] = [];
      querySnapshot.forEach((doc) => {
        banner.push(doc.data());
      });
      setMasterBanner(banner);
    });
    return () => unsubscribe();
  }, []);

  const onclickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {masterBanner.length === 0 ? (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={712} />
        </Stack>
      ) : (
        <div className="master__banner" id="overlay">
          <img
            className="master__banner__img"
            src={masterBanner[0]?.masterBanner}
            alt="Master Banner"
          />
          {/* <button className="mster__banner__button">See My Works</button> */}
          <Button
            style="master__banner__button"
            handler={onclickHandler}
            disabled={false}
            name="See My Works"
          />
          <img className="mountain__img" src={mountain} alt="Mountain" />
          <img className="sun__img" src={sun} alt="Sun" />
          <img className="bird__img" src={birds2} alt="Bird" />
          <div className="master__banner__content">
            <div className="container">
              <div className="saroj__info">
                <h3>Saroj G.</h3>
                <h4>
                  Do You Have an <span className="banner__span">IDEA</span> ?
                </h4>
                <h5>
                  I Can <span className="banner__span">BUILD</span> It.
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MasterBanner;
