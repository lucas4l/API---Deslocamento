import React, { useEffect, useState } from 'react'

import SearchBar from './SearchBar'
import { ApiPut } from '../api/ApiUpdate'
import { ApiGet } from '@/api/ApiGet'
import { ApiGetId } from '@/api/ApiGetId'

import { Deslocamento } from '../types/types'

import { styled } from '@mui/material/styles'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { deleteCliente } from '@/api/ApiDelete'
import ModalDeslocamentoRegister from './ModalDisplacementRegister'
import { convertToDDMMYYYY, convertToYYYYMMDD } from '@/iso/convertDate'

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1rem',
})

interface RowData extends Deslocamento {
  isEditMode: boolean
}

const TableListDisplacement = () => {
  const [rows, setRows] = useState<GridRowsProp<RowData>>([])
  const [searchId, setSearchId] = useState<string>('')

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 10, editable: false },
    {
      field: 'kmInicial',
      headerName: 'Km Inicial',
      width: 120,
    },
    { field: 'kmFinal', headerName: 'Km Final', width: 120, editable: true },
    {
      field: 'inicioDeslocamento',
      headerName: 'Início Deslocamento',
      width: 180,
    },
    {
      field: 'fimDeslocamento',
      headerName: 'Fim Deslocamento',
      width: 180,
      editable: true,
    },
    { field: 'checkList', headerName: 'Check List', width: 150 },
    { field: 'motivo', headerName: 'Motivo', width: 150 },
    {
      field: 'observacao',
      headerName: 'Observação',
      width: 150,
      editable: true,
    },
    { field: 'idCondutor', headerName: 'Id Condutor', width: 120 },
    { field: 'idVeiculo', headerName: 'Id Veículo', width: 120 },
    { field: 'idCliente', headerName: 'Id Cliente', width: 120 },
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
              kmInicial: rowData.kmInicial,
              kmFinal: rowData.kmFinal,
              inicioDeslocamento: rowData.inicioDeslocamento,
              fimDeslocamento: convertToYYYYMMDD(rowData.fimDeslocamento),
              checkList: rowData.checkList,
              motivo: rowData.motivo,
              observacao: rowData.observacao,
              idCondutor: rowData.idCondutor,
              idVeiculo: rowData.idVeiculo,
              idCliente: rowData.idCliente,
            }
            console.log(updatedData)
            await ApiPut(
              rowData.id,
              '/Deslocamento',
              updatedData,
              'deslocamento',
            )

            setRows((prevRows) =>
              prevRows.map((row) =>
                row.id === rowData.id
                  ? { ...row, ...updatedData, isEditMode: false }
                  : row,
              ),
            )
          } catch (error) {
            console.error('Erro ao atualizar dados do deslocamento:', error)
          }
        }

        const handleDeleteClick = async (id: number) => {
          try {
            await deleteCliente('Deslocamento', id)
            setRows((prevRows) => prevRows.filter((row) => row.id !== id))
          } catch (error) {
            console.error('Erro ao excluir deslocamento:', error)
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
        const data: Deslocamento[] = await ApiGet('/Deslocamento')

        const mappedRows: RowData[] = data.map((item) => ({
          id: item.id,
          kmInicial: item.kmInicial,
          kmFinal: item.kmFinal,
          inicioDeslocamento: convertToDDMMYYYY(item.inicioDeslocamento) || '',
          fimDeslocamento: convertToDDMMYYYY(item.fimDeslocamento) || '',
          checkList: item.checkList || '',
          motivo: item.motivo || '',
          observacao: item.observacao || '',
          idCondutor: item.idCondutor,
          idVeiculo: item.idVeiculo,
          idCliente: item.idCliente,
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
      const data: Deslocamento | null = await ApiGetId(
        searchId,
        '/Deslocamento',
      )

      const filteredRows = data
        ? [
            {
              id: data.id,
              kmInicial: data.kmInicial,
              kmFinal: data.kmFinal,
              inicioDeslocamento: data.inicioDeslocamento || '',
              fimDeslocamento: data.fimDeslocamento || '',
              checkList: data.checkList || '',
              motivo: data.motivo || '',
              observacao: data.observacao || '',
              idCondutor: data.idCondutor,
              idVeiculo: data.idVeiculo,
              idCliente: data.idCliente,
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
        <ModalDeslocamentoRegister />
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

export default TableListDisplacement
