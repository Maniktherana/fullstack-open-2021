import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Names from './components/names'
import Form from './components/form'
import Filter from './components/filter'

const App = () => {

  const [namers, setNamers] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [exists, setExists] = useState(false)
  const [filter, setFilter] = useState('')

  const namesToShow = namers.filter(name => name.name.toLowerCase().includes(filter))

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setNamers(response.data)
      })
  }, [])
  console.log(namers)

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(exists)
    if (exists) {
      alert(`${newName} has already been added to phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        console.log(response)
      })

      setNamers(namers.concat(nameObject))
      setNewNumber('')
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    doesNameExist(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const doesNameExist = (txt) => {
    let tempState = false
    namers.forEach(element => {
      if(element.name === txt) {
        tempState = true
      }
    })
    setExists(tempState)
  }
  
  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      
      <Form onSubmit={addName} newName={newName} newNumber={newNumber} 
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <Names namesToShow={namesToShow}/>
    </div>
  )
}

export default App