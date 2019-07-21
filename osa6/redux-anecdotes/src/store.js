import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  message: messageReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk))

export default store