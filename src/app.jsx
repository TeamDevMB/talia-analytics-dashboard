import { useState, useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import ParticlesBackground from './components/ParticlesBackground'
import './styles/App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className="app">
      <ParticlesBackground darkMode={darkMode} />
      <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  )
}

export default App