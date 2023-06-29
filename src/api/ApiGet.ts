import axios, { AxiosResponse } from 'axios'

export async function ApiGet<T>(endpoint: string): Promise<T[]> {
  const validEndpoints = ['/Cliente', '/Condutor', '/Deslocamento', '/Veiculo']

  if (!validEndpoints.includes(endpoint)) {
    throw new Error('Endpoint inválido')
  }

  const API_URL = `https://api-deslocamento.herokuapp.com/api/v1${endpoint}`

  const response: AxiosResponse<T[]> = await axios.get(API_URL)
  return response.data
}
