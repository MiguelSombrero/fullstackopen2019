import React from 'react'

const Input = (props) => (
    <div>
        {props.name}
        <input
        type="text"
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        />
    </div>
)

export default Input