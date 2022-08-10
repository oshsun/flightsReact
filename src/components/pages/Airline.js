import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';


function Airline () {

    const [aName, setAName] = useState("")
    const [country_id, setCountry_id] = useState("")


    const update_airline=async (id)=>{
        
        await axios.patch(`http://127.0.0.1:8000/updateairline/${id}`, {

                
            aName: aName,
            country_id: country_id
          })
   
          console.log("aaaaaaaa")
    }


    // const upd = (id) => {
    //     const student = { fname: fname, email: email };
    //     console.log(id)
    //     axios.put(`${SERVER_URL}/${id}`, student)
    //   .then((response) => { console.log(response.data); });
    //   show()
    // }



  return (
    <div>Airline
        fill to apdate:
        <input value={aName} onChange={(e)=>setAName(e.target.value)}/>
                 <input value={country_id} onChange={(e)=>setCountry_id(e.target.value)}/>
                 <button onClick={() => update_airline()}>Update Airline</button>





    </div>
  )
}

export default Airline