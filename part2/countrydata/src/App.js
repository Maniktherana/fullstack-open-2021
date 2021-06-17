import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Data = ({ name }) => {
  return (
    <li>{name.name}</li>
  )
}

const App = () => {
  
  const [countries, setCountries] = useState([])
  const [find, setFind] = useState('')
  const [result, setResult] = useState([])

  const countriesToShow = countries

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
  console.log(countriesToShow)

  const handleFindChange = (event) => {
    setFind(event.target.value)
    console.log(find)
  }

  return (
    <div>
      find countries: <input
          value={find}
          onChange={handleFindChange}/>
      <div>
        <ul>
          {countriesToShow.map(name =>
                <Data key={name.alpha3code} name={name}/>
                )}
        </ul>
      </div>
    </div>
  )
}

export default App
