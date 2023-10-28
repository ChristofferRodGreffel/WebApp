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
            <br /> <b>Streaming services</b> data is provided by <b>JustWatch</b>.
          </p>
          <div className="about-section-images">
            <Link to="https://www.themoviedb.org" target="_blank">
              <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg" alt="The" />
            </Link>
            <Link to="https://www.justwatch.com/" target="_blank">
              <img alt="JustWatch" src="https://www.justwatch.com/company/assets/JustWatch-icon.png"></img>
            </Link>
          </div>
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
        <div className="about-section">
          <h3>Privacy Policy for WatchBuddy</h3>

          <p className="last-updated">Last updated: 28/10-2023</p>

          <h4>Introduction</h4>

          <p>
            WatchBuddy ("we," "our," or "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, and disclose
            information in connection with your use of the WatchBuddy mobile application (the "App"). By using the App, you agree to the terms and conditions of this Privacy Policy.
          </p>

          <h4>Information We Collect</h4>

          <ul>
            <li>
              <h5>User Email and Password</h5>
              <p>We collect and store your email address and encrypted password to facilitate your access to the App and maintain your account.</p>
            </li>
            <li>
              <h5>Username</h5>
              <p>We collect and display the username you choose to identify yourself on the App.</p>
            </li>
            <li>
              <h5>User Lists</h5>
              <p>
                We collect and store information related to the movies you add to your lists, including watchlists, watched lists, and favorites. Additionally, we may collect and display information
                about your friends on the App.
              </p>
            </li>
          </ul>

          <h4>How We Use Your Information</h4>

          <p>We use the information collected for the following purposes:</p>

          <ul>
            <li>
              <h5>Account Management</h5>
              <p>We use your email and password to manage your account and verify your identity.</p>
            </li>
            <li>
              <h5>User Profiles</h5>
              <p>We use your username to identify you on the App.</p>
            </li>
            <li>
              <h5>Lists and Recommendations</h5>
              <p>We use the data about movies you add to your lists to provide recommendations and improve your experience on the App.</p>
            </li>
            <li>
              <h5>Social Features</h5>
              <p>We use your friends list to enable social features on the App, such as sharing and recommendations.</p>
            </li>
          </ul>

          <h4>Data Security</h4>

          <p>
            We take data security seriously and implement reasonable security measures to protect your information. Your password is stored in an encrypted form to ensure its confidentiality. While we
            take reasonable precautions, no system can be completely secure, and we cannot guarantee the security of your data.
          </p>

          <h4>No Personal Data Collection</h4>

          <p>
            We do not collect or store any personal data beyond what is explicitly mentioned in this Privacy Policy. We do not collect sensitive personal information, such as your address, phone
            number, or financial information.
          </p>

          <h4>Disclosure of Your Information</h4>

          <p>We do not disclose your information to third parties except as follows:</p>

          <ul>
            <li>
              <p>
                <strong>Service Providers:</strong> We may share your information with service providers who help us operate, maintain, and improve the App.
              </p>
            </li>
            <li>
              <p>
                <strong>Legal Requirements:</strong> We may disclose your information if required by law, regulation, or a valid government request.
              </p>
            </li>
          </ul>

          <h4>Changes to this Privacy Policy</h4>

          <p>
            We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this Privacy Policy periodically.
          </p>

          <h4>Contact Us</h4>

          <p>
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at{" "}
            <Link to="mailto:contact@watchbuddy.com" target="_blank">
              contact@watchbuddy.com
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
