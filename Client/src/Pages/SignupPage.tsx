import React from "react";
import BasicHeader from "../components/Headers/BasicHeader";
import SignupSection from "../components/Auth/SignupSection";
import Footer from "../components/Footer/Footer.tsx";

function signupPage() {
  return (
    <div className="pl-20 pt-10 pr-20">
      <div className="h-full">
        <BasicHeader />
        <SignupSection />
      </div>
      <Footer />
    </div>
  );
}

export default signupPage;
