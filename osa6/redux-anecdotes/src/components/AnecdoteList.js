import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { setMessage, clearMessage } from '../reducers/messageReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const sorter = (a, b) => b.votes - a.votes
  
  const vote = (id, content) => {
    props.voteFor(id)
    props.setMessage(`you voted '${content}'`)
    
    setTimeout(() => {
      props.clearMessage()
    }, 5000)
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
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
  voteFor, setMessage, clearMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)