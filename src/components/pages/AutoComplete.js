import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AutoComplete(props) {
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
    <div className='App'>
      <h1>Search</h1>

      <div className='search-container'>
        <div className='search-inner'>
          <input type='text' value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}> Search </button>
        </div>
        <div className='dropdown'>
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item.name)}
                className='dropdown-row'
                value={value}
                key={item.name}>
                {item.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
