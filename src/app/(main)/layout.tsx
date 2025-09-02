import React, { PropsWithChildren } from "react";

import Footer from "@/components/global/footer";
import NavBar from "@/components/global/navbar";

type Props = PropsWithChildren<object>;

const MainLayout = ({ children }: Props) => {
  return (
    <div className="dark">
      <div className="z-[99] fixed top-0 left-0 w-full">
        <NavBar />
      </div>

      {children}

      <Footer />
    </div>
  );
};

export default MainLayout;
