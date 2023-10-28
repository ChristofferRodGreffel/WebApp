import React from "react";
import Backbutton from "../Components/Backbutton";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about">
      <Backbutton />
      <h1>About WatchBuddy</h1>
      <div className="about-container">
        <div className="about-section">
          <h3>What is the purpose of the app?</h3>
          <p>
            With WatchBuddy you can easily browse through the movies and TV series of the world. Add your favourite movies or series to a list or share a list with your friends, to keep track of what
            to watch on movie nights! <br />
            <br /> WatchBuddy also shows you where your chosen movie or series can be streamed! Never again will you have to look through you streaming services to find out where it can be streamed.
          </p>
        </div>
        <div className="about-section">
          <h3>How do we get our data?</h3>
          <p>
            WatchBuddy uses the <b>TMDB API</b> but is not endorsed or certified by <b>TMDB.</b> <br />
            <br /> We are very greateful for TMDB for providing a database of movie data which we can use in our app. <br />
            <br /> Data about <b>streaming services</b> is provided by <b>JustWatch</b>.
          </p>
        </div>
        <div className="about-section">
          <h3>Feedback</h3>
          <p>
            If you have any feedback on the app or have experienced issues, please contact us: <br />
          </p>
          <div className="about-contact">
            <Link to="mailto:contact@watchbuddy.com" target="_blank">
              Email: contact@watchbuddy.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
