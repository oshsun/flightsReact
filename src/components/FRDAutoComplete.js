import axios from "axios";
import React, { useEffect, useState } from "react";
import "./FRDAutoComplete.css";

const FRDAutoComplete = ({ setText, text, placeholder, label, className }) => {
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    get_countries();
  }, []);

  const get_countries = () => {
    axios
      .get("http://127.0.0.1:8000/countries")
      .then((res) => {
        const countries = res.data.map((country) => {
          return country.name;
        });
        console.log(countries);
        setData(countries);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    console.log(value);
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      setSuggestions(() => data.sort().filter((v) => regex.test(v)));
    } else {
      setSuggestions([]);
    }
  };

  function suggestionSelected(value) {
    setText(value);
    setSuggestions([]);
    console.log(`New State for the inserted prop ${value}`);
  }

  function renderSuggestions() {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div>
        <ul>
          {suggestions.map((country) => (
            <li
              onClick={() => suggestionSelected(country)}
              key={country}
              style={{ display: "flex" }}>
              {country}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <label>{label}</label>
      <input
        value={text}
        onChange={onTextChange}
        type='text'
        placeholder={placeholder}
      />
      {renderSuggestions()}
    </div>
  );
};

export default FRDAutoComplete;
