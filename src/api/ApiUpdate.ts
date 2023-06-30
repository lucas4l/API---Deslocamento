import axios from 'axios'
import { Condutor, Cliente, Deslocamento, Veiculo } from '../types/types'

type Resource = Cliente | Condutor | Deslocamento | Veiculo
type ValidEndpoint = '/Cliente' | '/Condutor' | '/Deslocamento' | '/Veiculo'

export async function ApiPut<T extends Resource, U extends keyof T>(
  id: number,
  endpoint: ValidEndpoint,
  updatedData: Pick<T, U>,
  resourceType: 'cliente' | 'veiculo' | 'condutor' | 'deslocamento',
) {
  const validEndpoints = ['/Cliente', '/Condutor', '/Deslocamento', '/Veiculo']

  if (!validEndpoints.includes(endpoint)) {
    throw new Error('Endpoint inválido')
  }

  const API_URL = `https://api-deslocamento.herokuapp.com/api/v1`
  const API_URL_DISPLACEMENT = `https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/`
  let url = ''

  if (resourceType === 'deslocamento') {
    url = `${API_URL_DISPLACEMENT}${id}/EncerrarDeslocamento`
  } else if (resourceType === 'cliente') {
    url = `${API_URL}${endpoint}/${id}`
  } else if (resourceType === 'veiculo') {
    url = `${API_URL}${endpoint}/${id}`
  } else if (resourceType === 'condutor') {
    url = `${API_URL}${endpoint}/${id}`
  }

  try {
    await axios.put(url, updatedData)
    console.log(`${endpoint} atualizado com sucesso!`)
  } catch (error) {
    console.error(`Erro ao atualizar ${endpoint}:`, error)
    throw error
  }
}
