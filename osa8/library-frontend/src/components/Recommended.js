import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const LOGGED_USER = gql`
{
  me {
    username
    favoriteGenre
  }
}
`

const ALL_BOOKS_BY_GENRE = gql`
  query allBooksByGenre($genre: String!) {
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

const Recommended = ({ show, result }) => {
  const client = useApolloClient()
  const [user, setUser] = useState('')
  const [usersBooks, setUsersBooks] = useState([])
  
  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    fetchUsersBooks()
  }, [result, user])

  const fetchUser = async () => {
    const { data } = await client.query({
      query: LOGGED_USER
    })
    setUser(data.me)
  }

  const fetchUsersBooks = async () => {
    const { data } = await client.query({
      query: ALL_BOOKS_BY_GENRE,
      variables: { genre: user ? user.favoriteGenre : '' }
    })
    setUsersBooks(data.allBooks)
  }

  if (!show || result.loading || !user ) {
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
          {usersBooks.map(a =>
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