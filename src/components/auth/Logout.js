import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(props) {
  const history = useNavigate();

  useEffect(() => {
    console.log("logout")
  
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    history("/home");
    props.setLogged(false)
  
  });
  return <div>Logout</div>;
}
