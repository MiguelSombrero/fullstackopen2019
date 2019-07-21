import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/messageReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.setMessage(`added anecdote '${content}'`, 3)
    props.createAnecdote(content)
  }
    
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote} >
        <div><input name="content" /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote, setMessage
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)