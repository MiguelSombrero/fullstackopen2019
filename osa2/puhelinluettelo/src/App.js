import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Number from './components/Number'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState ('')
  const [ filter, setFilter] = useState('')
  const [ errorMessage, setErrorMessage]  = useState(null)
  const [ style, setStyle ] = useState('')

  useEffect (() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    const personTochange = persons.find(person => person.name === newName)
    
    if (persons.includes(personTochange)) {
      if (window.confirm(`${newName} on jo luettelossa, haluatko päivittää numeron?`)) {
        const changedPerson = { ...personTochange, number: newNumber}

        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson))
            setStyle("success")
            setErrorMessage(`Numero päivitetty onnistuneesti henkilölle ${returnedPerson.name}!`)
            
          })
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      
      personService
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setStyle("success")
          setErrorMessage(`Numero lisätty onnistuneesti henkilölle ${newPerson.name}!`)
          
        })
        .catch(error => {
          setStyle('error')
          setErrorMessage(`${error.response.data.error}`)
        })
    }
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
    setNewName('')
    setNewNumber('')
  }

  const deleteNumber = (id, name) => {
    if (window.confirm(`Haluatko poistaa käyttäjän? ${name}`)) {
      
      personService
        .remove(id)
        .then(removedPerson => {
          setPersons(persons.filter(person => person.id !== id))
          setStyle("success")
          setErrorMessage(`Numero poistettu onnistuneesti henkilöltä ${name}!`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
        .catch(error => {
          setStyle("error")
          setErrorMessage(`Seems like person ${name} has allready removed`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const numbers = () => persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person =>
      <Number
        key={person.id}
        person={person}
        delete={() => deleteNumber(person.id, person.name)}
      />
  )

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Filter
        value={filter} 
        onChange={handleFilterChange}
      />

      <h2>Lisää uusi</h2>
      
      <Notification message={errorMessage} style={style} />

      <PersonForm
        onSubmit={addNumber}
        nameValue={newName} 
        handleNameChange={handleNameChange}
        numberValue={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numerot</h2>
      <div>
        {numbers()}
      </div>
    </div>
  )

}

export default App