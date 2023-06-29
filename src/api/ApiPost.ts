// api/ApiPost.ts
import axios from 'axios'
import { Cliente } from '../types/types'

const API_URL = 'https://api-deslocamento.herokuapp.com/api/v1'

export const ApiPost = async (
  endpoint: string,
  data: Partial<Cliente>,
): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/${endpoint}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('Erro', response.data)

    if (response.status === 200) {
      console.log('Cadastrado realizado com sucesso!')
    } else {
      console.error('Erro ao cadastrar :', response.status)
    }
  } catch (error) {
    console.error('Erro ao cadastrar:', error)
  }
}
