import React, { useState } from 'react'

const Books = ({ show, result }) => {
  const [filter, setFilter] = useState('')
  if (!show || result.loading) {
    return null
  }

  const books = result.data.allBooks

  const booksToShow = () => 
    filter.length < 1
    ? books
    : books.filter(book => book.genres.includes(filter))
  
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
        <button onClick={() => setFilter('')}>all books</button>
        <button onClick={() => setFilter('refactoring')}>refactoring</button>
        <button onClick={() => setFilter('agile')}>agile</button>
        <button onClick={() => setFilter('patterns')}>patterns</button>
        <button onClick={() => setFilter('design')}>design</button>
        <button onClick={() => setFilter('war')}>war</button>
      </div>
    </div>
  )
}

export default Books