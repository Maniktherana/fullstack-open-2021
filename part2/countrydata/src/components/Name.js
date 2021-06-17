import React, { useState } from 'react'
import Data from './Data'

const Name = ({ name, api_key }) => {
  
    const [show, setShow] = useState(false)
    
    const handleShowChange = () => {
      setShow(!show)
    }
  
    if (show) {
      return (
        <div>
        <Data name={name} api_key={api_key}/>
        <button onClick={handleShowChange}>hide</button>
        </div>
      )
    } else {
      return (
        <div>{name.name} <button onClick={handleShowChange}>show</button></div>
      )
    }
  }

export default Name