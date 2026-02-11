import { useEffect, useState } from 'react'
import { ChartBar } from '@phosphor-icons/react'
import './FunilChart.css'

function FunilChart({ dados }) {
  const [animado, setAnimado] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimado(true), 100)
    return () => clearTimeout(timer)
  }, [dados])

  if (!dados || !dados.funil) return null

  const funil = dados.funil

  return (
    <div className="funil-container">
      <div className="funil-header">
        <div className="funil-title-group">
          <ChartBar weight="duotone" size={24} />
          <h2 className="funil-title">Funil de Qualificação</h2>
        </div>
        <span className="funil-total">{dados.total_leads} leads</span>
      </div>
      
      <div className="funil-chart">
        {funil.map((etapa, index) => (
          <div 
            key={etapa.id} 
            className={`funil-row ${animado ? 'animado' : ''}`}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="funil-label">
              <span className="etapa-numero">{etapa.etapa}</span>
              <div className="etapa-info">
                <span className="etapa-nome">{etapa.label}</span>
                {etapa.opcional && <span className="etapa-opcional">opcional</span>}
              </div>
            </div>
            
            <div className="funil-bar-container">
              <div 
                className="funil-bar"
                style={{ 
                  width: animado ? `${Math.max(etapa.percentual, 8)}%` : '0%',
                  transitionDelay: `${index * 80}ms`
                }}
              >
              </div>
              <span className="funil-bar-value">
                <strong>{etapa.total}</strong>
                <span className="percentual">({etapa.percentual}%)</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FunilChart