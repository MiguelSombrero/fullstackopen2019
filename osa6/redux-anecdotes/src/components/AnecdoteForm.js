import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setMessage, clearMessage } from '../reducers/messageReducer'

const AnecdoteForm = ({ store }) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    store.dispatch(createAnecdote(content))
    store.dispatch(setMessage(`added anecdote '${content}'`))
    
    event.target.content.value = ''

    setTimeout(() => {
      store.dispatch(clearMessage())
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

export default AnecdoteForm