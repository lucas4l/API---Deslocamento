import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { getClientes } from '../api/ApiGet'
import { Cliente } from '../types/types'
import ModalClientRegister from './ModalClientRegister'
import SearchBar from './SearchBar'
import { getClientesId } from '../api/ApiGetId'
import { styled } from '@mui/material/styles'

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1rem',
})

const TableListClient = () => {
  const [rows, setRows] = useState<GridRowsProp>([])
  const [searchId, setSearchId] = useState('')

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 10 },
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

  const handleSearch = async () => {
    if (searchId === '') {
      return
    }

    try {
      const data: Cliente | null = await getClientesId(searchId)

      const filteredRows = data
        ? [
            {
              id: data.id,
              numeroDocumento: data.numeroDocumento || '',
              tipoDocumento: data.tipoDocumento || '',
              nome: data.nome || '',
              logradouro: data.logradouro || '',
              numero: data.numero || '',
              bairro: data.bairro || '',
              cidade: data.cidade || '',
              uf: data.uf || '',
            },
          ]
        : []

      setRows(filteredRows)
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error)
    }
  }

  return (
    <div>
      <Container>
        <ModalClientRegister />
        <SearchBar
          searchId={searchId}
          setSearchId={setSearchId}
          handleSearch={handleSearch}
        />
      </Container>
      <div style={{ height: 550, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  )
}

export default TableListClient
