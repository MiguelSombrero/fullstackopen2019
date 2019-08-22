import React, { useState } from 'react'

const Books = ({ show, result }) => {
  const [filter, setFilter] = useState('')

  if (!show || result.loading ) {
    return null
  }

  const books = result.data.allBooks

  const booksToShow = () => 
    filter.length < 1
    ? books
    : books.filter(book => book.genres.includes(filter))
  
  const uniqueGenres = () => {
    const genres = books.map(book => book.genres).flat()
    return [ ...new Set(genres) ]
  }
  
  return (
    <div>
      <h2>books</h2>
      {filter.length > 0 &&
      <div>
        in genre {filter}
      </div>
      }
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
      <div>
        {uniqueGenres().map(genre =>
          <button key={genre} onClick={() => setFilter(genre)}>{genre}</button> )
        }
         <button onClick={() => setFilter('')}>all books</button> 
      </div>
    </div>
  )
}

export default Books