import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const StatisticLine = (props) => (
  <tbody>
    <tr>
      <td> {props.text}</td>
      <td> {props.value}</td>
    </tr>
  </tbody>
)


const Statistic = (props) => {
  const fb = props.fb
  const sum = fb.good+fb.neutral+fb.bad
  if (fb.good === 0 && fb.neutral === 0 && fb.bad === 0) {
    return (
    <>
      No feedback given
    </> )
    }
  return (
    <>
    <table>
      <StatisticLine text="Good" value ={fb.good} />
      <StatisticLine text="Neutral" value ={fb.neutral} />
      <StatisticLine text="Bad" value ={fb.bad} />
      <StatisticLine text="All" value ={sum} />
      <StatisticLine text="Average" value ={(fb.good-fb.bad) / sum} />
      <StatisticLine text="Positive" value ={(fb.good/sum + ' %')} />
    </table>
    </>
  )
}

const App = () => {
  const [fb, setPalaute] = useState({
    good: 0, neutral: 0, bad: 0
  })
  const good = () => setPalaute({ ...fb, good: fb.good + 1 })
  const neutral = () => setPalaute({...fb, neutral: fb.neutral + 1})
  const bad = () => setPalaute({...fb, bad: fb.bad + 1})


  return(
    <div>
      <h3>Unicafe feedback</h3>
      <Button handleClick = {good} text = "Good"/>
      <Button handleClick = {neutral} text = "Neutral"/>
      <Button handleClick = {bad} text = "Bad"/>
      <Statistic fb = {fb}/>
      
    </div>
  )
}

export default App