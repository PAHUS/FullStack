import React from 'react'
    const Filter = ({value, change}) => (
        <div>
            Filter shown with: <input value = {value} onChange = {change}></input>
        </div>
        )
    export default Filter