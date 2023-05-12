import React from "react";
import introHero from "../../assets/interview_illustration.svg";
import logo from "../../assets/logo.jpeg";

const Home = () => {
  return (
    <>
      <h1>MockMeet</h1> 
      <img src={logo} alt="MockMeet logo" />
      <img src={introHero} alt="Intro Hero" />
    </>
  );
};

export default Home;
