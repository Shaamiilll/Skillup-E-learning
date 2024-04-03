import React from "react";
import BasicHeader from "../components/Headers/BasicHeader";
import Landing from "../components/common/Landing";
import Footer from "../components/Footer/Footer";

function LandingPage() {
  return (
    <div className="pl-20 pt-10 pr-20">
      <div>
        <BasicHeader />
      </div>
      <Landing />
      <Footer />
    </div>
  );
}

export default LandingPage;
