import React, { useEffect, useState } from 'react'

import SearchBar from './SearchBar'
import ModalClientRegister from './ModalClientRegister'
import { ApiPut } from '../api/ApiUpdate'
import { ApiGet } from '@/api/ApiGet'
import { ApiGetId } from '@/api/ApiGetId'

import { Cliente } from '../types/types'

import { styled } from '@mui/material/styles'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { deleteCliente } from '@/api/ApiDelete'

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1rem',
})

interface RowData extends Cliente {
  isEditMode: boolean
}

const TableListClient = () => {
  const [rows, setRows] = useState<GridRowsProp<RowData>>([])
  const [searchId, setSearchId] = useState<string>('')

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 10, editable: false },
    {
      field: 'numeroDocumento',
      headerName: 'Número Documento',
      width: 180,
    },
    {
      field: 'tipoDocumento',
      headerName: 'Tipo Documento',
      width: 150,
    },
    { field: 'nome', headerName: 'Nome', width: 150, editable: true },
    {
      field: 'logradouro',
      headerName: 'Logradouro',
      width: 150,
      editable: true,
    },
    { field: 'numero', headerName: 'Número', width: 120, editable: true },
    { field: 'bairro', headerName: 'Bairro', width: 120, editable: true },
    { field: 'cidade', headerName: 'Cidade', width: 120, editable: true },
    { field: 'uf', headerName: 'UF', width: 80, editable: true },
    {
      field: 'actions',
      headerName: '',
      width: 120,
      renderCell: (params) => {
        const rowData = params.row as RowData
        const isEditMode = rowData.isEditMode

        const handleEditClick = () => {
          setRows((prevRows) =>
            prevRows.map((row) =>
              row.id === rowData.id ? { ...row, isEditMode: true } : row,
            ),
          )
          console.log(rowData)
        }

        const handleSaveClick = async () => {
          try {
            const updatedData = {
              id: rowData.id,
              numeroDocumento: rowData.numeroDocumento,
              tipoDocumento: rowData.tipoDocumento,
              nome: rowData.nome,
              logradouro: rowData.logradouro,
              numero: rowData.numero,
              bairro: rowData.bairro,
              cidade: rowData.cidade,
              uf: rowData.uf,
            }
            console.log(updatedData)
            await ApiPut(rowData.id, '/Cliente', updatedData)

            setRows((prevRows) =>
              prevRows.map((row) =>
                row.id === rowData.id
                  ? { ...row, ...updatedData, isEditMode: false }
                  : row,
              ),
            )
          } catch (error) {
            console.error('Erro ao atualizar dados do cliente:', error)
          }
        }

        const handleDeleteClick = async (id: number) => {
          try {
            await deleteCliente('Cliente', id)
            setRows((prevRows) => prevRows.filter((row) => row.id !== id))
          } catch (error) {
            console.error(`Erro ao excluir :`, error)
          }
        }

        return (
          <div>
            {isEditMode ? (
              <IconButton onClick={handleSaveClick}>
                <SaveIcon
                  sx={{
                    color: 'primary.main',
                  }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
            )}
            <IconButton onClick={() => handleDeleteClick(rowData.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Cliente[] = await ApiGet('/Cliente')

        const mappedRows: RowData[] = data.map((item) => ({
          id: item.id,
          numeroDocumento: item.numeroDocumento || '',
          tipoDocumento: item.tipoDocumento || '',
          nome: item.nome || '',
          logradouro: item.logradouro || '',
          numero: item.numero || '',
          bairro: item.bairro || '',
          cidade: item.cidade || '',
          uf: item.uf || '',
          isEditMode: false,
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
      const data: Cliente | null = await ApiGetId(searchId, '/Cliente')

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
              isEditMode: false,
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
