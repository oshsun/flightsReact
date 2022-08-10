import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
function Base() {

    const [airlines, setAirlines] = useState([])

    useEffect(() => {
        console.log("call the server")
        get_airlines()
    }, [])


    const get_airlines = () => {
        axios.get('http://127.0.0.1:8000/airlines').then(response => setAirlines(response.data));
    }



  return (
    <div>Base
        {airlines.map((airline, ind) => <div key={ind}>
                {airline.name}
                
                {/* <button onClick={() => data_delete( stud.id )}>Delete</button>
                <button onClick={() => upd( stud.id )}>Update</button> */}
            </div>)}

        
<button></button>



    </div>
  )
}

export default Base