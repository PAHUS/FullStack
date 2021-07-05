import React from 'react'
import Person from './Person'
    const PersonList = ({persons, filter, handleDelete}) => (
        <>
            {persons.filter(per => per.name.toLowerCase().includes(filter.toLowerCase())).map(per=> 
                <Person key = {per.id} id = {per.id} name = {per.name} number = {per.number} handleDelete = {handleDelete}></Person>)}
        </>
    )

  export default PersonList