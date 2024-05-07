import React, { useState,useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const navigate = useNavigate();
  const {setToken}=useContext(UserContext);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  // const [token, setToken]=useState("");
  function updateUser(e) {
    let key = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [key]: value });
  }

  async function ImplementSignUp(e) {
    e.preventDefault();

    // validations

    try {
      const response = await axios.post(
        "https://instagram-express-app.vercel.app/api/auth/signup",
        {
          name: name,
          email: email,
          password: password,
          // in Objects there is a shorthand if the key name and variable name are same then we can just use the names once
          //------  {name,email,password} -------
          // this means name:name ..etc
        }
      );
      // console.log(response.data.message);
      setSuccess(response.data.message);
      setToken(response.data.data.token);
      localStorage.setItem("token", JSON.stringify(response.data.data.token));
      setError("");
      setUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
       alert("Login Successful");
       navigate("/dashboard");

    } catch (error) {
      // console.log(error.response.data);
      setError(error.response.data.message);
      setSuccess("");
    }
  }

  const { name, email, password, confirmPassword } = user;

  return (
    <div>
      <h1>Signup</h1>
      {success && <h2>{success}</h2>}

      {error && <h2>{error}</h2>}

      <form onSubmit={ImplementSignUp}>
        <input
          type="text"
          value={name}
          name="name"
          onChange={updateUser}
          placeholder="Name"
        />
        <br />
        <input
          type="email"
          value={email}
          name="email"
          onChange={updateUser}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          value={password}
          name="password"
          onChange={updateUser}
          placeholder="Password"
        />
        <br />
        <input
          type="password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={updateUser}
          placeholder="Confirm Passwrod"
        />
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
