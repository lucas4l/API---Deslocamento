import { Cliente } from '@/types/types'
import axios from 'axios'

export async function getClientes() {
  const API_URL = 'https://api-deslocamento.herokuapp.com/api/v1/Cliente'

  const response = await axios.get<Cliente[]>(API_URL)
  return response.data
}
