import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Intro from "./components/Intro";
import About from "./components/About";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

const page = () => {
  return (
    <>
      <Navbar />
      <Intro />
      <About />
      <Main />
      <Contact />
      <Footer />
    </>
  );
};

export default page;
