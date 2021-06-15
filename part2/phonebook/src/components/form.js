import React from 'react'

const Form = ({ onSubmit, newName, newNumber, handleNameChange, handleNumberChange}) => {
    
    return (
        <div>
            <h2>Add a new</h2>
            <form onSubmit={onSubmit}>
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
        </div>
        
    )
}

export default Form