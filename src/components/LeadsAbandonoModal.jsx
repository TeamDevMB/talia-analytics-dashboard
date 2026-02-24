import { useState, useEffect } from 'react'
import { X, MagnifyingGlass, Phone, EnvelopeSimple, Buildings, Tag, SortDescending, User, Calendar } from '@phosphor-icons/react'
import './LeadsModal.css'

const API_URL = 'https://talia-analytics-api-production.up.railway.app'

function LeadsAbandonoModal({ etapa, periodo, onClose }) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('recentes')
  const [etapaLabel, setEtapaLabel] = useState('')

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true)
      setErro(null)
      
      try {
        const response = await fetch(`${API_URL}/leads-abandono?etapa=${etapa}&periodo=${periodo}`)
        
        if (!response.ok) {
          throw new Error('Erro ao carregar leads')
        }
        
        const data = await response.json()
        setLeads(data.leads || [])
        setEtapaLabel(data.etapa_label || etapa)
        setLoading(false)
      } catch (err) {
        setErro(err.message)
        setLoading(false)
      }
    }

    fetchLeads()
  }, [etapa, periodo])

  const leadsFiltrados = leads
    .filter(lead => {
      const termo = busca.toLowerCase()
      return (
        (lead.nome && lead.nome.toLowerCase().includes(termo)) ||
        (lead.email && lead.email.toLowerCase().includes(termo)) ||
        (lead.empresa && lead.empresa.toLowerCase().includes(termo)) ||
        (lead.telefone && lead.telefone.includes(termo))
      )
    })
    .sort((a, b) => {
      if (ordenacao === 'recentes') {
        return new Date(b.data_ultima_interacao) - new Date(a.data_ultima_interacao)
      } else if (ordenacao === 'antigos') {
        return new Date(a.data_ultima_interacao) - new Date(b.data_ultima_interacao)
      } else if (ordenacao === 'nome') {
        return (a.nome || '').localeCompare(b.nome || '')
      }
      return 0
    })

  const formatarData = (dataString) => {
    if (!dataString) return '-'
    const data = new Date(dataString)
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-abandono" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 className="modal-title">{etapaLabel}</h2>
            <span className="modal-count">{leadsFiltrados.length} leads</span>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={24} weight="bold" />
          </button>
        </div>

        <div className="modal-filters">
          <div className="search-form">
            <MagnifyingGlass size={20} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por nome ou telefone..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>

          <button className="sort-button" onClick={() => setOrdenacao(ordenacao === 'recentes' ? 'antigos' : 'recentes')}>
            <SortDescending size={18} />
            {ordenacao === 'recentes' ? 'Mais recentes' : 'Mais antigos'}
          </button>
        </div>

        <div className="modal-content">
          {loading && (
            <div className="modal-loading">
              <div className="loader"></div>
              <p>Carregando leads...</p>
            </div>
          )}

          {erro && (
            <div className="modal-error">
              <p>Erro: {erro}</p>
            </div>
          )}

          {!loading && !erro && leadsFiltrados.length === 0 && (
            <div className="modal-empty">
              <p>Nenhum lead encontrado</p>
            </div>
          )}

          {!loading && !erro && leadsFiltrados.length > 0 && (
            <div className="leads-list">
              {leadsFiltrados.map(lead => (
                <div key={lead.id} className="lead-card">
                  <div className="lead-header">
                    <div className="lead-name-group">
                      <User size={18} weight="duotone" />
                      <span className="lead-name">{lead.nome}</span>
                    </div>
                    <span className="lead-badge nao-qualificado">ABANDONO</span>
                  </div>
                  
                  <div className="lead-details">
                    {lead.empresa && (
                      <div className="lead-row">
                        <Buildings size={16} weight="duotone" />
                        <span>{lead.empresa}</span>
                      </div>
                    )}
                    {lead.email && (
                      <div className="lead-row">
                        <EnvelopeSimple size={16} weight="duotone" />
                        <span>{lead.email}</span>
                      </div>
                    )}
                    {lead.telefone && (
                      <div className="lead-row">
                        <Phone size={16} weight="duotone" />
                        <span>{lead.telefone}</span>
                      </div>
                    )}
                    {lead.servico_interesse && (
                      <div className="lead-row">
                        <Tag size={16} weight="duotone" />
                        <span>{lead.servico_interesse}</span>
                      </div>
                    )}
                    
                    <div className="lead-row lead-data">
                      <Calendar size={16} weight="duotone" />
                      <span>Última interação: {formatarData(lead.data_ultima_interacao)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LeadsAbandonoModal