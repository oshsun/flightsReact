import React from "react";
import { RiCustomerService2Full, RiCustomerService2Fill } from "react-icons/ri";
import axios from "axios";
import { useEffect, useState } from "react";
import "./FlightSearch.css";
import Table from "react-bootstrap/Table";
import FRDAutoComplete from "../FRDAutoComplete";
import Section from "../UI/Section";
import homeImage from "../../assets/hero.png";

const FlightSearch = (props) => {
  const [flightByParam, setFlightByParam] = useState([]);

  const [destination_country_id, setdestination_country_id] = useState("");
  const [origin_country_id, setorigin_country_id] = useState("");

  const [date, setdate] = useState("");
  const [flightsByCountry, setFlightsByCountry] = useState([]);

  const [flight_id, setflight_id] = useState("");
  const [customer_id, setcustomer_id] = useState("");

  const destination_contry_change_handler = (value) => {
    console.log(value, "from destination country");

    setdestination_country_id(value);
  };

  const origin_contry_change_handler = (value) => {
    console.log(value, "from origin country");
    setorigin_country_id(value);
  };

  const get_flights_by_country = (id) => {
    axios
      .post("http://127.0.0.1:8000/getflightsbycountry", {
        destination_country_id: props.countries[id].id,
        origin_country_id: props.countries[id].id,
      })
      .then((res) => {
        setFlightsByCountry(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const get_flights_by_parameters = (event) => {
    event.preventDefault();
    axios
      .get(
        `http://127.0.0.1:8000/flight-by-params/?origin_country=${origin_country_id}&dest_country=${destination_country_id}&dept_date=${date}`
      )
      .then((res) => {
        setFlightByParam(res.data);
        console.log(res.data);
        if (res.data.length === 0) {
          alert("No flights found");
        }
      })
      .catch((err) => {
        const errorStatus = err.response.status;
        if (errorStatus === 400) {
          alert("There is no flights in this search term");
        }
        console.log("error since no flight was found", err.response.status);
      });
  };

  let displayFlights = [];
  if (flightByParam) {
    displayFlights = flightByParam.map((flight, index) => {
      return (
        <tr key={index}>
          <td>{flight.airline_company_id.name}</td>
          <td>{flight.origin_country_id.name}</td>
          <td>{flight.destination_country_id.name}</td>

          <td>
            Date: {flight.departure_time.slice(0, 10)} Time:{" "}
            {flight.departure_time.slice(11, 16)}
          </td>
          <td>
            Date: {flight.landing_time.slice(0, 10)} Time:{" "}
            {flight.landing_time.slice(11, 16)}
          </td>

          <td>{flight.remaining_tickets}</td>
          <button onClick={() => props.addTicket(flight.id)}>Add Ticket</button>
        </tr>
      );
    });
  }

  return (
    <div>
      <Section id='hero'>
        <form>
          <div className='background'>
            <img src={homeImage} alt='' />
          </div>
          <div className='content'>
            <div className='title'>
              <h1>TRAVEL TO EXPLORE</h1>
            </div>
            <div className='search'>
              <div className='container'>
                <FRDAutoComplete
                  options={props.filteredCountries}
                  setText={setorigin_country_id}
                  text={origin_country_id}
                  placeholder={"Enter Origin"}
                  label={"From where you want the flight"}
                />
              </div>
              <div className='container'>
                <FRDAutoComplete
                  options={props.filteredCountries}
                  setText={setdestination_country_id}
                  text={destination_country_id}
                  placeholder={"Enter Destination"}
                  label={"Where you want to go"}
                />
              </div>
              <div className='container'>
                <label>Check-in</label>
                <input
                  onChange={(e) => setdate(e.target.value)}
                  name={date}
                  type='date'
                />
              </div>

              <button onClick={(event) => get_flights_by_parameters(event)}>
                Explore Now
              </button>
            </div>
          </div>
        </form>
      </Section>

      <div
        style={{ textAlign: "center", marginTop: "20px" }}
        className='max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-4 px-4 py-16'>
        <div className='lg:col-span-2 flex flex-col justify-evenly'>
          {displayFlights.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Origin Country</th>
                  <th>Destination Country</th>
                  <th>Departure Time</th>
                  <th>Landing Time</th>
                  <th>Remaining Tickects</th>
                </tr>
              </thead>
              <tbody>{displayFlights}</tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};
export default FlightSearch;
