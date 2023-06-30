import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { ApiGet } from '../api/ApiGet'
import { ApiPost } from '../api/ApiPost'
import { Cliente, Condutor, Deslocamento, Veiculo } from '../types/types'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}

export default function ModalDeslocamentoRegister() {
  const [open, setOpen] = useState(false)
  const [inputValues, setInputValues] = useState<Partial<Deslocamento>>({})
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [condutor, setCondutor] = useState<Condutor[]>([])
  const [veiculo, setVeiculo] = useState<Veiculo[]>([])

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientesResponse = await ApiGet<Cliente[]>('/Cliente')
        const condutorResponse = await ApiGet<Condutor[]>('/Condutor')
        const veiculoResponse = await ApiGet<Veiculo[]>('/Veiculo')
        setClientes(clientesResponse.flat())
        setCondutor(condutorResponse.flat())
        setVeiculo(veiculoResponse.flat())
      } catch (error) {
        console.error('Erro ao buscar clientes:', error)
      }
    }

    fetchClientes()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSave = async () => {
    const idCliente = clientes.length > 0 ? clientes[0].id : 0
    const idCondutor = condutor.length > 0 ? condutor[0].id : 0
    const idVeiculo = veiculo.length > 0 ? veiculo[0].id : 0

    const payload: Deslocamento = {
      id: 0,
      kmInicial: inputValues.kmInicial || 0,
      kmFinal: inputValues.kmFinal || 0,
      inicioDeslocamento: inputValues.inicioDeslocamento || '',
      fimDeslocamento: inputValues.fimDeslocamento || '',
      checkList: inputValues.checkList || '',
      motivo: inputValues.motivo || '',
      observacao: inputValues.observacao || '',
      idCondutor,
      idVeiculo,
      idCliente,
    }

    await ApiPost('Deslocamento/IniciarDeslocamento', payload)
    handleClose()
  }

  return (
    <div>
      <Button onClick={handleOpen}>Adicionar Deslocamento</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Cadastro de Deslocamento
            </Typography>
            <TextField
              label="Km Inicial"
              value={inputValues.kmInicial || ''}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  kmInicial: Number(e.target.value),
                })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Km Final"
              value={inputValues.kmFinal || ''}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  kmFinal: Number(e.target.value),
                })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Início do Deslocamento"
              value={inputValues.inicioDeslocamento || ''}
              type="date"
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  inicioDeslocamento: e.target.value,
                })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Fim do Deslocamento"
              value={inputValues.fimDeslocamento || ''}
              type="date"
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  fimDeslocamento: e.target.value,
                })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Checklist"
              value={inputValues.checkList || ''}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  checkList: e.target.value,
                })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Motivo"
              value={inputValues.motivo || ''}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  motivo: e.target.value,
                })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Observação"
              value={inputValues.observacao || ''}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  observacao: e.target.value,
                })
              }
              sx={{ mt: 2 }}
            />
            <Button onClick={handleSave} sx={{ mt: 2 }}>
              Salvar
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
