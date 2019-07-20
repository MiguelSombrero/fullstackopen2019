import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setMessage, clearMessage } from '../reducers/messageReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    props.createAnecdote(content)
    props.setMessage(`added anecdote '${content}'`)
    
    event.target.content.value = ''

    setTimeout(() => {
      props.clearMessage()
    }, 5000)
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
  createAnecdote, setMessage, clearMessage
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)