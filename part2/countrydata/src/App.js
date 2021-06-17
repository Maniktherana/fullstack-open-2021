import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Result from './components/Result'

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
