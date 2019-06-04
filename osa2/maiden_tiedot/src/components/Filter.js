import React from 'react'

const Filter = (props) => {
    return (
      <div>
        Filter: <input value={props.filter} onChange={props.onChange} ></input>
      </div>
    )
}

export default Filter