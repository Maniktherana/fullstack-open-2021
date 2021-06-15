import React from 'react'

const Entry = ({ name }) => {
    return (
        <li>{name.content} {name.number}</li>
      )
}

export default Entry