import "./App.scss";
import Navbar from "./Layouts/Navbar/Navbar";
import Footer from "./Layouts/Footer/Footer";
import HomeRoutes from "./HomeRouting/HomeRoutes";

function App() {
  return (
    <>
      <Navbar />
      <HomeRoutes />
      <Footer />
    </>
  );
}

export default App;
