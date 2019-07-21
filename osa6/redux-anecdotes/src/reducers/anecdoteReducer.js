import anecdoteSercive from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote =>
        anecdote.id !== action.data.updatedAnecdote.id ? anecdote : action.data.updatedAnecdote)
    
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    
    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteSercive.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteFor = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteSercive
      .update(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
    
      dispatch({
      type: 'VOTE',
      data: { updatedAnecdote }
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteSercive.create(content)
    dispatch({
    type: 'NEW_ANECDOTE',
    data: newAnecdote
    })
  }
}

export default reducer