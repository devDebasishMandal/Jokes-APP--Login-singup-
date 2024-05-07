// import logo from './logo.svg';
import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashBoard from "./components/DashBoard";
import { Routes, Route } from "react-router-dom";
function App() {
  // const [token, setToken] = useState("");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard/>} />
      </Routes>
    </div>
  );
}

export default App;
