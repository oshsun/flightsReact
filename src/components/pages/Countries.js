import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from "styled-components";


const Countries = () => {
    
    const [countries, setCountries] = useState([])

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

  return (
    <div>
      <Section id="recommend">
      <div className="destinations">
        {countries.map((country) => {
          return (
            <div className="destination" key={country.id}>
              <img src="https://cdn.mos.cms.futurecdn.net/pD3bsKPrjsqNiFDGRL5oq6.jpg" alt="" />
              <h3>{country.name}</h3>
              <p>description</p>
              <div className="info">
           
                <h4>my price</h4>
              </div>
              <div className="distance">
                <span>1000 Kms</span>
                <span>testing</span>
              </div>
            </div>
          );
        })}
      </div>
      </Section>


    </div>
  )
}

export default Countries


const Section = styled.section`
  padding: 2rem 0;
  .title {
    text-align: center;
  }
  .packages {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    ul {
      display: flex;
      list-style-type: none;
      width: max-content;
      li {
        padding: 1rem 2rem;
        border-bottom: 0.1rem solid black;
      }
      .active {
        border-bottom: 0.5rem solid #8338ec;
      }
    }
  }
  .destinations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 0 3rem;
    .destination {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background-color: #8338ec14;
      border-radius: 1rem;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      img {
        width: 100%;
      }
      .info {
        display: flex;
        align-items: center;
        .services {
          display: flex;
          gap: 0.3rem;
          img {
            border-radius: 1rem;
            background-color: #4d2ddb84;
            width: 2rem;
            /* padding: 1rem; */
            padding: 0.3rem 0.4rem;
          }
        }
        display: flex;
        justify-content: space-between;
      }
      .distance {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {

    .destinations {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
`;
