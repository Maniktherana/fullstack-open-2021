import React, { useState, useEffect } from 'react'

const Data = ({ name, api_key }) => {

    const [weather, setWeather] = useState(null)
    const axios = require('axios')
    const params = {
      access_key: api_key,
      query: name.name
    }
  
    const hook = () => {
      axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
          if (!response.data.error) {
              const apiResponse = response.data
              setWeather(apiResponse)
              console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`)
          } else {
              console.log(`Response error: code: ${response.data.error.code}, info: ${response.data.error.info}`)
          }
      }).catch(error => {
          console.error("An error occurred: ", error)
      })
    }
    useEffect(hook, [])
  
    return (
      <div>
        <h1>{name.name}</h1>
        <div>capital: {name.capital}</div>
        <div>population: {name.population}</div>
        <h2>Languages</h2>
        <ul>
          {name.languages.map(lang =>
                  <Langauges key={lang.name} lang={lang}/>)}
        </ul>
        <img src={name.flag} alt={`${name.name} flag`} width="200" height="100"></img>
        <h2>Weather in {name.capital}</h2>
        <p><strong>temperature:</strong> {weather && weather.current.temperature}°C</p>
        <img src={weather && weather.current.weather_icons} alt='temperature icon'></img>
        <p><strong>wind:</strong> {weather && weather.current.wind_speed}mph direction {weather && weather.current.wind_dir}</p>
      </div>
    )
  }

  const Langauges = ({ lang }) => {
    return (
      <li>{lang.name}</li>
    )
  }

export default Data
