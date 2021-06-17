import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [palaute, setPalaute] = useState({
    good: 0, neutral: 0, bad: 0
  })
  const good = () => setPalaute({ ...palaute, good: palaute.good + 1 })
  const neutral = () => setPalaute({...palaute, neutral: palaute.neutral + 1})
  const bad = () => setPalaute({...palaute, bad: palaute.bad + 1})


  return(
    <div>
      <h3>Unicafe feedback</h3>
      <Button handleClick = {good} text = "Good"/>
      <Button handleClick = {neutral} text = "Neutral"/>
      <Button handleClick = {bad} text = "Bad"/>
      
      <p> Good {palaute.good} </p>
      <p> Neutral {palaute.neutral} </p>
      <p> Bad {palaute.bad} </p>
    </div>
  )
}

export default App