
// import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

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
// import MyRegister from './components/MyRegister';
// import MyRegisterForm from './components/MyRegisterForm';
// import RegisterForm from './components/RegisterForm';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Hero />}/>
          <Route path='/countries' element={<Countries />}/>
          <Route path='/airlines' element={<Airline />}/>
          <Route path='/deals' element={<Deals />}/>
          <Route path='/login' element={<Login />}/>
          {/* <Route path='/hero' element={<Hero />}/> */}
        </Routes>

<Countries></Countries>
        <BasicForm></BasicForm>
        <Anonymous></Anonymous>
        <Customer></Customer>
        <Airline></Airline>
        <Base></Base>
        <Search></Search>
      </Router>
    </>

  );
}

export default App;
