import { useEffect, useState } from 'react'
import './KPICard.css'

function KPICard({ icon: Icon, label, value, color = 'primary', highlight = false }) {
  const [displayValue, setDisplayValue] = useState(0)

  // Animação de contagem
  useEffect(() => {
    const duration = 1000
    const steps = 30
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div className={`kpi-card kpi-${color} ${highlight ? 'kpi-highlight' : ''}`}>
      <div className="kpi-icon-container">
        <Icon weight="duotone" size={highlight ? 32 : 28} />
      </div>
      <div className="kpi-content">
        <span className="kpi-label">{label}</span>
        <span className="kpi-value">{displayValue.toLocaleString('pt-BR')}</span>
      </div>
      {highlight && <div className="kpi-badge">Principal</div>}
    </div>
  )
}

export default KPICard