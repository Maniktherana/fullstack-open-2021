import React from 'react'

const Entry = ({ name }) => {
    return (
        <li>{name.name} {name.number}</li>
      )
}

export default Entry