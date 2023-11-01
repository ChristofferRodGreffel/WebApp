import { useEffect, useState } from "react";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebase-config";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./Components/Navigation";
import SingleMovieOverview from "./pages/SingleMovieOverview";
import Profile from "./pages/Profile";
import ScrollToTop from "./Helperfunctions/ScrollToTop";
import MyLists from "./pages/MyLists";
import SharedLists from "./pages/SharedLists";
import SearchOverview from "./pages/SearchOverview";
import SearchResults from "./pages/SearchResults";
import About from "./pages/About";
import Points from "./pages/Points";
import MyListsApi from "./pages/MyListsApi";
import SharedListsApi from "./pages/SharedListsApi";

function App() {
  const [user, setUser] = useState("");
  const [showNav, setShowNav] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Function that runs whenever the the user status changes (logged in / logged out)
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        setUser(uid);
        setShowNav(true); // Viser navigationslinjen, hvis brugeren er logget ind.
      } else {
        // User is signed out
        setUser("");
        setShowNav(false);
        navigate("/"); // Hvis brugeren ikke er logget ind, eller logget ud, navigeres til signin.
      }
    });
  }, []);

  // ToastContainer er en ekstern komponent vi benytter til feedback infobokse.
  return (
    <>
      <ToastContainer />
      {showNav && <Navigation />}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/overview/:imdbid" element={<SingleMovieOverview />} />
        <Route path="/searchresults/:searchParam" element={<SearchResults />} />
        <Route path="/searchoverview/:movieId" element={<SearchOverview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mylists" element={<MyLists />} />
        <Route path="/mylistsapi" element={<MyListsApi />} />
        <Route path="/sharedlistsapi" element={<SharedListsApi />} />
        <Route path="/sharedlists" element={<SharedLists />} />
        <Route path="/points" element={<Points />} />
        <Route path="/*" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        {user && <Route path="/home" element={<Home />} />}
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
