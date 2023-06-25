import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { getClientes } from '../api/ApiGet'
import { Cliente } from '../types/types'
import ModalClientRegister from './ModalClientRegister'

export default function TableListClient() {
  const [rows, setRows] = useState<GridRowsProp>([])

  const columns: GridColDef[] = [
    { field: 'numeroDocumento', headerName: 'Número Documento', width: 180 },
    { field: 'tipoDocumento', headerName: 'Tipo Documento', width: 150 },
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'logradouro', headerName: 'Logradouro', width: 150 },
    { field: 'numero', headerName: 'Número', width: 120 },
    { field: 'bairro', headerName: 'Bairro', width: 120 },
    { field: 'cidade', headerName: 'Cidade', width: 120 },
    { field: 'uf', headerName: 'UF', width: 80 },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Cliente[] = await getClientes()

        // Mapeie os dados recebidos para o formato esperado pela tabela
        const mappedRows = data.map((item) => ({
          id: item.id,
          numeroDocumento: item.numeroDocumento || '',
          tipoDocumento: item.tipoDocumento || '',
          nome: item.nome || '',
          logradouro: item.logradouro || '',
          numero: item.numero || '',
          bairro: item.bairro || '',
          cidade: item.cidade || '',
          uf: item.uf || '',
        }))

        setRows(mappedRows)
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <ModalClientRegister />
      </div>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  )
}
