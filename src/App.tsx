import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Tone from './utils/chords/Tone'

function App() {
  const [count, setCount] = useState(0)
  const tone = new Tone('1')

  useEffect(() => {
    console.log(tone);
    console.log(tone.step(6));
    console.log(tone.step(5));

  }, [])
  return (
    <div>1</div>
  )
}

export default App
