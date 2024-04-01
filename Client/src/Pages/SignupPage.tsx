import React from "react";
import BasicHeader from "../components/Headers/BasicHeader";
import SignupSection from "../components/Auth/SignupSection";
import Footer from "../components/Footer/Footer.tsx";

function signupPage() {
  return (
    <div>
      <div className="h-full">
        <BasicHeader />
        <SignupSection />
      </div>
      <Footer />
    </div>
  );
}

export default signupPage;
