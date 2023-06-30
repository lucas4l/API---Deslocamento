import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import { ApiPut } from '../api/ApiUpdate'
import { ApiGet } from '@/api/ApiGet'
import { ApiGetId } from '@/api/ApiGetId'
import { deleteCliente } from '@/api/ApiDelete'
import { Veiculo } from '../types/types'
import { styled } from '@mui/material/styles'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import ModalVeiculoRegister from './ModalVehicleRegister'

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1rem',
})

interface RowData extends Veiculo {
  isEditMode: boolean
}

const TableListVehicle = () => {
  const [rows, setRows] = useState<GridRowsProp<RowData>>([])
  const [searchId, setSearchId] = useState<string>('')

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 10, editable: false },
    { field: 'placa', headerName: 'Placa', width: 150 },
    {
      field: 'marcaModelo',
      headerName: 'Marca/Modelo',
      width: 180,
      editable: true,
    },
    {
      field: 'anoFabricacao',
      headerName: 'Ano de Fabricação',
      width: 180,
      editable: true,
    },
    { field: 'kmAtual', headerName: 'KM Atual', width: 150, editable: true },
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
            const updatedData: Veiculo = {
              id: rowData.id,
              placa: rowData.placa,
              marcaModelo: rowData.marcaModelo,
              anoFabricacao: rowData.anoFabricacao,
              kmAtual: rowData.kmAtual,
            }
            console.log(updatedData)
            await ApiPut(rowData.id, '/Veiculo', updatedData, 'veiculo')

            setRows((prevRows) =>
              prevRows.map((row) =>
                row.id === rowData.id
                  ? { ...row, ...updatedData, isEditMode: false }
                  : row,
              ),
            )
          } catch (error) {
            console.error('Erro ao atualizar dados do veículo:', error)
          }
        }

        const handleDeleteClick = async (id: number) => {
          try {
            await deleteCliente('Veiculo', id)
            setRows((prevRows) => prevRows.filter((row) => row.id !== id))
          } catch (error) {
            console.error('Erro ao excluir veículo:', error)
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
        const data: Veiculo[] = await ApiGet('/Veiculo')

        const mappedRows: RowData[] = data.map((item) => ({
          id: item.id,
          placa: item.placa || '',
          marcaModelo: item.marcaModelo || '',
          anoFabricacao: item.anoFabricacao || 0,
          kmAtual: item.kmAtual || 0,
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
      const data: Veiculo | null = await ApiGetId(searchId, '/Veiculo')

      const filteredRows = data
        ? [
            {
              id: data.id,
              placa: data.placa || '',
              marcaModelo: data.marcaModelo || '',
              anoFabricacao: data.anoFabricacao || 0,
              kmAtual: data.kmAtual || 0,
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
        <ModalVeiculoRegister />
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

export default TableListVehicle
