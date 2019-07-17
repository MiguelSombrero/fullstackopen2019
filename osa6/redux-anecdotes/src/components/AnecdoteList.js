import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { setMessage, clearMessage } from '../reducers/messageReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState().anecdotes
  const sorter = (a, b) => b.votes - a.votes
  
  const vote = (id, content) => {
    props.store.dispatch(voteFor(id))
    props.store.dispatch(setMessage(`you voted '${content}'`))
    
    setTimeout(() => {
      props.store.dispatch(clearMessage())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.sort(sorter).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList