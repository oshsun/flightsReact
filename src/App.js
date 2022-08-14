
// import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Base from './components/Base';
import Anonymous from './components/Anonymous';
import Search from './components/Search';
import Airline from './components/pages/Airline';
import Customer from './components/Customer';
import Countries from './components/pages/Countries';
import Navbar from './components/pages/Navbar';
import BasicForm from "./components/auth/SignUp";
import Deals from "./components/pages/Deals";
import Hero from "./components/pages/Hero";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";
import AutoComplete from "./components/pages/AutoComplete";
// import MyRegister from './components/MyRegister';
// import MyRegisterForm from './components/MyRegisterForm';
// import RegisterForm from './components/RegisterForm';


function App() {
const [showRegisterModal, setShowRegisterModal] = useState(false)
const [showLoginModal, setShowLoginModal] = useState(false)
const [logged, setLogged] = useState(false)
const [accessToken, setAccessToken] = useState('')
const handleLogin =()=>{
  setLogged((prevState)=>!prevState)
}

useEffect(() => {
  const token = localStorage.getItem("access_token");
  if (token) {
      setLogged(true);
      setAccessToken(token)
  } else if (token === null) {
    setLogged(false);
  }


  return () => {};
}, [setLogged,setAccessToken]);


const handleLogout= ()=>{
  window.localStorage.reload(false)
}

const toggleShowRegister = () =>{
  setShowRegisterModal((prevState)=> !prevState)

}

const toggleShowLogin = () =>{
  setShowLoginModal((prevState)=> !prevState)

}

  return (
    <>
      <Router>
        <Navbar toggleShowRegister={toggleShowRegister} toggleShowLogin={toggleShowLogin} handleLogout={handleLogout} logged={logged}/>
        <Register toggleShowRegister={toggleShowRegister} show={showRegisterModal}/>
        <Login toggleShowLogin={toggleShowLogin} show={showLoginModal}/>

        <Routes>
          <Route path='/home' element={<Hero />}/>
          <Route path='/countries' element={<Countries />}/>
          <Route path='/airlines' element={<Airline />}/>
          <Route path='/deals' element={<Deals />}/>
          <Route path='/login' element={<Login handleLogin={handleLogin} setAccessToken={setAccessToken}/>}/>
          <Route path='/logout' element={<Logout setLogged={setLogged}/>}  />
          {/* <Route path='/hero' element={<Hero />}/> */}
        </Routes>
        

<Countries></Countries>
        <Customer></Customer>
        <Airline></Airline>
        <Base></Base>
        <Search></Search>
      </Router>
    </>

  );
}

export default App;
