import React from 'react'
    const Person = ({name, number, id, handleDelete}) => (
        <p> {name} {number}<button onClick={() => handleDelete(id)} >delete</button></p>
    )

    export default Person