import { useCallback, useEffect, useState } from "react"

import {
  Box,
  Button,
  AppBar,
  Select,
  Toolbar,
  MenuItem,
  Container,
  Typography,
  InputLabel,
  FormControl,
  CssBaseline,
  ThemeProvider,
} from "@mui/material"
import { theme } from "./theme"
import { PontoList } from "./components/PontoList"
import { PontoDialog } from "./components/PontoDialog"
import type { DialogState, PontoType } from "./types"

import { Add } from "@mui/icons-material"
import { api } from "./utils/api"

export function App() {
  const [dialogState, setDialogState] = useState<DialogState>({ open: false })
  const [pontos, setPontos] = useState<PontoType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("todos")

  const fetchPontos = useCallback(async () => {
    setLoading(true)
    try {
      const params = statusFilter !== "todos" ? { status: statusFilter } : {}
      const response = await api.get("/pontos-midia", { params })
      setPontos(response.data)
    } catch (error) {
      setError("Erro")
      console.error("Erro ao buscar pontos:", error)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchPontos()
  }, [fetchPontos])

  const handleOpenDialog = (ponto?: PontoType) => {
    setDialogState({ open: true, ponto })
  }

  const handleCloseDialog = () => {
    setDialogState({ open: false })
  }

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

            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  id="status-filter"
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="todos">Todos</MenuItem>
                  <MenuItem value="ativo">Ativos</MenuItem>
                  <MenuItem value="inativo">Inativos</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{
                  width: { xs: "100%", sm: "auto" },
                }}
                onClick={() => handleOpenDialog()}
              >
                Novo Ponto
              </Button>
            </Box>
          </Box>

          <PontoList
            onOpenDialog={handleOpenDialog}
            pontos={pontos}
            fetchPontos={fetchPontos}
            loading={loading}
            error={error}
          />
        </Container>

        <PontoDialog
          open={dialogState.open}
          onCloseDialog={handleCloseDialog}
          ponto={dialogState.ponto}
          fetchPontos={fetchPontos}
        />
      </Box>
    </ThemeProvider>
  )
}
