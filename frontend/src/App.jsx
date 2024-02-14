import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(response => { setMessage(response.data)});
  }, []);

  return (
    <>
      <h1>Message is: {message}</h1>
    </>
  )
}

export default App
