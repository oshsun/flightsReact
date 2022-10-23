import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Airline from "./components/pages/Airline";
import Countries from "./components/pages/Countries";
import Navbar from "./components/pages/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CustomerProfile from "./components/pages/CustomerProfile";
import FlightSearch from "./components/pages/FlightSearch";
import MyTickets from "./components/pages/MyTickets";
import LastMinuteDeals from "./components/pages/LastMinuteDeals";
import axios from "axios";

import Staff from "./components/pages/Staff";
import EditFlight from "./components/pages/EditFlight";
import axiosInstance from "./axios";
import Footer from "./components/pages/Footer";

function App() {
  const history = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [logged, setLogged] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [username, setUsername] = useState("");

  const [countries, setCountries] = useState([]);
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  let filteredCountries = [];
  if (countries.length > 0) {
    filteredCountries = countries.map((country) => {
      return country.name;
    });
  }

  useEffect(() => {
    get_countries();
    handleLogin();
  }, []);

  const get_countries = () => {
    axios
      .get("http://127.0.0.1:8000/countries")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    console.log("entered handle login");
    const token = localStorage.getItem("access_token");
    const currentUsername = localStorage.getItem("username");
    const superuser = localStorage.getItem("is_super_user");
    const staff = localStorage.getItem("is_staff_member");

    if (token) {
      console.log("entered token");
      setLogged(true);
    }
    if (currentUsername) {
      console.log("entered username");

      setUsername(currentUsername);
    }
    if (staff) {
      console.log("entered staff");

      setIsStaff(staff);
    }
    if (superuser) {
      console.log("entered superuser");
      setIsSuperUser(superuser);
    }
  };

  const toggleShowRegister = () => {
    setShowRegisterModal((prevState) => !prevState);
  };

  const toggleShowLogin = () => {
    setShowLoginModal((prevState) => !prevState);
  };

  const [refresh, setRefresh] = useState(true);

  const refreshCart = () => {
    setRefresh((prev) => !prev);
  };

  const addTicket = (flight_id) => {
    const ticket = { flight_id: flight_id };
    axiosInstance
      .post("/addticket", ticket)
      .then((res) => history("/customer-profile"))
      .catch((err) => {
        if (
          err.response.request.responseText ===
          `{"non_field_errors":["The fields flight_id, customer_id must make a unique set."]}`
        ) {
          alert("U can't purchase 2 of the same ticket");
          return;
        }
        if (
          err.response.request.responseText.startsWith(
            "DoesNotExist at /addticket"
          )
        ) {
          alert("Create customer profile first please");
          history("/customer-profile");
          return;
        }

        if (
          err.response.request.responseText.startsWith(
            "Refresh token not available"
          )
        ) {
          alert("You must login");
          return;
        }

        console.log(err.response.request.responseText);
      });
    refreshCart();
  };

  return (
<>

      <Navbar
        onShowCart={showCartHandler}
        onHideCart={hideCartHandler}
        toggleShowRegister={toggleShowRegister}
        toggleShowLogin={toggleShowLogin}
        logged={logged}
        isStaff={isStaff}
        setIsStaff={setIsStaff}
        setLogged={setLogged}
        setIsSuperUser={setIsSuperUser}
        isSuperUser={isSuperUser}
        username={username}
        setUsername={setUsername}
      />

      <Register
        toggleShowRegister={toggleShowRegister}
        show={showRegisterModal}
      />
      <Login
        toggleShowLogin={toggleShowLogin}
        show={showLoginModal}
        handleLogin={handleLogin}
        setIsSuperUser={setIsSuperUser}
        setIsStaff={setIsStaff}
        setUsername={setUsername}
      />

      <Routes>
        <Route
          path='/edit-flight/:id'
          element={<EditFlight filteredCountries={filteredCountries} />}
        />

        <Route
          path='/staff'
          element={<Staff filteredCountries={filteredCountries} />}
        />

        <Route path='/last-tickets' element={<MyTickets />} />

        <Route path='/my-tickets' element={<MyTickets />} />
        <Route path='/customer-profile' element={<CustomerProfile />} />
        <Route path='/countries' element={<Countries />} />
        <Route
          path='/deals'
          element={
            <LastMinuteDeals
              addTicket={addTicket}
              filteredCountries={filteredCountries}
              countries={countries}
            />
          }
        />

        <Route path='/login' element={<Login handleLogin={handleLogin} />} />

        <Route
          path=''
          element={
            <FlightSearch
              addTicket={addTicket}
              countries={countries}
              filteredCountries={filteredCountries}
            />
          }
        />
      </Routes>
      <Footer />
      </>
  );
}

export default App;
