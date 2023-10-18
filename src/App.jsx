import { useEffect, useState } from "react";
import "./App.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebase-config";
import { CustomSignOut } from "./Helperfunctions/CustomSignOut";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    // Function that runs whenever the the user status changes (logged in / logged out)
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        setUser(uid);
        navigate("/home")
        // ...
      } else {
        setUser("");
        navigate("/")
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="*" element={<SignIn />} />
        {user && (
          <Route path="/home" element={<Home />} />
        )}
      </Routes>
    </>
  );
}

export default App;
