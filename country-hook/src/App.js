import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// const useCountry = (name) => {
//   const [country, setCountry] = useState(null)
//   useEffect(() => {
//     if (name) {
//       axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
//         .t)

//   console.log(country)
//   return country
// }

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [status, setStatus] = useState('idle')
  
  useEffect(() => {
    if (!name) return

    const getData = () => {
      setStatus('fetching')
      axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        .then(response => {
          setCountry(response)
          setStatus('fetched')
        })
        .catch(error => console.log(error))
    }
    getData()

  }, [name])

  console.log(status)
  if (status === 'fetched') {
    country.found = true
    return country
  }

  return null
}

const Country = ({ country }) => {
  console.log(country)
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }
  console.log(country)
  return (
    <div>
      <h3>{country.data[0].name} </h3>
      <div>capital {country.data[0].capital} </div>
      <div>population {country.data[0].population}</div> 
      <img src={country.data[0].flag} height='100' alt={`flag of ${country.data[0].name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState(null)
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  console.log(country)

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App