import React, { useState } from 'react'
import Names from './components/names'
import Form from './components/form'
import Filter from './components/filter'

const App = (props) => {
  const [names, setNames] = useState(props.names) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [exists, setExists] = useState(false)
  const [filter, setFilter] = useState('')

  const namesToShow = names.filter(name => name.content.toLowerCase().includes(filter))

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(exists)
    if (exists) {
      alert(`${newName} has already been added to phonebook`)
    } else {
      const nameObject = {
        content: newName,
        number: newNumber
      }
    
      setNames(names.concat(nameObject))
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
    names.forEach(element => {
      if(element.content === txt) {
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