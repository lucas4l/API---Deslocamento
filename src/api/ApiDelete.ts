import axios from 'axios'

export const deleteCliente = async (
  entity: string,
  id: number,
): Promise<void> => {
  const API_URL = 'https://api-deslocamento.herokuapp.com/api/v1'
  const url = `${API_URL}/${entity}/${id}`

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
