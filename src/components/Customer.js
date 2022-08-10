import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

function Customer() {

  const [flight_id, setflight_id] = useState("")
  const [customer_id, setcustomer_id] = useState("")


  const add_ticket = () => {
    const ticket = { flight_id: flight_id, customer_id: customer_id };
    axios.post('http://127.0.0.1:8000/addticket', ticket)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))

  }



  return (
    <div>Customer

      <input value={flight_id} onChange={(e) => setflight_id(e.target.value)}/>
      <input value={customer_id} onChange={(e) => setcustomer_id(e.target.value)} />
      <button onClick={() => add_ticket()}>Book a flight</button>


    </div>
  )
}

export default Customer