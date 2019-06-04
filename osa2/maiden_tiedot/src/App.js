import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter'
import Content from "./components/Content"

function App() {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = countries
    .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div >
      <Filter filter={filter} onChange={handleFilterChange} />
      <Content countries={countriesToShow} onChange={handleFilterChange} />
    </div>
  );
}

export default App;
