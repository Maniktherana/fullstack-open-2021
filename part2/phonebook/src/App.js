import React, { useState } from 'react'

const Name = ({ name }) => {
  return (
    <li>{name.content} {name.number}</li>
  )
}

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
      <div>
        filter shown with: <input
          value={filter}
          onChange={handleFilterChange}/>
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
           value={newName}
           onChange={handleNameChange}/>
        </div>
        <div>
          number: <input
           value={newNumber}
           onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {namesToShow.map(name =>
          <Name key={name.content} name={name}/>
        )}
      </ul>
      {/* <div>
        debug: Name=<strong>{newName}</strong>,
        exists=<strong>{exists.toString()}</strong>,
        filter=<strong>{filter}</strong>,
        
      </div> */}
    </div>
  )
}

export default App