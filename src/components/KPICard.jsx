import { useEffect, useState } from 'react'
import './KPICard.css'

function KPICard({ icon: Icon, label, value, color = 'primary', highlight = false }) {
  const [displayValue, setDisplayValue] = useState(0)
  
  // Verifica se o valor é numérico
  const isNumeric = typeof value === 'number'

  // Animação de contagem (apenas para números)
  useEffect(() => {
    if (!isNumeric) {
      setDisplayValue(value)
      return
    }

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
  }, [value, isNumeric])

  // Formata o valor para exibição
  const formattedValue = isNumeric 
    ? displayValue.toLocaleString('pt-BR')
    : displayValue

  return (
    <div className={`kpi-card kpi-${color} ${highlight ? 'kpi-highlight' : ''}`}>
      <div className="kpi-icon-container">
        <Icon weight="duotone" size={highlight ? 32 : 28} />
      </div>
      <div className="kpi-content">
        <span className="kpi-label">{label}</span>
        <span className="kpi-value">{formattedValue}</span>
      </div>
      {highlight && <div className="kpi-badge">Principal</div>}
    </div>
  )
}

export default KPICard