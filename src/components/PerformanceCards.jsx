import { Percent, EnvelopeSimple, User, Buildings, Clock, CalendarBlank } from '@phosphor-icons/react'
import KPICard from './KPICard'
import './PerformanceCards.css'

function PerformanceCards({ dados }) {
  if (!dados) return null

  const { taxas, insights } = dados

  return (
    <div className="performance-cards">
      <div className="kpi-grid">
        <KPICard 
          icon={Percent} 
          label="Taxa de Conversão" 
          value={`${taxas.conversao}%`}
          color="success"
          highlight={true}
        />
        <KPICard 
          icon={EnvelopeSimple} 
          label="Coleta de Email" 
          value={`${taxas.coleta_email}%`}
          color="primary"
        />
        <KPICard 
          icon={User} 
          label="Coleta de Nome" 
          value={`${taxas.coleta_nome}%`}
          color="primary"
        />
        <KPICard 
          icon={Buildings} 
          label="Coleta de Empresa" 
          value={`${taxas.coleta_empresa}%`}
          color="primary"
        />
      </div>

      <div className="insights-grid">
        <div className="insight-card">
          <Clock size={24} weight="duotone" />
          <div className="insight-content">
            <span className="insight-label">Horário de Pico</span>
            <span className="insight-value">{insights.horario_pico || '-'}</span>
          </div>
        </div>
        <div className="insight-card">
          <CalendarBlank size={24} weight="duotone" />
          <div className="insight-content">
            <span className="insight-label">Dia de Pico</span>
            <span className="insight-value">{insights.dia_pico || '-'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceCards