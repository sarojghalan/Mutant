import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import mountain from "../../../Assets/mountain.png";
import bird from "../../../Assets/birds2.png";
import sun from "../../../Assets/sun.png";
import firebaseDb from "../../../firebaseConfig";
import "./MasterBanner.scss";

interface BannerData {
  masterBanner: string;
}

const MasterBanner: React.FunctionComponent = () => {
  const [masterBanner, setMasterBanner] = useState<BannerData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(firebaseDb, "masterBanner"));
    setLoading(true);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const banner: BannerData[] = [];
      querySnapshot.forEach((doc) => {
        banner.push(doc.data() as BannerData);
      });
      setMasterBanner(banner);
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);
  console.log("loading : ", masterBanner);
  return (
    <>
      {masterBanner.length === 0 ? (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={500} />
        </Stack>
      ) : (
        <div className="master-banner" id="overlay">
          <img
            className="master-banner-img"
            src={masterBanner[0]?.masterBanner}
            alt="Master Banner"
          />
          <button>See My Works</button>
          <img className="mountain-img" src={mountain} alt="Mountain" />
          <img className="sun-img" src={sun} alt="Sun" />
          <img className="bird-img" src={bird} alt="Bird" />
          <div className="master-banner-content">
            <div className="container">
              <div className="saroj-info">
                <h3>Saroj G.</h3>
                <h4>
                  Do You Have an <span className="banner-span">IDEA</span> ?
                </h4>
                <h5>
                  I Can <span className="banner-span">BUILD</span> It.
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
