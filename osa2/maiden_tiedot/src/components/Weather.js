import React from 'react'

const Weather = (props) => (
    <div>
        <p>Temperature: {props.weather.temp_c} Celsius</p>
        <img src={props.icon} alt="no icon available" ></img>
        <p>Wind: {props.weather.wind_kph} kph, direction {props.weather.wind_dir}</p>
    </div>
)
    
export default Weather