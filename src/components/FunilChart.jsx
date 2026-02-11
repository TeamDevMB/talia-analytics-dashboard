import { useEffect, useState } from 'react'
import { ChartBar, Info } from '@phosphor-icons/react'
import LeadsModal from './LeadsModal'
import './FunilChart.css'

function FunilChart({ dados }) {
  const [animado, setAnimado] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)
  const [etapaSelecionada, setEtapaSelecionada] = useState(null)

  useEffect(() => {
    setAnimado(false)
    const timer = setTimeout(() => setAnimado(true), 100)
    return () => clearTimeout(timer)
  }, [dados])

  if (!dados || !dados.funil) return null

  const funil = dados.funil

  const abrirModal = (etapa) => {
    setEtapaSelecionada(etapa.id)
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
    setEtapaSelecionada(null)
  }

  return (
    <>
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
                  <div className="etapa-nome-container">
                    <span className="etapa-nome">{etapa.label}</span>
                    {etapa.tooltip && (
                      <div className="tooltip-wrapper">
                        <Info size={16} weight="fill" className="tooltip-icon" />
                        <div className="tooltip-content">{etapa.tooltip}</div>
                      </div>
                    )}
                  </div>
                  {etapa.opcional && <span className="etapa-opcional">opcional</span>}
                </div>
              </div>
              
              <div 
                className="funil-bar-container clickable"
                onClick={() => abrirModal(etapa)}
                title={`Clique para ver os ${etapa.total} leads`}
              >
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

      {modalAberto && (
        <LeadsModal 
          etapa={etapaSelecionada}
          periodo={dados.periodo_dias}
          onClose={fecharModal}
        />
      )}
    </>
  )
}

export default FunilChart