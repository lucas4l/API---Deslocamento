import React, { useEffect, useState } from 'react'

import SearchBar from './SearchBar'
import ModalConductorRegister from './ModalConductorRegister'
import { ApiPut } from '../api/ApiUpdate'
import { ApiGet } from '@/api/ApiGet'
import { ApiGetId } from '@/api/ApiGetId'

import { convertToDDMMYYYY, convertToYYYYMMDD } from '../iso/convertDate'

import { Condutor } from '../types/types'

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

interface RowData extends Condutor {
  isEditMode: boolean
}

const TableListConductor = () => {
  const [rows, setRows] = useState<GridRowsProp<RowData>>([])
  const [searchId, setSearchId] = useState<string>('')

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 10, editable: false },
    {
      field: 'numeroHabilitacao',
      headerName: 'Número Habilitação',
      width: 160,
    },
    {
      field: 'catergoriaHabilitacao',
      headerName: 'Categoria Habilitação',
      width: 170,
      editable: true,
    },
    { field: 'nome', headerName: 'Nome', width: 150 },
    {
      field: 'vencimentoHabilitacao',
      headerName: 'Vencimento Habilitação',
      width: 190,
      editable: true,
    },
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
            const updatedData: Condutor = {
              id: rowData.id,
              numeroHabilitacao: rowData.numeroHabilitacao,
              catergoriaHabilitacao: rowData.catergoriaHabilitacao,
              nome: rowData.nome,
              vencimentoHabilitacao: convertToYYYYMMDD(
                // devido ao erro na api no momento não será possivel alterar os campos
                rowData.vencimentoHabilitacao,
              ),
            }

            console.log(updatedData)
            await ApiPut(rowData.id, '/Condutor', updatedData, 'condutor')

            setRows((prevRows) =>
              prevRows.map((row) =>
                row.id === rowData.id
                  ? { ...row, ...updatedData, isEditMode: false }
                  : row,
              ),
            )
          } catch (error) {
            console.error('Erro ao atualizar dados do condutor:', error)
          }
        }

        const handleDeleteClick = async (id: number) => {
          try {
            await deleteCliente('COndutor', id)
            setRows((prevRows) => prevRows.filter((row) => row.id !== id))
          } catch (error) {
            console.error('Erro ao excluir cliente:', error)
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

  const formatarData = (data: string): string => {
    const dataObj = new Date(data)
    const dia = dataObj.getDate()
    const mes = dataObj.getMonth() + 1
    const ano = dataObj.getFullYear()

    return `${dia.toString().padStart(2, '0')}/${mes
      .toString()
      .padStart(2, '0')}/${ano.toString()}`
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Condutor[] = await ApiGet('/Condutor')

        const mappedRows: RowData[] = data.map((item) => ({
          id: item.id,
          numeroHabilitacao: item.numeroHabilitacao || '',
          catergoriaHabilitacao: item.catergoriaHabilitacao || '',
          nome: item.nome || '',
          vencimentoHabilitacao: convertToDDMMYYYY(item.vencimentoHabilitacao),
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
      const data: Condutor | null = await ApiGetId(searchId, '/Condutor')

      const filteredRows = data
        ? [
            {
              id: data.id,
              numeroHabilitacao: data.numeroHabilitacao || '',
              catergoriaHabilitacao: data.catergoriaHabilitacao || '',
              nome: data.nome || '',
              vencimentoHabilitacao:
                formatarData(data.vencimentoHabilitacao) || '',
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
        <ModalConductorRegister />
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

export default TableListConductor
