import { Cliente } from '@/types/types'
import axios from 'axios'

const API_URL = 'https://api-deslocamento.herokuapp.com/api/v1/Cliente'

export const postClient = async (
  inputValues: Partial<Cliente>,
): Promise<void> => {
  try {
    const response = await axios.post<Cliente>(API_URL, inputValues, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('Erro', response.data)

    if (response.status === 200) {
      console.log('Cliente cadastrado com sucesso!')
    } else {
      console.error('Erro ao cadastrar o cliente:', response.status)
    }
  } catch (error) {
    console.error('Erro ao cadastrar o cliente:', error)
  }
}
