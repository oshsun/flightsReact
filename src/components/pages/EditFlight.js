import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { useParams } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";

const EditFlight = (props) => {
  const { id } = useParams();

  const [originCountry, setOriginCountry] = useState("");
  const [destCountry, setDestCountry] = useState("");
  const [departure, setDeparture] = useState("");
  const [landing, setLanding] = useState("");
  const [tickets, setTickets] = useState("");

  useEffect(() => {
    axiosInstance.get(`/flight-detail/${id}/`).then((res) => {
      console.log(res.data);
      setOriginCountry(res.data.origin_country_id.name);
      setDestCountry(res.data.destination_country_id.name);
      setDeparture(res.data.departure_time);
      setLanding(res.data.landing_time);
      setTickets(res.data.remaining_tickets);
    });
  }, []);

  const handleEditFlightSubmit = (e) => {
    e.preventDefault();
    console.log(`enter edit flight }`);
    if (destCountry === originCountry) {
      alert("You cannot use the same origin and destination country");
      return;
    }

    axiosInstance
      .put(`update-flight/`, {
        flight_id: id,
        origin_country: originCountry,
        destination_country: destCountry,
        departure_time: departure,
        landing_time: landing,
        remaining_tickets: tickets,
      })
      .then((res) => {
        console.log("success here in update flight");
        alert("Successfully updated the flight close to return to staff panel");
      });
  };

  const handleOriginChange = (e) => {
    setOriginCountry(e.target.value);
    console.log(`new value for origin ${originCountry}`);
  };

  const handleDestChange = (e) => {
    setDestCountry(e.target.value);
    console.log(`new value for origin ${destCountry}`);
  };

  const handleDeprtChange = (e) => {
    setDeparture(e.target.value);
    console.log(`new value for origin ${departure}`);
  };

  const handleLandingChange = (e) => {
    setLanding(e.target.value);
    console.log(`new value for origin ${landing}`);
  };

  const handleTicketsChange = (e) => {
    setTickets(e.target.value);
    console.log(`new value for origin ${tickets}`);
  };

  const destCountryOptions = props.filteredCountries.map((cnt) => {
    if (cnt !== destCountry)
      return (
        <option value={cnt} key={cnt}>
          {cnt}
        </option>
      );
  });

  const originCountryOptions = props.filteredCountries.map((cnt) => {
    if (cnt !== originCountry)
      return (
        <option value={cnt} key={cnt}>
          {cnt}
        </option>
      );
  });

  return (
    <div className='modal'>
      <div className='modal'>
        <div className='overlay'></div>
        <div className='modal-content'>
          <Form onSubmit={handleEditFlightSubmit}>
            <div className='control-group'>
              <div className='form-control'>
                <label>Origin country</label>
                <select
                  style={{ textAlign: "center" }}
                  className='form-control'
                  required={true}
                  onChange={handleOriginChange}
                  value={originCountry}>
                  <option defaultValue={originCountry}>{originCountry}</option>
                  {originCountryOptions}
                </select>
              </div>
            </div>

            <div className='form-control'>
              <label>Destination country</label>
              <select
                style={{ textAlign: "center" }}
                className='form-control'
                required={true}
                onChange={handleDestChange}
                value={destCountry}>
                <option defaultValue={destCountry}>{destCountry}</option>

                {destCountryOptions}
              </select>
            </div>

            <div className='form-control'>
              <label>Departure time</label>
              <input
                type='datetime-local'
                min='2022-09-08'
                onChange={handleDeprtChange}
                value={departure}
              />
            </div>

            <div className='form-control'>
              <label>Landing time</label>
              <input
                type='datetime-local'
                min='2022-09-08'
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
              <button>Submit</button>
            </div>
          </Form>

          <Link to='/Staff' className='close-modal'>
            CLOSE
          </Link>
        </div>
      </div>
    </div>
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

export default EditFlight;
