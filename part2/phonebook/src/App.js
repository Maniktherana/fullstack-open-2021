import React, { useState, useEffect } from 'react'
import Names from './components/names'
import Form from './components/form'
import Filter from './components/filter'
import personService from './services/persons'


const App = () => {

  const [namers, setNamers] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [exists, setExists] = useState(false)
  const [filter, setFilter] = useState('')

  const namesToShow = namers.filter(name => name.name.toLowerCase().includes(filter))

  useEffect(() => {
    personService
    .getAll()
    .then(initialNames => {
      setNamers(initialNames)
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
      personService
      .create(nameObject)
      .then(returnedName => {
        setNamers(namers.concat(returnedName))
        setNewNumber('')
        setNewName('')
      })
    }
  }

  const remove = (id, name) => {
    if ( window.confirm(`Delete ${name}?`)) {
      personService
    .deleteContent(id)
    setNamers(namers.filter(person => person.id !== id))
    console.log(`deleted ${id}`)
    } else {
      return
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

      <Names namesToShow={namesToShow} remove={remove}/>
    </div>
  )
}

export default App