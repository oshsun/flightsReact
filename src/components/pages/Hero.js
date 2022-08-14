import Section from '../UI/Section';
import React from 'react'
import homeImage from "../../assets/hero.png";
import HeroSearch from './HeroSearch';
import axios from "axios";
import { useEffect, useState } from "react";


const Hero = (props) => {
  const [data, setData] = useState(props.data);
  const [value, setValue] = useState("");

  const get_data = () => {
    axios
      .get("http://127.0.0.1:8000/countries")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    get_data();
  }, []);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
    return searchTerm;
  };

  return (
    <Section id="hero">
        <div className="background">
          <img src={homeImage} alt="" />
        </div>
        <div className="content">
          <div className="title">
            <h1>TRAVEL TO EXPLORE</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              natus, enim ipsam magnam odit deserunt itaque? Minima earum velit
              tenetur!
            </p>
          </div>
          <div className="search">
            <div className="container">
              <label htmlFor="">Where you want to go</label>
              <input type="text" placeholder="Search Your location" />
            </div>
            <div className="container">
              <label htmlFor="">Check-in</label>
              <input type="date" />
            </div>
            <div className="container">
              <label htmlFor="">Check-out</label>
              <input type="date" />
            </div>
            <button>Explore Now</button>
          </div>
        </div>
      </Section>
    );
  }
  
  export default Hero