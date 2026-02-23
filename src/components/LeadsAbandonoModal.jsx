import { useState, useEffect } from 'react'
import { X, MagnifyingGlass, Phone, EnvelopeSimple, Buildings, Tag, SortAscending, SortDescending } from '@phosphor-icons/react'
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
      <div className="modal-container" onClick={e => e.stopPropagation()}>
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
          <div className="search-container">
            <MagnifyingGlass size={20} />
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>

          <div className="sort-container">
            <button
              className={`sort-btn ${ordenacao === 'recentes' ? 'active' : ''}`}
              onClick={() => setOrdenacao('recentes')}
              title="Mais recentes"
            >
              <SortDescending size={18} />
              Mais recentes
            </button>
          </div>
        </div>

        <div className="modal-content">
          {loading && (
            <div className="modal-loading">
              <div className="loader"></div>
              <p>Carregando leads...</p>
            </div>
          )}

          {erro && (
            <div className="modal-erro">
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
                    <span className="lead-nome">{lead.nome}</span>
                    <span className="lead-status abandono">ABANDONO</span>
                  </div>
                  
                  <div className="lead-info">
                    {lead.empresa && lead.empresa !== "Não informado" && (
                      <div className="lead-info-item">
                        <Buildings size={16} />
                        <span>{lead.empresa}</span>
                      </div>
                    )}
                    {lead.email && lead.email !== "Não informado" && (
                      <div className="lead-info-item">
                        <EnvelopeSimple size={16} />
                        <span>{lead.email}</span>
                      </div>
                    )}
                    {lead.telefone && lead.telefone !== "Não informado" && (
                      <div className="lead-info-item">
                        <Phone size={16} />
                        <span>{lead.telefone}</span>
                      </div>
                    )}
                    {lead.servico_interesse && lead.servico_interesse !== "Não informado" && (
                      <div className="lead-info-item">
                        <Tag size={16} />
                        <span>{lead.servico_interesse}</span>
                      </div>
                    )}
                  </div>

                  <div className="lead-footer">
                    <span className="lead-data">
                      Última interação: {formatarData(lead.data_ultima_interacao)}
                    </span>
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