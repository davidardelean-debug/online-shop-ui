import { ReactNode } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";

interface Props {
  children: ReactNode | ReactNode[];
}

const PageLayout = ({ children }: Props) => {
  return (
    <div className="page-layout">
      <Header />
      <div className="content-wrapper">{children}</div>
      <Footer />
    </div>
  );
};

export default PageLayout;
