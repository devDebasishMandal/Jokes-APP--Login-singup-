import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const { setToken, token } = useContext(UserContext);
 const navigate = useNavigate();


  useEffect(() => {
    // if token is present then hit the api 
   token && getjokes();
    //whenever the tokens value is updated
    //getjokes will get the name and message 
    // for that user 
  }, [token]);


// if we want out code can have multiple useEffect 
useEffect(()=>{
if(!token){
  let jsonToken=localStorage.getItem("token")
  if(!jsonToken){
    navigate("/login");
  }else{
    setToken(JSON.parse(jsonToken));
  }
}
},[])



  async function getjokes() {
    try {
      const response = await axios.get(
        "https://instagram-express-app.vercel.app/api/auth/zuku",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.data.message);
      setName(response.data.data.user.name);
     
    } catch (err) {
      console.log(err);
    }

 
  }
   async function logout() {
     try {
      //it is delete Api because we delete the token
       const response = await axios.delete(
         "https://instagram-express-app.vercel.app/api/auth/logout",
         {
           headers: {
             authorization: `Bearer ${token}`,
           },
         }
       );
      //  clearing the current token from frontend 
       setToken("");
       setName("");
       setMessage("");
       alert("logout successful");
       navigate("/login");
     } catch (err) {}
   }
  return (
    <div>
      <h1>Welcome {name} !</h1>
      {message && <h5>{message}</h5>}
      <button onClick={getjokes}>Get Joke</button>
      <div>
        {/* if we logout the token will be made null in backend as well as frontend  */}
        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
