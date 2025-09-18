import { useState } from 'react'
import './App.css'
import ImageUploader from './components/imageUploader'
import Navbar from './components/navbar'

function App() {
  const [resetKey, setResetKey] = useState(0)

  const handleReset = () => {
    setResetKey(prev => prev + 1)
  }
  return (
    <div className='app'>
      <Navbar onLogoClick={handleReset}/>
      <ImageUploader key={resetKey}/>
    </div>
  )
}

export default App
