import React from 'react'

const Entry = ({ name, remove }) => {
    return (
      <div>
          <li>{name.name} {name.number} <button onClick={() => remove(name.id, name.name)}>Delete</button></li> 
      </div>
      )
}

export default Entry