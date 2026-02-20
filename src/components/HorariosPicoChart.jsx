import { Clock } from '@phosphor-icons/react'
import './HorariosPicoChart.css'

function HorariosPicoChart({ dados }) {
  if (!dados || !dados.horarios_pico) return null

  const horarios = dados.horarios_pico
  const maxTotal = Math.max(...horarios.map(h => h.total))

  return (
    <div className="horarios-container">
      <div className="horarios-header">
        <div className="horarios-title-group">
          <Clock size={24} weight="duotone" />
          <h2 className="horarios-title">Horários de Pico</h2>
        </div>
      </div>

      <div className="horarios-chart">
        {horarios.map((item) => (
          <div key={item.hora} className="horarios-bar-wrapper">
            <div 
              className="horarios-bar"
              style={{ 
                height: `${maxTotal > 0 ? (item.total / maxTotal) * 100 : 0}%`
              }}
            >
              <span className="horarios-value">{item.total}</span>
            </div>
            <span className="horarios-label">{item.hora}h</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HorariosPicoChart