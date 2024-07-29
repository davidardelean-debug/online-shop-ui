import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";

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
