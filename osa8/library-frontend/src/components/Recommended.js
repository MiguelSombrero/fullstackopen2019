import React from 'react'

const Recommended = ({ show, books, user }) => {

  if (!show || books.loading || !user ) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        books on your favorite genre {user.favoriteGenre}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
  )
}

export default Recommended