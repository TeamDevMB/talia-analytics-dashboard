const API_URL = 'https://talia-analytics-api-production.up.railway.app'

export async function fetchResumo(periodo = 30) {
  const response = await fetch(`${API_URL}/resumo?periodo=${periodo}`)
  
  if (!response.ok) {
    throw new Error('Erro ao buscar resumo')
  }
  
  return response.json()
}

export async function fetchFunil(periodo = 30) {
  const response = await fetch(`${API_URL}/funil?periodo=${periodo}`)
  
  if (!response.ok) {
    throw new Error('Erro ao buscar funil')
  }
  
  return response.json()
}