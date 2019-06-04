import React from 'react'

const Number = (props) => (
    <div>
        {props.person.name} {props.person.number}
        <button onClick={props.delete} >Delete</button>
    </div>
)

export default Number