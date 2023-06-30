import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { ApiPost } from '../api/ApiPost'
import { Cliente } from '../types/types'

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
  gap: '8px',
}

export default function ModalClientRegister() {
  const [open, setOpen] = useState(false)
  const [inputValues, setInputValues] = useState<Partial<Cliente>>({})

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSave = async () => {
    await ApiPost('Cliente', inputValues)
    handleClose()
  }

  return (
    <div>
      <Button onClick={handleOpen}>Adicionar Cliente</Button>
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
              Cadastro de Cliente
            </Typography>
            <TextField
              label="Número Documento"
              value={inputValues.numeroDocumento || ''}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  numeroDocumento: e.target.value,
                })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Tipo do Documento"
              value={inputValues.tipoDocumento || ''}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  tipoDocumento: e.target.value,
                })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Nome"
              value={inputValues.nome || ''}
              onChange={(e) =>
                setInputValues({ ...inputValues, nome: e.target.value })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Logradouro"
              value={inputValues.logradouro || ''}
              onChange={(e) =>
                setInputValues({ ...inputValues, logradouro: e.target.value })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Número"
              value={inputValues.numero || ''}
              onChange={(e) =>
                setInputValues({ ...inputValues, numero: e.target.value })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Bairro"
              value={inputValues.bairro || ''}
              onChange={(e) =>
                setInputValues({ ...inputValues, bairro: e.target.value })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Cidade"
              value={inputValues.cidade || ''}
              onChange={(e) =>
                setInputValues({ ...inputValues, cidade: e.target.value })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="UF"
              value={inputValues.uf || ''}
              onChange={(e) =>
                setInputValues({ ...inputValues, uf: e.target.value })
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
