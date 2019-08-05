import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {
  if (!props.users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <table >
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
          {props.users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)
