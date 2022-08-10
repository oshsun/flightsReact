import React from 'react';
import { RiCustomerService2Full, RiCustomerService2Fill } from 'react-icons/ri';

import axios from 'axios';
import { useEffect, useState } from 'react';
import './Search.css';




const Search = () => {

  const [countries, setCountries] = useState([])
  const [flightByParam, setFlightByParam] = useState([])
  const [destination_country_id, setdestination_country_id] = useState("")
  const [origin_country_id, setorigin_country_id] = useState("")
  const [date, setdate] = useState("")
  const [flightsByCountry, setFlightsByCountry] = useState([])
  // const [dCountry, setdCountry] = useState("")

  const destination_contry_change_handler = (value) => {
    setdestination_country_id(value)
  }

  const origin_contry_change_handler = (value) => {
    setorigin_country_id(value)
  }

  const get_flights_by_country = (id) => {
    // preventDefault()
    console.log(countries[id].id)
    axios.post('http://127.0.0.1:8000/getflightsbycountry',{
      destination_country_id:countries[id].id})
      .then((res) => {
        setFlightsByCountry(res.data)
            console.log(res.data);
          }).catch((err) => {
            console.log(err)
          })
        }


  useEffect(() => {
    get_countries()
  }, [])



  const get_countries = () => {
    axios.get('http://127.0.0.1:8000/countries').then((res) => {
      setCountries(res.data)
      console.log(res.data);
    }).catch((err) => {
      console.log(err)
    })
  }


  const get_flights_by_parameters = (event) => {
    event.preventDefault()
    axios.post('http://127.0.0.1:8000/getflightsbyparam', {
      origin_country_id: origin_country_id,
      destination_country_id: destination_country_id,
      date: date
    })
      .then((res) => {
        setFlightByParam(res.data)
        console.log(res.data);
      }).catch((err) => {
        console.log(err)
      })
    }
    // {`/uploads/${img.img.path}`}
return (
    <div>
       <div className="destinations">
          {countries.map((dCountry, ind) => 
            <div onDoubleClick={()=> get_flights_by_country(ind)} className="destination">
              <img src={'https://studentaffairs.duke.edu/sites/default/files/2021-01/israeli%20flag.jpg'} alt="111" />
              <h3>{dCountry.name}</h3>
              <p>{dCountry.name}</p>
              <p>{ind}</p>
            </div>
                  )}
     </div>
       <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-4 px-4 py-16'>
         <div className='lg:col-span-2 flex flex-col justify-evenly'>


           <form className='w-full'>
             <div className='flex flex-col my-2'>
               <h3>i want to fly</h3>
               <label>from</label>
               <select name="origin" onChange={(e) => origin_contry_change_handler(e.target.value)} className='border rounded-md p-2'>
                 {countries.map((country, ind) =>
                  (<option value={country.id} key={ind}>{country.name} </option>))}

              </select>
            </div>
            <div className='flex flex-col my-2'>

              <label>to</label>
              <select name="destination" onChange={(e) => destination_contry_change_handler(e.target.value)} className='border rounded-md p-2'>
                {countries.map((country, ind) =>
                  (<option value={country.id} key={ind}>{country.name} </option>))}

              </select>
            </div>
            <div className='flex flex-col my-4'>
              <label>on</label>
              <input onChange={(e) => setdate(e.target.value)} name={date} className='border rounded-md p-2' type="date" />
            </div>
            <button onClick={(event) => get_flights_by_parameters(event)} className='w-full my-4'>find me a flight</button>
          </form>
          <div>
          {flightByParam.map((flight, ind) =>
            (<h4>{flight.origin_country_id} {flight.destination_country_id}{flight.departure_time} {flight.landing_time} {flight.airline_company_id}</h4>))}
          </div>
          <div>
          {flightsByCountry.map((flight, ind) =>
            (<h4>{flight.origin_country_id} {flight.destination_country_id}{flight.departure_time} {flight.landing_time} {flight.airline_company_id}</h4>))}
          </div>
       </div>
      </div>
    </div>
  )
}
export default Search