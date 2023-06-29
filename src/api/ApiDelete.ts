import axios from 'axios'

export const deleteCliente = async (id: number) => {
  const API_URL = 'https://api-deslocamento.herokuapp.com/api/v1/Cliente'
  const url = `${API_URL}/${id}`
  try {
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ id }),
    })
    return response.data
  } catch (error) {
    throw new Error('Erro ao excluir cliente')
  }
}
