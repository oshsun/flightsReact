import axios from "axios";
import React, { useEffect, useState } from "react";
import Section from "../UI/Section";
import homeImage from "../../assets/hero.png";
import FRDAutoComplete from "../FRDAutoComplete";
import Table from "react-bootstrap/Table";

const LastMinuteDeals = (props) => {
  const [originCountry, setOriginCountry] = useState("");
  const [lastMinuteFlights, setLastMinuteFlights] = useState([]);

  const lastMinuteDeals = (event) => {
    event.preventDefault();
    if (originCountry.trim().length === 0) {
      alert("You must provide country to search");
      return;
    }
    axios
      .get(
        `http://127.0.0.1:8000/getdepartureflights?origin_country=${originCountry}`
      )
      .then((res) => {
        setLastMinuteFlights(res.data);
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

  let DisplayLastMinuteFlights = [];
  if (lastMinuteFlights) {
    DisplayLastMinuteFlights = lastMinuteFlights.map((flight, index) => {
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
    <>
      <div>
        <Section id='hero'>
          <form>
            <div className='background'>
              <img src={homeImage} alt='' />
            </div>
            <div className='content'>
              <div className='title'>
                <h1>LAST MINUTE DEALS</h1>
              </div>
              <div className='search'>
                <div className='container'>
                  <FRDAutoComplete
                    options={props.filteredCountries}
                    setText={setOriginCountry}
                    text={originCountry}
                    placeholder={"Enter Origin"}
                    label={"From where you want the flight"}
                  />
                </div>
                <button onClick={(event) => lastMinuteDeals(event)}>
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
            {DisplayLastMinuteFlights.length > 0 && (
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
                <tbody>{DisplayLastMinuteFlights}</tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LastMinuteDeals;
