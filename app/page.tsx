import React from "react";
// import Navbar from "./components/Navbar";
// import Main from "./components/Main";
import Intro from "./components/Intro";
import About from "./components/About";
// import Footer from "./components/Footer";
import Contact from "./components/Contact";
import PredictionSelect from "./components/PredictionSelect";

const page = () => {
  return (
    <>
      <Intro />
      <About />
      <PredictionSelect />
      <Contact />
    </>
  );
};

export default page;
