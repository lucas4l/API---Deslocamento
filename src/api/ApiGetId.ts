import axios from 'axios'
import { Cliente } from '../types/types'

export const getClientesId = async (id: string): Promise<Cliente | null> => {
  try {
    const response = await axios.get(
      `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`,
    )

    const data: Cliente = response.data

    return data
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error)
    return null
  }
}
