import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import ParticlesBackground from './components/ParticlesBackground'
import './styles/App.css'

function AppContent() {
  const { user, loading } = useAuth()
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Loading inicial
  if (loading) {
    return (
      <div className="app-loading">
        <ParticlesBackground darkMode={true} />
        <div className="loading-content">
          <div className="loader"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  // Se não está logado, mostra tela de login
  if (!user) {
    return <Login />
  }

  // Validar domínio @metrobyte.com.br
  const email = user.email || ''
  if (!email.endsWith('@metrobyte.com.br')) {
    return (
      <div className="app-unauthorized">
        <ParticlesBackground darkMode={true} />
        <div className="unauthorized-content">
          <h1>Acesso Negado</h1>
          <p>Apenas emails @metrobyte.com.br podem acessar este sistema.</p>
          <p className="email-info">Email utilizado: {email}</p>
          <button onClick={() => window.location.reload()}>Tentar novamente</button>
        </div>
      </div>
    )
  }

  // Usuário autenticado e autorizado
  return (
    <div className="app">
      <ParticlesBackground darkMode={darkMode} />
      <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} user={user} />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App