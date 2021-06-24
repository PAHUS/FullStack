import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonList from './components/PersonList'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleChange2 = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }
  const handleChange3 = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const submit = (event) => {
    event.preventDefault()
    console.log('Includes ', persons.some(field =>field.name === newName))
    if (persons.some(field => field.name === newName)){
      setNewName('')
      setNewNum('')
      alert(`${newName} is already added to phonebook`)
      
    }
    else {
    console.log('submitting', newName)
    setPersons(persons.concat({name: newName, number: newNum}))
    setNewName('')
    setNewNum('')
  }}

  return (
    <div>
      <h2>Phonebook</h2>
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
      <PersonList persons = {persons} filter = {newFilter}/>
      
    </div>
  )

}

export default App