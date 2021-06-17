import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Result = ({ countriesToShow, find, api_key }) => {

  if (find === '') {
    return (<div></div>)
  } else if(countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specift another filter
      </div>
    )
  } else if(countriesToShow.length < 11 && countriesToShow.length !== 1) {
    return (
      <div>
        <ul>
          {countriesToShow.map(name =>
                  <Name key={name.name} name={name} api_key={api_key}/> 
                  )}  
        </ul>
      </div>
    )
  } else if(countriesToShow.length === 1) {
    return (
      <div>
          {countriesToShow.map(name =>
                  <Data key={name.name} name={name} api_key={api_key}/>
                  )} 
      </div>
    )
  } 
}

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

const Name = ({ name, api_key }) => {
  
  const [show, setShow] = useState(false)
  
  const handleShowChange = () => {
    setShow(!show)
  }

  if (show) {
    return (
      <div>
      <Data name={name} api_key={api_key}/>
      <button onClick={handleShowChange}>hide</button>
      </div>
    )
  } else {
    return (
      <div>{name.name} <button onClick={handleShowChange}>show</button></div>
    )
  }
}

const App = () => {

  const api_key = process.env.REACT_APP_API_KEY
  // variable api_key has now the value set in startup
  
  const [countries, setCountries] = useState([])
  const [find, setFind] = useState('')

  const countriesToShow = countries.filter(name => name.name.toLowerCase().includes(find.toLowerCase()))

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleFindChange = (event) => {
    setFind(event.target.value)
  }

  return (
    <div>
      <div>
        find countries: <input
            value={find}
            onChange={handleFindChange}/>
      </div>
      
      <Result countriesToShow={countriesToShow} find={find} api_key={api_key}/>
    </div>
  )
}

export default App
