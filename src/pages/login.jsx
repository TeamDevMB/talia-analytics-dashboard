import { useState } from 'react'
import { WindowsLogo, ShieldCheck, Warning } from '@phosphor-icons/react'
import { useAuth } from '../contexts/AuthContext'
import ParticlesBackground from '../components/ParticlesBackground'
import './Login.css'

function Login() {
  const { signInWithMicrosoft } = useAuth()
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  const handleLogin = async () => {
    setLoading(true)
    setErro(null)
    
    try {
      await signInWithMicrosoft()
    } catch (error) {
      setErro('Erro ao fazer login. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <ParticlesBackground darkMode={true} />
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <span className="logo-metro">metro</span>
              <span className="logo-byte">byte</span>
            </div>
            <h1 className="login-title">Talia Analytics</h1>
            <p className="login-subtitle">Painel de Qualificação de Leads</p>
          </div>

          <div className="login-content">
            <div className="login-info">
              <ShieldCheck size={20} weight="duotone" />
              <span>Acesso restrito a colaboradores Metrobyte</span>
            </div>

            {erro && (
              <div className="login-erro">
                <Warning size={20} weight="fill" />
                <span>{erro}</span>
              </div>
            )}

            <button 
              className="login-button"
              onClick={handleLogin}
              disabled={loading}
            >
              <WindowsLogo size={24} weight="fill" />
              <span>{loading ? 'Conectando...' : 'Entrar com Microsoft 365'}</span>
            </button>

            <p className="login-hint">
              Use seu email @metrobyte.com.br
            </p>
          </div>

          <div className="login-footer">
            <span>© 2026 Metrobyte. Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login