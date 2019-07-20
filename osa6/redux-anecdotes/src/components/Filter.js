import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={(event) =>
        props.filterChange(event.target.value)} />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange
}

export default connect(null, mapDispatchToProps)(Filter)