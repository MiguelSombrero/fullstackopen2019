import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'

const LOGGED_USER = gql`
{
  me {
    username
    favoriteGenre
  }
}
`

const ALL_BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

const Recommended = ({ show, query }) => {
  const [books, setBooks] = useState([])
  const [user, setUser] = useState('')

  const client = useApolloClient()

  console.log(books)
  console.log(user)

  const fetchUser = async () => {
    const { data } = await client.query({
      query: LOGGED_USER,
    })
    setUser(data.me)
  }

  const fetchBooks = async () => {
    const { data } = await client.query({
      query: ALL_BOOKS_BY_GENRE,
      variables: { genre: user.favoriteGenre || '' },
      update: (store, response) => {
      const dataInStore = store.readQuery({ query })
      dataInStore.allBooks.push(response.data.addBook)
      store.writeQuery({
        query,
        data: dataInStore
      })
    }
    })
    setBooks(data.allBooks)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    fetchBooks()
  }, [books])

  if (!show || !user || !books) {
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
          {books.map(a =>
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