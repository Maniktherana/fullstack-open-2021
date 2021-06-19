import React from 'react'
import Entry from './entry'

const Names = ({ namesToShow, remove }) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {namesToShow.map(name =>
                <Entry key={name.name} name={name} remove={remove}/>
                )}
            </ul>
        </div>
    )
}

export default Names