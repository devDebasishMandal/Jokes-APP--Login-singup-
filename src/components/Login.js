import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { setToken } = useContext(UserContext);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  // const [token, setToken] = useState();
  function updateUser(e) {
    let key = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [key]: value });
  }

  async function ImplementLogin(e) {
    e.preventDefault();

    // validations

    try {
      const response = await axios.post(
        "https://instagram-express-app.vercel.app/api/auth/login",
        {
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
      // need to save the current token in the local storage
      // whenever the  token is being generated
      // so the user in not logged out when the page is refreshed and the application is re rendred
      localStorage.setItem("token", JSON.stringify(response.data.data.token));
      setError("");
      setUser({
        email: "",
        password: "",
      });
       alert("Login Successful")
       navigate("/dashboard");

    } catch (error) {
      // console.log(error.response.data);
      setError(error.response.data.message);
      setSuccess("");
    }
  }

  const { email, password } = user;

  return (
    <div> 
      <h1>Login</h1>
      {success && <h2>{success}</h2>}

      {error && <h2>{error}</h2>}

      <form onSubmit={ImplementLogin}>
        <input
          type="email"
          value={email}
          name="email"
          onChange={updateUser}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          name="password"
          onChange={updateUser}
          placeholder="Password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
