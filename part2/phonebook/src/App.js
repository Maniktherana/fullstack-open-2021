import React, { useState } from 'react'

const Name = ({ name }) => {
  return (
    <li>{name.content}</li>
  )
}

const App = (props) => {
  const [names, setNames] = useState(props.names) 
  const [newName, setNewName] = useState('')
  const [exists, setExists] = useState(false)

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(exists)
    if (exists) {
      alert(`${newName} has already been added to phonebook`)
    } else {
      const nameObject = {
        content: newName,
      }
    
      setNames(names.concat(nameObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
    doesNameExist(event.target.value)
  }

  const doesNameExist = (txt) => {
    let tempState = false
    names.forEach(element => {
      // console.log(element.content)
      if(element.content === txt) {
        tempState = true
      }
    })
    setExists(tempState)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
           value={newName}
           onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {names.map(name =>
          <Name key={name.content} name={name}/>
        )}
      </ul>
      <div>debug: neName=<strong>{newName}</strong>,
       exists=<strong>{exists.toString()}</strong></div>
    </div>
  )
}

export default App