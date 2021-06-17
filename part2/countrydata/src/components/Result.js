import React from 'react'
import Data from './Data'
import Name from './Name'

const Result = ({ countriesToShow, find, api_key }) => {

    if (find === '') {
      return (<div></div>)
    } else if(countriesToShow.length > 10) {
      return (
        <div>
          Too many matches, specift another filter
        </div>
      )
    } else if(countriesToShow.length < 11 && countriesToShow.length !== 1) {
      return (
        <div>
          <ul>
            {countriesToShow.map(name =>
                    <Name key={name.name} name={name} api_key={api_key}/> 
                    )}  
          </ul>
        </div>
      )
    } else if(countriesToShow.length === 1) {
      return (
        <div>
            {countriesToShow.map(name =>
                    <Data key={name.name} name={name} api_key={api_key}/>
                    )} 
        </div>
      )
    } 
  }

export default Result
