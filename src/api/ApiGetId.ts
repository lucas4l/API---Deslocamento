import axios from 'axios'

export const ApiGetId = async <T>(
  id: string,
  endpoint: string,
): Promise<T | null> => {
  const validEndpoints = ['/Cliente', '/Condutor', '/Deslocamento', '/Veiculo']

  if (!validEndpoints.includes(endpoint)) {
    throw new Error('Endpoint inválido')
  }

  const API_URL = `https://api-deslocamento.herokuapp.com/api/v1${endpoint}`
  const url = `${API_URL}/${id}`

  try {
    const response = await axios.get<T>(url)

    const data: T = response.data

    return data
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error)
    return null
  }
}
