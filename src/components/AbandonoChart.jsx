import { useEffect, useState } from 'react'
import { SignOut, Info } from '@phosphor-icons/react'
import LeadsModal from './LeadsModal'
import './AbandonoChart.css'

function AbandonoChart({ dados }) {
  const [animado, setAnimado] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)
  const [etapaSelecionada, setEtapaSelecionada] = useState(null)

  useEffect(() => {
    setAnimado(false)
    const timer = setTimeout(() => setAnimado(true), 100)
    return () => clearTimeout(timer)
  }, [dados])

  if (!dados || !dados.etapas) return null

  const etapas = dados.etapas

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
      <div className="abandono-container">
        <div className="abandono-header">
          <div className="abandono-title-group">
            <SignOut weight="duotone" size={24} />
            <h2 className="abandono-title">Funil de Abandono</h2>
          </div>
          <span className="abandono-total">{dados.total_abandonos} abandonos</span>
        </div>
        
        <div className="abandono-chart">
          {etapas.map((etapa, index) => (
            <div 
              key={etapa.id} 
              className={`abandono-row ${animado ? 'animado' : ''}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="abandono-label">
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
                </div>
              </div>
              
              <div 
                className="abandono-bar-container clickable"
                onClick={() => abrirModal(etapa)}
                title={`Clique para ver os ${etapa.total} leads`}
              >
                <div 
                  className="abandono-bar"
                  style={{ 
                    width: animado ? `${Math.max(etapa.percentual, 8)}%` : '0%',
                    transitionDelay: `${index * 80}ms`
                  }}
                >
                </div>
                <span className="abandono-bar-value">
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

export default AbandonoChart