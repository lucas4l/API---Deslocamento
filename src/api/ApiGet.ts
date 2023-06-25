import { Cliente } from '@/types/types'
import axios from 'axios'

export async function getClientes() {
  const response = await axios.get<Cliente[]>(
    'https://api-deslocamento.herokuapp.com/api/v1/Cliente',
  )
  return response.data
}
