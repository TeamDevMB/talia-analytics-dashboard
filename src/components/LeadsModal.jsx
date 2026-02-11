import { useState, useEffect } from 'react'
import { X, MagnifyingGlass, SortAscending, SortDescending, User, Buildings, Envelope, Phone, Tag, ChatText, CalendarBlank } from '@phosphor-icons/react'
import './LeadsModal.css'

const API_URL = 'https://talia-analytics-api-production.up.railway.app'

function LeadsModal({ etapa, periodo, onClose }) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [busca, setBusca] = useState('')
  const [ordenar, setOrdenar] = useState('recentes')
  const [etapaLabel, setEtapaLabel] = useState('')
  const [total, setTotal] = useState(0)

  useEffect(() => {
    carregarLeads()
  }, [etapa, periodo, ordenar])

  const carregarLeads = async () => {
    setLoading(true)
    setErro(null)

    try {
      const params = new URLSearchParams({
        etapa,
        periodo,
        ordenar,
        busca
      })

      const response = await fetch(`${API_URL}/leads?${params}`)
      
      if (!response.ok) {
        throw new Error('Erro ao carregar leads')
      }

      const data = await response.json()
      setLeads(data.leads)
      setEtapaLabel(data.etapa_label)
      setTotal(data.total)
      setLoading(false)
    } catch (err) {
      setErro(err.message)
      setLoading(false)
    }
  }

  const handleBusca = (e) => {
    e.preventDefault()
    carregarLeads()
  }

  const toggleOrdenacao = () => {
    setOrdenar(ordenar === 'recentes' ? 'antigos' : 'recentes')
  }

  // Fechar modal com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <div className="modal-title-group">
            <h2 className="modal-title">{etapaLabel}</h2>
            <span className="modal-count">{total} leads</span>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={24} weight="bold" />
          </button>
        </header>

        <div className="modal-filters">
          <form className="search-form" onSubmit={handleBusca}>
            <MagnifyingGlass size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="search-input"
            />
          </form>

          <button className="sort-button" onClick={toggleOrdenacao}>
            {ordenar === 'recentes' ? (
              <>
                <SortDescending size={20} />
                <span>Mais recentes</span>
              </>
            ) : (
              <>
                <SortAscending size={20} />
                <span>Mais antigos</span>
              </>
            )}
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

          {!loading && !erro && leads.length === 0 && (
            <div className="modal-empty">
              <p>Nenhum lead encontrado</p>
            </div>
          )}

          {!loading && !erro && leads.length > 0 && (
            <div className="leads-list">
              {leads.map((lead) => (
                <div key={lead.id} className="lead-card">
                  <div className="lead-header">
                    <div className="lead-name-group">
                      <User size={20} weight="duotone" />
                      <span className="lead-name">{lead.nome}</span>
                    </div>
                    <span className={`lead-badge ${lead.classificacao === 'Qualificado' ? 'qualificado' : lead.classificacao === 'Pendente' ? 'pendente' : 'nao-qualificado'}`}>
                      {lead.classificacao}
                    </span>
                  </div>

                  <div className="lead-details">
                    <div className="lead-row">
                      <Buildings size={16} weight="duotone" />
                      <span>{lead.empresa || lead.tipo_pessoa}</span>
                    </div>
                    
                    <div className="lead-row">
                      <Envelope size={16} weight="duotone" />
                      <span>{lead.email}</span>
                    </div>
                    
                    <div className="lead-row">
                      <Phone size={16} weight="duotone" />
                      <span>{lead.telefone}</span>
                    </div>
                    
                    <div className="lead-row">
                      <Tag size={16} weight="duotone" />
                      <span>{lead.interesse}</span>
                    </div>

                    {lead.motivo && (
                      <div className="lead-row lead-motivo">
                        <ChatText size={16} weight="duotone" />
                        <span>{lead.motivo}</span>
                      </div>
                    )}
                    
                    {lead.data && (
                      <div className="lead-row lead-data">
                        <CalendarBlank size={16} weight="duotone" />
                        <span>{lead.data}</span>
                      </div>
                    )}
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

export default LeadsModal