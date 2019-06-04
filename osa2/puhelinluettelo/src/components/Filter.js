import React from 'react'

const Filter = (props) => (
    <div>
        Rajaa: <input value={props.filter} onChange={props.onChange}  />
    </div>
  )
  
export default Filter