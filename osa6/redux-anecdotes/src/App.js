import React from 'react';
import { voteFor, createAnecdote } from './reducers/anecdoteReducer';

const App = (props) => {
  const anecdotes = props.store.getState()
  const sorter = (a, b) => b.votes - a.votes
  
  const vote = (id) => {
    props.store.dispatch(voteFor(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    props.store.dispatch(createAnecdote(event.target.content.value))
    event.target.content.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(sorter).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote} >
        <div><input name="content" /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App