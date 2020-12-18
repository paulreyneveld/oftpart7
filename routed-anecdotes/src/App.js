import React, { useState } from 'react'
import { useField } from './hooks'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='/' style={padding}>anecdotes</a>
      <a href='/create' style={padding}>create new</a>
      <a href='/about' style={padding}>about</a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}><li key={anecdote.id} >{anecdote.content}</li></Link>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  console.log(id)
  console.log(anecdotes)
  console.log(typeof +id)
  const anecdote = anecdotes.find(a => Number(a.id) === Number(id))
  console.log(anecdote)
  return (
    <div>
      <p>{anecdote.content}</p>
      <p>{anecdote.votes}</p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })

    history.push('/')
    props.notifyWith(`Success: ${content}`)

  }

  // The example doesn't clarify the issue related to string versus object use. I am going to revisit this.
  
  const val1 = useField("text")
  console.log(val1.type)
  console.log(val1.value)
  console.log(typeof val1)
  console.log(typeof author)
  console.log(typeof info)

  let content = val1.value

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name={val1.type} value={val1.value} onChange={val1.onChange} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  return (
    <div>{message}</div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [message, setMessage] = useState(null)

  const notifyWith = (message) => {
    setMessage(
      message
    )

    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }


  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
    <div>
      <h1>Software anecdotes</h1>
      <Switch>
        <Route exact path="/">
          <Menu />
          <Notification message={message} />
          <AnecdoteList anecdotes={anecdotes} />
          <Footer />
        </Route>
        <Route path="/create">
          <Menu />
          <CreateNew addNew={addNew} notifyWith={notifyWith} />
          <Footer />  
        </Route>
        <Route path="/about">
          <Menu />
          <About />
          <Footer />
        </Route>
        <Route path="/anecdotes/:id">
          <Menu />
          <Anecdote anecdotes={anecdotes} />
          <Footer />
        </Route>
      </Switch>
    </div>
    </Router>
  )
}

export default App;
