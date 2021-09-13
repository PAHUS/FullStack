import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonList from './components/PersonList'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ msg, setMsg] = useState(null)
  const [col, setCol] = useState('red')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(res => setPersons(res))
  }, [])


  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleChange2 = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }
  const handleDelete = (id) => {
    console.log('deleting entry ' + id)
    if (window.confirm("Do you really wish to delete entry?")) {
      personService
      .deleteEntry(id)
      .then(response => setPersons(persons.filter(per => per.id !== id)))
    }
  }
  const handleChange3 = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const submit = (event) => {
    event.preventDefault()
    console.log('Includes ', persons.some(field =>field.name === newName))

    if (persons.some(field => field.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, do you wish to change their phonenumber?`)) {
        const person = persons.find(n => n.name === newName)
        const id = person.id
        const newPerson = {...person, number: newNum}
        personService
          .update(id, newPerson)
          .then(response => setPersons(persons.map(person => person.id === id ? response : person)))
          .catch(error => {
            setCol('red')
            setMsg(`${person.name} has already been removed from the server `)
            setTimeout(() => setMsg(null), 4000)
          })

      }
      setNewName('')
      setNewNum('')
    } else {
      console.log('submitting', newName)
      const personObject = {name: newName, number: newNum}
      personService
        .create(personObject)
        .then(resp => {
          setPersons(persons.concat(resp))
          setCol('green')
          setMsg(`${resp.name} added succesfully`)
          
          setTimeout(() => setMsg(null), 4000)
        })
        .catch(error => {
          console.log(error.response.data)
          setCol('red')
          setMsg(error.response.data)
          setTimeout(() => setMsg(null), 4000)
          
        })
      setNewName('')
      setNewNum('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={msg} color={col}/>
      <form>
        <div>
          name: <input value = {newName} onChange = {handleChange}/>
        </div>
        <div>
          number: <input value = {newNum} onChange = {handleChange2}/>
        </div>
        <div>
          <button  type="submit" onClick = {submit} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Filter value = {newFilter} change = {handleChange3}/>
      <PersonList persons = {persons} filter = {newFilter} handleDelete={handleDelete}/>
      
    </div>
  )

  }

export default App