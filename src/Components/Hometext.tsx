'use client'

import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

export default function HomeText() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <Typography paragraph>
        Este é um projeto criado utilizando Material UI, Next, React e
        Typescript. As rotas GET, PUT, DELETE, POST são feitas de forma dinâmica
        de forma a facilitar a manutenção do projeto, futuras atualizações ao
        projeto serão feitas para melhoria e customização.
        <br />
        Projeto feito por Lucas Barbosa de Lima
      </Typography>
    </Box>
  )
}
