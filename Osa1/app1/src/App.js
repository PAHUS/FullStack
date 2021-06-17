import React from 'react'


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <>
      <Header course = {course}/>
      <Content course = {course}/>
      <Total course =  {course}/>
    </>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}
const Content = (props) => {
  return (
    <>
      <Part part = {props.course.parts[0].name} exercises = {props.course.parts[0].exercises}/>
      <Part part = {props.course.parts[1].name} exercises = {props.course.parts[1].exercises}/>
      <Part part = {props.course.parts[2].name} exercises = {props.course.parts[2].exercises}/>
    </>
  )
}
const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}
const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.course.parts.map(el => el.exercises).reduce((a,b)=> a +b)}</p>
    </>
  )
}


export default App