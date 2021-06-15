import React from 'react'
import Entry from './entry'

const Names = ({ namesToShow }) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {namesToShow.map(name =>
                <Entry key={name.content} name={name}/>
                )}
            </ul>
        </div>
      
    
    )
}

export default Names