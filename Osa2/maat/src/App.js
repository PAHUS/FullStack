import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Page = () => (
  <h1>Countries</h1>
)
const Search = ({filter, change}) => {
  return(
    <>
     Filter countries by: <input value = {filter} onChange = {change}/>
    </>
  )
}

const List = ({list, newFilter, filterDetail}) => {
  const filtered = list.filter(el => el.name.toLowerCase().includes(newFilter.toLowerCase()))
  if (filtered.length > 10) {
    return (<p>Too many results, specify filter</p>)
  }
  if (filtered.length === 1) {
    return(<Detail country = {filtered[0]}/>)
  }
  return(
    <>
      {filtered.map(el => 
        <div key={el.callingCodes}>
            <p> {el.name} <button  value = {el.name} type = 'submit' onClick = {filterDetail}>details</button></p>
        </div>
      )}
    </>
  )
}
const Weather = ({name}) => {
   const [weather, setWeather] = useState({})
   useEffect(() => 
    axios
       .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${name}`)
       .then(res => {
         console.log('caught')
         setWeather(res.data)
       }), [])

  return(
    <>
    <h2>Temperature: {weather?.current?.temperature}</h2>
      
    </>
  )

  

}

const Detail = ({country}) => {
  return(
    <>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>Languages: </h3>
      <ul>
        {country.languages.map(el=> 
          <li key = {el.iso639_1}>{el.name}</li>)}
      </ul>
      <img src={country.flag} alt = {'The flag of ' + country.name} height = '100' />

      <Weather name = {country.name}/>
    </>
  )
}



const App = () =>  {
  const [maat, setMaat] = useState([])
  const [newFilter, setNewFilter] = useState('')


  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }
  const filterDetail = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }


  useEffect(() => {
    console.log('countries...')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        console.log('caught')
        setMaat(res.data)
      })
  },[])

  return (
    <div>
      <Page/>
      <Search value={newFilter} change = {handleFilter} />
      <List list={maat} newFilter = {newFilter} filterDetail = {filterDetail}/>
    </div>
  );
}

export default App;
