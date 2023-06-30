import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import { ApiPost } from '../api/ApiPost'
import { CondutorPost } from '../types/types'

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
  gap: '16px',
}

export default function ModalConductorRegister() {
  const [open, setOpen] = useState(false)
  const [inputValues, setInputValues] = useState<Partial<CondutorPost>>({})

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSave = async () => {
    await ApiPost('Condutor', inputValues)
    handleClose()
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setInputValues({
      ...inputValues,
      vencimentoHabilitacao: value,
    })
  }

  return (
    <div>
      <Button onClick={handleOpen}>Adicionar Condutor</Button>
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
              Cadastro de Condutor
            </Typography>
            <TextField
              label="Nome"
              value={inputValues.nome || ''}
              onChange={(e) =>
                setInputValues({ ...inputValues, nome: e.target.value })
              }
            />
            <TextField
              label="Número Habilitação"
              value={inputValues.numeroHabilitacao || ''}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  numeroHabilitacao: e.target.value,
                })
              }
            />
            <TextField
              label="Categoria Habilitação"
              value={inputValues.categoriaHabilitacao || ''}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  categoriaHabilitacao: e.target.value,
                })
              }
            />
            <TextField
              type="date"
              value={inputValues.vencimentoHabilitacao || ''}
              onChange={handleDateChange}
            />
            <Button onClick={handleSave}>Salvar</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
