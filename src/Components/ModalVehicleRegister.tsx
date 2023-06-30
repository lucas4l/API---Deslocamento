import React, { useState, ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { ApiPost } from '../api/ApiPost'
import { Veiculo } from '@/types/types'

const style = {
  position: 'absolute',
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

export default function ModalVeiculoRegister() {
  const [open, setOpen] = useState(false)
  const [inputValues, setInputValues] = useState<Partial<Veiculo>>({})

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSave = async () => {
    await ApiPost('Veiculo', inputValues)
    handleClose()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
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
              label="Placa do Veículo"
              name="placa"
              value={inputValues.placa || ''}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Marca/Modelo do Veículo"
              name="marcaModelo"
              value={inputValues.marcaModelo || ''}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Ano de Fabricação do Veículo"
              name="anoFabricacao"
              value={inputValues.anoFabricacao || ''}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Km Atual do Veículo"
              name="kmAtual"
              value={inputValues.kmAtual || ''}
              onChange={handleChange}
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
