import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import ParticlesBackground from './components/ParticlesBackground'
import './styles/App.css'

function AppContent() {
  const { user, loading } = useAuth()
  const [darkMode, setDarkMode] = useState(true)

  // Bypass de login em desenvolvimento
  const isDev = window.location.hostname === 'localhost'

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Loading inicial (apenas em produção)
  if (!isDev && loading) {
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

  // Se não está logado e não é dev, mostra tela de login
  if (!isDev && !user) {
    return <Login />
  }

  // Em produção, validar domínio @metrobyte.com.br
  if (!isDev && user) {
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
  }

  // Usuário autenticado e autorizado (ou em dev)
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