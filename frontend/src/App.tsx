import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Container,
  Typography,
  CssBaseline,
  ThemeProvider,
} from "@mui/material"
import { theme } from "./theme"

import { Add } from "@mui/icons-material"

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar position="static" elevation={2}>
          <Toolbar>
            <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
              Plataforma de Mídia OOH
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 3, flex: 1 }}>
          <Box
            sx={{
              mb: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h5" component="h2" mb={1}>
                Gerenciar Pontos de Mídia
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Gerencie seus pontos de mídia out-of-home
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Novo Ponto
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
