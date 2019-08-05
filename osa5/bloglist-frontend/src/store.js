import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { notificationReducer } from './reducers/notificationReducer'
import { blogReducer } from './reducers/blogReducers'
import { userReducer } from './reducers/userReducer'
import { loginReducer } from './reducers/loginReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: loginReducer,
  users: userReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk))

export default store