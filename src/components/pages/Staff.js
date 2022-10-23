import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import Table from "react-bootstrap/Table";
import styled from "styled-components";

const Staff = (props) => {
  const [airlineDetails, setAirlineDetails] = useState([]);
  const [country, setCountry] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [myCompanyFlights, setMyCompanyFlights] = useState([]);

  const [AddFlightIsShown, setAddFlightIsShown] = useState(false);

  const addFlightSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Submited add flight");
    console.log(destCountry, originCountry);
    console.log(departure, landing);

    if (destCountry === originCountry) {
      alert("You cannot use the same origin and destination country");
      return;
    }

    if (departure > landing) {
      alert("landing must be later from departure");
    }

    axiosInstance
      .post(`add-flight/`, {
        origin_country: originCountry,
        destination_country: destCountry,
        departure_time: departure,
        landing_time: landing,
        remaining_tickets: tickets
      })
      .then((res) => {
        console.log(res);
      })
      .then((res) => {
        getFlights();
      });
  };

  const showAddFlightHandler = () => {
    setAddFlightIsShown(true);
  };

  const hideAddFlightHandler = () => {
    setAddFlightIsShown(false);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleDeleteFlight = (flight_id) => {
    axiosInstance.delete(`remove/flight/${flight_id}/`);
    getFlights();
  };

  const [originCountry, setOriginCountry] = useState("");

  const handleOriginChange = (e) => {
    setOriginCountry(e.target.value);
    console.log(`new value for origin ${originCountry}`);
  };

  const [destCountry, setDestCountry] = useState("");

  const handleDestChange = (e) => {
    setDestCountry(e.target.value);
    console.log(`new value for origin ${destCountry}`);
  };

  const [departure, setDeparture] = useState("");

  const [landing, setLanding] = useState("");

  const handleDeprtChange = (e) => {
    setDeparture(e.target.value);
    console.log(`new value for origin ${departure}`);
  };

  const handleLandingChange = (e) => {
    setLanding(e.target.value);
    console.log(`new value for origin ${landing}`);
  };

  const [tickets, setTickets] = useState("");

  const handleTicketsChange = (e) => {
    setTickets(e.target.value);
    console.log(`new value for origin ${tickets}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`country ${country}`);
    console.log(`country ${companyName}`);

    axiosInstance
      .put(`update-airline/`, {
        name: companyName,
        country: country,
      })
      .then((res) => {
        setAirlineDetails(res.data);
        alert("Successfully updated the airline");
      });
  };

  useEffect(() => {
    axiosInstance.get(`get_airline_company/`).then((res) => {
      console.log(res.data.country_id.name);
      setCompanyName(res.data.name);
      setCountry(res.data.country_id.name);
    });
    console.log(
      "entering again since we changed the usestate from isnide the useeffect"
    );

    getFlights();
  }, []);

  const getFlights = () => {
    axiosInstance.get(`my-flights/`).then((res) => {
      console.log(res.data);
      setMyCompanyFlights(res.data);
    });
  };

  const countryOptions = props.filteredCountries.map((cnt) => {
    if (cnt !== country)
      return (
        <option value={cnt} key={cnt}>
          {cnt}
        </option>
      );
  });

  console.log(props.filteredCountries);

  const addFlightcountryOptions = props.filteredCountries.map((cnt, index) => (
    <option value={cnt} key={index}>
      {cnt}
    </option>
  ));

  let ListCompanyFlights = [];
  if (myCompanyFlights) {
    ListCompanyFlights = myCompanyFlights.map((flight) => {
      console.log(flight.id);
      const flight_edit_id = `/edit-flight/${flight.id}`;
      return (
        <tr key={flight.id}>
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
          <button onClick={() => handleDeleteFlight(flight.id)}>
            Delete Flight
          </button>
          <Link to={flight_edit_id}>Edit Flight</Link>
        </tr>
      );
    });
  }

  return (
    <>
      <div className={AddFlightIsShown ? "modal" : "modal hide_modal"}>
        <div className='modal'>
          <div className='overlay'></div>
          <div className='modal-content'>
            <Form onSubmit={addFlightSubmitHandler}>
              <div className='control-group'>
                <div className='form-control'>
                  <label>Origin country</label>
                  <select
                    style={{ textAlign: "center" }}
                    className='form-control'
                    required={true}
                    onChange={handleOriginChange}>
                    {addFlightcountryOptions}
                    <option defaultValue=''>Choose Origin</option>
                  </select>
                </div>
              </div>

              <div className='form-control'>
                <label>Destination country</label>
                <select
                  style={{ textAlign: "center" }}
                  className='form-control'
                  required={true}
                  onChange={handleDestChange}>
                  <option defaultValue=''>Choose Destination</option>

                  {addFlightcountryOptions}
                </select>
              </div>

              <div className='form-control'>
                <label>Departure time</label>
                <input
                  type='datetime-local'
                  min='2022-09-12T18:20'
                  onChange={handleDeprtChange}
                  value={departure}
                />
              </div>

              <div className='form-control'>
                <label>Landing time</label>
                <input
                  type='datetime-local'
                  min={departure ? departure : "2022-09-13T20:20"}
                  onChange={handleLandingChange}
                  value={landing}
                />
              </div>

              <div className='form-control'>
                <label>Number of tickets</label>
                <input
                  type='number'
                  onChange={handleTicketsChange}
                  value={tickets}
                />
              </div>

              <div className='form-actions'>
                <button onClick={hideAddFlightHandler}>Submit</button>
              </div>
            </Form>

            <button className='close-modal' onClick={hideAddFlightHandler}>
              CLOSE
            </button>
          </div>
        </div>
      </div>

      {airlineDetails && (
        <section
          className='section-content padding-y bg mt-5'
          row='true'
          justify-content-center='true'
          style={{ display: "flex" }}>
          <div className='container'>
            <div className='row'>
              <aside
                className='col-lg-12
              '>
                <div className='card' style={{ textAlign: "center" }}>
                  <div className='card-body'>
                    <h4 className='card-title mb-4'>Airline Details</h4>
                    <form>
                      <div className='form-row'>
                        <div className='col form-group'>
                          <label htmlFor=''>Name</label>
                          <input
                            style={{ textAlign: "center" }}
                            type='text'
                            name='name'
                            className='form-control'
                            required={true}
                            onChange={handleCompanyNameChange}
                            defaultValue={companyName}
                          />
                        </div>
                        <div className='col form-group'>
                          <label htmlFor=''>Base Country </label>
                          <select
                            style={{ textAlign: "center" }}
                            type='text'
                            name='country'
                            className='form-control'
                            required={true}
                            onChange={handleCountryChange}>
                            <option defaultValue={country}>{country}</option>
                            {countryOptions}
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </aside>
              <aside className='col-lg-12' style={{ textAlign: "center" }}>
                <div className='card'>
                  <div className='card-body'>
                    <Link
                      to='/checkout'
                      className='btn btn-primary btn-block'
                      onClick={handleSubmit}>
                      Update details
                    </Link>
                    <button
                      onClick={showAddFlightHandler}
                      className='btn btn-light btn-block'>
                      Add New Flight
                    </button>
                  </div>
                </div>

                {ListCompanyFlights.length > 0 && (
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
                    <tbody>{ListCompanyFlights}</tbody>
                  </Table>
                )}
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const Form = styled.form`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap");

  * {
    box-sizing: border-box;
  }

  html {
    font-family: "Noto Sans JP", sans-serif;
  }

  body {
    margin: 0;
    background-color: #3f3f3f;
  }

  .app {
    width: 90%;
    max-width: 43rem;
    padding: 1rem;
    border-radius: 12px;
    background-color: white;
    margin: 3rem auto;
  }

  .form-control {
    margin-bottom: 1rem;
  }

  .form-control input,
  .form-control label {
    display: block;
  }

  .form-control label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .form-control input,
  .form-control select {
    font: inherit;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 20rem;
    max-width: 100%;
  }

  .form-control input:focus {
    outline: none;
    border-color: #240370;
    background-color: #e0d4fd;
  }

  .control-group {
    display: flex;
    column-gap: 1rem;
    flex-wrap: wrap;
  }

  .control-group .form-control {
    min-width: 15rem;
    flex: 1;
  }

  button {
    font: inherit;
    background-color: #240370;
    color: white;
    border: 1px solid #240370;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover,
  button:active {
    background-color: #33059e;
    border-color: #33059e;
  }

  button:disabled,
  button:disabled:hover,
  button:disabled:active {
    background-color: #ccc;
    color: #292929;
    border-color: #ccc;
    cursor: not-allowed;
  }

  .form-actions {
    text-align: right;
  }

  .form-actions button {
    margin-left: 1rem;
  }

  .invalid input {
    border: 1px solid #b40e0e;
    background-color: #fddddd;
  }

  .invalid input:focus {
    border-color: #ff8800;
    background-color: #fbe8d2;
  }

  .error-text {
    color: #b40e0e;
  }
`;

export default Staff;
