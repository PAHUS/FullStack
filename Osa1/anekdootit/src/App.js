import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0))
  const vote = () => {
    const copy = [...points]
    copy[selected] = copy[selected] + 1
    setPoints(copy)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>
      <button onClick = {() => (setSelected(Math.floor(Math.random() * 7)))} > Randomize</button>
      <button onClick = {vote} > Vote</button>

      <h3> Anecdote of the day</h3>
      <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
    </div>
  )
}

export default App