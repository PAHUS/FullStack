import React from 'react'
import Person from './Person'
    const PersonList = ({persons, filter}) => (
        <>
            {persons.filter(per => per.name.toLowerCase().includes(filter)).map(per=> 
                <Person key = {per.name} name = {per.name} number = {per.number}></Person>)}
        </>
    )

  export default PersonList