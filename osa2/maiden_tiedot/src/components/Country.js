import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from "./Weather"

const Country = ( {country} ) => {
    const [ weather, setWeather] = useState({})
    const [ icon, setIcon] = useState({})

    useEffect(() => {
        axios
          .get(`http://api.apixu.com/v1/current.json?key=c34b1f1c71824a03add143213193105&q=${country.capital}`)
          .then(response => {
            setWeather(response.data.current)
            setIcon(response.data.current.condition.icon)
        })
    }, [country.capital])
    
    return (
      <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>Languages</h3>
        <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} height="120" width="180" alt='no flag available' ></img>
        <h2>Weather in {country.capital}</h2>
        <Weather weather={weather} icon={icon} />
      </div>
    )
}

export default Country