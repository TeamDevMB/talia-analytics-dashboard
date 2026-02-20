import { useState, useEffect } from 'react'
import { UsersThree, UserMinus, EnvelopeSimple, Target, Sun, Moon, ArrowsClockwise, SignOut, Warning, ChartLineDown, MapPin } from '@phosphor-icons/react'
import { useAuth } from '../contexts/AuthContext'
import { fetchFunil, fetchAbandono, fetchPerformance } from '../services/api'
import KPICard from '../components/KPICard'
import FunilChart from '../components/FunilChart'
import AbandonoChart from '../components/AbandonoChart'
import TabNavigation from '../components/TabNavigation'
import PerformanceCards from '../components/PerformanceCards'
import ClassificacaoChart from '../components/ClassificacaoChart'
import HorariosPicoChart from '../components/HorariosPicoChart'
import './Dashboard.css'

function Dashboard({ darkMode, setDarkMode }) {
  const { user, signOut } = useAuth()
  const [dados, setDados] = useState(null)
  const [dadosAbandono, setDadosAbandono] = useState(null)
  const [dadosPerformance, setDadosPerformance] = useState(null)
  const [periodo, setPeriodo] = useState(30)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null)
  const [abaAtiva, setAbaAtiva] = useState('qualificacao')

  const handleLogout = async () => {
    if (confirm('Deseja realmente sair?')) {
      await signOut()
    }
  }

  const carregarDados = async () => {
    setLoading(true)
    setErro(null)
    
    try {
      const [funilData, abandonoData, performanceData] = await Promise.all([
        fetchFunil(periodo),
        fetchAbandono(periodo),
        fetchPerformance(periodo)
      ])
      
      setDados(funilData)
      setDadosAbandono(abandonoData)
      setDadosPerformance(performanceData)
      setUltimaAtualizacao(new Date())
      setLoading(false)
    } catch (err) {
      setErro(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [periodo])

  const calcularKPIs = () => {
    if (!dados) return { total: 0, coletados: 0, comDor: 0 }
    
    const funil = dados.funil
    const total = funil.find(e => e.id === 'conversa_iniciada')?.total || 0
    const coletados = funil.find(e => e.id === 'email_coletado')?.total || 0
    const comDor = funil.find(e => e.id === 'com_dor')?.total || 0

    return { total, coletados, comDor }
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

          <button 
            className="btn-icon btn-logout"
            onClick={handleLogout}
            title="Sair"
          >
            <SignOut size={20} weight="duotone" />
          </button>
        </div>
      </header>

      <TabNavigation abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

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

      {!loading && !erro && abaAtiva === 'qualificacao' && (
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
                label="Abandonos" 
                value={dadosAbandono?.total_abandonos || 0}
                color="danger"
              />
              <KPICard 
                icon={EnvelopeSimple} 
                label="Leads Ativos" 
                value={kpis.total - (dadosAbandono?.total_abandonos || 0)}
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

      {!loading && !erro && abaAtiva === 'abandono' && dadosAbandono && (
        <>
          <section className="kpi-section">
            <div className="kpi-grid">
              <KPICard 
                icon={Warning} 
                label="Total de Abandonos" 
                value={dadosAbandono.total_abandonos}
                color="danger"
                highlight={true}
              />
              <KPICard 
                icon={ChartLineDown} 
                label="Taxa de Abandono" 
                value={`${dadosAbandono.taxa_abandono}%`}
                color="danger"
              />
              <KPICard 
                icon={MapPin} 
                label="Ponto Crítico" 
                value={dadosAbandono.ponto_critico?.replace('Abandonou ', '').replace('no ', '').replace('após ', '')}
                color="accent"
              />
              <KPICard 
                icon={UsersThree} 
                label="Total de Leads" 
                value={dadosAbandono.total_leads}
                color="primary"
              />
            </div>
          </section>

          <section className="funil-section">
            <AbandonoChart dados={dadosAbandono} />
          </section>
        </>
      )}

      {!loading && !erro && abaAtiva === 'performance' && dadosPerformance && (
        <>
          <section className="kpi-section">
            <PerformanceCards dados={dadosPerformance} />
          </section>

          <section className="charts-section">
            <div className="charts-grid">
              <ClassificacaoChart dados={dadosPerformance} />
              <HorariosPicoChart dados={dadosPerformance} />
            </div>
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