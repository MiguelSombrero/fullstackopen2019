import React from 'react'

const Recommended = ({ show, result, user }) => {
  if (!show || user.loading || result.loading) {
    return null
  }

  const books = result.data.allBooks
  const me = user.data.me

  const booksToShow = () => 
    books.filter(book => book.genres.includes(me.favoriteGenre))
  
  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        books on your favorite genre {me.favoriteGenre}
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
          {booksToShow().map(a =>
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