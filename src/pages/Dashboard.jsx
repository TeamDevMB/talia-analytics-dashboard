import { useState, useEffect } from 'react'
import { UsersThree, UserMinus, EnvelopeSimple, Target, Sun, Moon, ArrowsClockwise } from '@phosphor-icons/react'
import { fetchFunil } from '../services/api'
import KPICard from '../components/KPICard'
import FunilChart from '../components/FunilChart'
import './Dashboard.css'

function Dashboard({ darkMode, setDarkMode }) {
  const [dados, setDados] = useState(null)
  const [periodo, setPeriodo] = useState(30)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null)

  const carregarDados = () => {
    setLoading(true)
    setErro(null)
    
    fetchFunil(periodo)
      .then(data => {
        setDados(data)
        setUltimaAtualizacao(new Date())
        setLoading(false)
      })
      .catch(err => {
        setErro(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    carregarDados()
  }, [periodo])

  const calcularKPIs = () => {
    if (!dados) return { total: 0, pararam: 0, coletados: 0, comDor: 0 }
    
    const funil = dados.funil
    const total = funil.find(e => e.id === 'conversa_iniciada')?.total || 0
    const nomeColetado = funil.find(e => e.id === 'nome_coletado')?.total || 0
    const coletados = funil.find(e => e.id === 'email_coletado')?.total || 0
    const comDor = funil.find(e => e.id === 'com_dor')?.total || 0
    const pararam = total - nomeColetado

    return { total, pararam, coletados, comDor }
  }

  const formatarData = (data) => {
    if (!data) return ''
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const kpis = calcularKPIs()

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-brand">
          <div className="logo-container">
            <span className="logo-metro">metro</span>
            <span className="logo-byte">byte</span>
          </div>
          <div className="header-divider"></div>
          <div className="header-titles">
            <h1>Talia Analytics</h1>
            <span className="header-subtitle">Painel de Qualificação de Leads</span>
          </div>
        </div>
        
        <div className="header-controls">
          <div className="periodo-filter">
            {[7, 30, 90].map(dias => (
              <button
                key={dias}
                className={`periodo-btn ${periodo === dias ? 'active' : ''}`}
                onClick={() => setPeriodo(dias)}
              >
                {dias} dias
              </button>
            ))}
          </div>

          <button 
            className="btn-icon"
            onClick={carregarDados}
            title="Atualizar dados"
          >
            <ArrowsClockwise size={20} weight="bold" className={loading ? 'spinning' : ''} />
          </button>
          
          <button 
            className="btn-icon"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Modo claro' : 'Modo escuro'}
          >
            {darkMode ? <Sun size={20} weight="duotone" /> : <Moon size={20} weight="duotone" />}
          </button>
        </div>
      </header>

      {loading && (
        <div className="status-container">
          <div className="loader"></div>
          <p className="status-message">Carregando dados...</p>
        </div>
      )}
      
      {erro && (
        <div className="status-container">
          <p className="status-message erro">Erro: {erro}</p>
        </div>
      )}

      {!loading && !erro && (
        <>
          <section className="kpi-section">
            <div className="kpi-grid">
              <KPICard 
                icon={UsersThree} 
                label="Total de Leads" 
                value={kpis.total}
                color="primary"
                highlight={true}
              />
              <KPICard 
                icon={UserMinus} 
                label="Pararam de Responder" 
                value={kpis.pararam}
                color="danger"
              />
              <KPICard 
                icon={EnvelopeSimple} 
                label="Leads Coletados" 
                value={kpis.coletados}
                color="success"
              />
              <KPICard 
                icon={Target} 
                label="Leads com Dor Identificada" 
                value={kpis.comDor}
                color="accent"
              />
            </div>
          </section>

          <section className="funil-section">
            <FunilChart dados={dados} />
          </section>
        </>
      )}

      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-periodo">
              Exibindo dados dos últimos <strong>{periodo} dias</strong>
            </span>
            {ultimaAtualizacao && (
              <span className="footer-atualizacao">
                Atualizado em: {formatarData(ultimaAtualizacao)}
              </span>
            )}
          </div>
          <div className="footer-right">
            <span className="footer-brand">
              Desenvolvido por <a href="https://metrobyte.com.br" target="_blank" rel="noopener noreferrer">Metrobyte</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard