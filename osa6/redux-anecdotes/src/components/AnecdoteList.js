import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/messageReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const sorter = (a, b) => b.votes - a.votes
  
  const vote = (anecdote) => {
    props.voteFor(anecdote)
    props.setMessage(`you voted '${anecdote.content}'`, 3)
  }

  return (
    <div>
      {props.visibleAnecdotes.sort(sorter).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteFor, setMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)