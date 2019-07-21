import anecdoteSercive from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const anecdoteToChange = state.find(a => a.id === action.data.id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return state.map(a => a.id !== action.data.id ? a : changedAnecdote)
    
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

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    data: { id }
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