import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";

const PageLayout = () => {
  return (
    <div className="page-layout">
      <Header />
      <div className="content-wrapper">{<Outlet />}</div>
      <Footer />
    </div>
  );
};

export default PageLayout;
