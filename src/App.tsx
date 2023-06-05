import "./App.scss";
import Navbar from "./Components/Navbar";
import MasterBanner from "./Components/HomeComponents/MasterBanner/MasterBanner";
import InspirationBanner from "./Components/HomeComponents/InspirationBanner/InspirationBanner";
import MyInfo from "./Components/HomeComponents/MyInfo/MyInfo";
import MyServices from "./Components/HomeComponents/MyServices/MyServices";
import AboutMe from "./Components/HomeComponents/AboutMe/AboutMe";

function App() {
  return (
    <>
      <Navbar />
      <MasterBanner />
      <InspirationBanner />
      <MyInfo />
      <MyServices />
      <AboutMe />
    </>
  );
}

export default App;
