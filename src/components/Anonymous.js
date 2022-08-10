import React from 'react';
import {useState } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';

function Anonymous () {

     
    const [uname, setUname] = useState("")
    const [password, setPassword] = useState("")


       
        const login = async () => {
            let myData ={
                username: uname,
                password: password
            }
            let response = await axios.post("http://127.0.0.1:8000/login",myData)
            let data = await response.data;
            if (response.status === 200){ 
                console.log(jwt_decode(data.access));
                console.log("yeyyyyy");
                localStorage.setItem("token", JSON.stringify(data));
                console.log(data);
            }else{ 
               console.log("something wend wrong");
            }
        };
            // } else {
            //     alert("Something went wrong!");
       



  return (
    <div>Anonymous
                 <input value={uname} onChange={(e)=>setUname(e.target.value)}/>
                 <input value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={() => login()}>Login</button>

                {/* <h3>hello {$token[username]}</h3> */}



    </div>
  )
}

export default Anonymous