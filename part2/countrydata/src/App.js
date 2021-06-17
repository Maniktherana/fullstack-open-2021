import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Result = ({ countriesToShow, find }) => {
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
                  <Name key={name.name} name={name}/>
                  )}
        </ul>
      </div>
    )
  } else if(countriesToShow.length === 1) {
    return (
      <div>
          {countriesToShow.map(name =>
                  <Data key={name.name} name={name}/>
                  )}
      </div>
    )
  } 
}

const Data = ({ name }) => {
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
      <img src={name.flag} alt={`${name.name} flag`}></img>
    </div>
  )
}

const Langauges = ({ lang }) => {
  return (
    <li>{lang.name}</li>
  )
}

const Name = ({ name }) => {
  return (
    <div>{name.name}</div>
  )
}

const App = () => {
  
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
    console.log(find)
  }

  console.log(countriesToShow)

  return (
    <div>
      <div>
        find countries: <input
            value={find}
            onChange={handleFindChange}/>
      </div>
      
      <Result countriesToShow={countriesToShow} find={find}/>
    </div>
  )
}

export default App
