import { useEffect, useState } from "react";
import "./App.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebase-config";
import { CustomSignOut } from "./Helperfunctions/CustomSignOut";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    // Function that runs whenever the the user status changes (logged in / logged out)
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        setUser(uid);
        // ...
      } else {
        setUser("");
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
