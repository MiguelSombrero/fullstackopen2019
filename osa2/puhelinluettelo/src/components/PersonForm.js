import React from 'react'

const PersonForm = (props) => (
    <form onSubmit={props.onSubmit} >
      <div>
        nimi: <input value={props.nameValue} onChange={props.handleNameChange} />
      </div>
      <div>
        Numero: <input value={props.numberValue} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
)

export default PersonForm