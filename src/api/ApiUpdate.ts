import axios from 'axios'
import { Cliente } from '../types/types'

export async function updateCliente(id: number, updatedData: Cliente) {
  const API_URL = 'https://api-deslocamento.herokuapp.com/api/v1/Cliente'
  const url = `${API_URL}/${id}`

  try {
    await axios.put(url, updatedData)
    console.log('Cliente atualizado com sucesso!')
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error)
    throw error
  }
}
