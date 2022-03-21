import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Tone from './utils/chords/Tone'

function App() {
  const [count, setCount] = useState(0)
  const tone = new Tone('1')

  return (
    <div>1</div>
  )
}

export default App
