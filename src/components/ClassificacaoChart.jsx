import { ChartPie } from '@phosphor-icons/react'
import './ClassificacaoChart.css'

function ClassificacaoChart({ dados }) {
  if (!dados || !dados.classificacao) return null

  const classificacao = dados.classificacao
  const total = Object.values(classificacao).reduce((a, b) => a + b, 0)

  const cores = {
    'COM_DOR': '#34D399',
    'SEM_DOR': '#F87171',
    'VAGO_INICIAL': '#FBBF24',
    'INCONCLUSIVO': '#A78BFA',
    'NAO_CLASSIFICADO': '#6B7280'
  }

  const labels = {
    'COM_DOR': 'Com Dor',
    'SEM_DOR': 'Sem Dor',
    'VAGO_INICIAL': 'Vago Inicial',
    'INCONCLUSIVO': 'Inconclusivo',
    'NAO_CLASSIFICADO': 'Não Classificado'
  }

  const items = Object.entries(classificacao)
    .map(([key, value]) => ({
      key,
      label: labels[key] || key,
      value,
      percentual: total > 0 ? ((value / total) * 100).toFixed(1) : 0,
      cor: cores[key] || '#6B7280'
    }))
    .sort((a, b) => b.value - a.value)

  return (
    <div className="classificacao-container">
      <div className="classificacao-header">
        <div className="classificacao-title-group">
          <ChartPie size={24} weight="duotone" />
          <h2 className="classificacao-title">Distribuição de Classificação</h2>
        </div>
        <span className="classificacao-total">{total} leads</span>
      </div>

      <div className="classificacao-content">
        <div className="classificacao-bars">
          {items.map((item) => (
            <div key={item.key} className="classificacao-item">
              <div className="classificacao-label">
                <span 
                  className="classificacao-dot" 
                  style={{ backgroundColor: item.cor }}
                />
                <span className="classificacao-nome">{item.label}</span>
              </div>
              <div className="classificacao-bar-container">
                <div 
                  className="classificacao-bar"
                  style={{ 
                    width: `${Math.max(item.percentual, 2)}%`,
                    backgroundColor: item.cor
                  }}
                />
              </div>
              <div className="classificacao-values">
                <span className="classificacao-count">{item.value}</span>
                <span className="classificacao-percent">({item.percentual}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ClassificacaoChart