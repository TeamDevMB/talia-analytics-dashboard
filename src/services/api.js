const API_URL = 'https://talia-analytics-api-production.up.railway.app'

export async function fetchResumo(periodo = 30) {
  const response = await fetch(`${API_URL}/resumo?periodo=${periodo}`)
  if (!response.ok) {
    throw new Error('Erro ao carregar dados do resumo')
  }
  return response.json()
}

export async function fetchFunil(periodo = 30) {
  const response = await fetch(`${API_URL}/funil?periodo=${periodo}`)
  if (!response.ok) {
    throw new Error('Erro ao carregar dados do funil')
  }
  return response.json()
}

export async function fetchAbandono(periodo = 30) {
  const response = await fetch(`${API_URL}/abandono?periodo=${periodo}`)
  if (!response.ok) {
    throw new Error('Erro ao carregar dados de abandono')
  }
  return response.json()
}

export async function fetchPerformance(periodo = 30) {
  const response = await fetch(`${API_URL}/performance?periodo=${periodo}`)
  if (!response.ok) {
    throw new Error('Erro ao carregar dados de performance')
  }
  return response.json()
}