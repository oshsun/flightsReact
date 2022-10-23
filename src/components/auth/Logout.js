import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(props) {
  const history = useNavigate();

  useEffect(() => {
    console.log("logout");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("is_super_user");
    localStorage.removeItem("is_staff_member");
    props.setIsSuperUser(false);
    props.setIsStaff(false);
    props.setUsername("");

    history("");
    props.setLogged(false);
  }, []);
  return <div>Logout</div>;
}
