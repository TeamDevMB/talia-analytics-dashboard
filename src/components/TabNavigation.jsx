import { ChartBar, SignOut as SignOutIcon, ChartLine } from '@phosphor-icons/react'
import './TabNavigation.css'

function TabNavigation({ abaAtiva, setAbaAtiva }) {
  const abas = [
    { id: 'qualificacao', label: 'Qualificação', icon: ChartBar },
    { id: 'abandono', label: 'Abandono', icon: SignOutIcon },
    { id: 'performance', label: 'Performance', icon: ChartLine }
  ]

  return (
    <nav className="tab-navigation">
      {abas.map((aba) => {
        const Icon = aba.icon
        return (
          <button
            key={aba.id}
            className={`tab-button ${abaAtiva === aba.id ? 'active' : ''}`}
            onClick={() => setAbaAtiva(aba.id)}
          >
            <Icon size={20} weight={abaAtiva === aba.id ? 'fill' : 'duotone'} />
            <span>{aba.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default TabNavigation