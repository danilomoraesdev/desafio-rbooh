import { Box, Grid, Typography, CircularProgress } from "@mui/material"
import { PontoCard } from "./PontoCard"
import { DeleteDialog } from "./DeleteDialog"
import { useEffect, useState, useCallback } from "react"
import type { PontoType } from "../types"
import { api } from "../utils/api"

const pontosMock: PontoType[] = [
  {
    id: "1",
    titulo: "Outdoor Av. Brasil, 301",
    descricao:
      "Painel publicitário localizado na Av. Brasil, com alta visibilidade e grande fluxo de pedestres e veículos",
    dataInicio: new Date("2025-01-01"),
    dataFim: new Date("2025-06-01"),
    ativo: true,
  },
  {
    id: "2",
    titulo: "Painel LED Shopping Flamboyant",
    descricao:
      "Painel digital LED instalado na praça de alimentação do Shopping Flamboyant",
    dataInicio: new Date("2025-03-01"),
    dataFim: new Date("2025-09-01"),
    ativo: false,
  },
]

interface PontoListProps {
  onOpenDialog: (ponto?: PontoType) => void
}

export function PontoList({ onOpenDialog }: PontoListProps) {
  const [pontos, setPontos] = useState<PontoType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    ponto?: PontoType
  }>({ open: false })

  const fetchPontos = useCallback(async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setPontos(pontosMock)
      return
      const response = await api.get("/pontos")
      setPontos(response.data)
    } catch (error) {
      setError("Erro")
      console.error("Erro ao buscar pontos:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPontos()
  }, [fetchPontos])

  const handleDeleteClick = (id: string) => {
    const ponto = pontos.find((p) => p.id === id)
    setDeleteDialog({
      open: true,
      ponto: ponto,
    })
  }

  const handleDeleteConfirm = async () => {
    const id = deleteDialog.ponto?.id
    if (!id) return

    try {
      return
      await api.delete(`/pontos/${id}`)
      await fetchPontos()
    } catch (error) {
      console.error("Erro ao excluir ponto:", error)
      setError("Erro ao excluir ponto")
    } finally {
      setDeleteDialog({ open: false })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false })
  }

  if (loading) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h5" color="text.secondary" mt={2}>
          Carregando pontos...
        </Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Erro ao carregar pontos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {error}
        </Typography>
      </Box>
    )
  }

  if (!pontos?.length)
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Nenhum ponto cadastrado
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Clique em "NOVO PONTO" para começar a cadastrar pontos de mídia.
        </Typography>
      </Box>
    )

  return (
    <>
      <Grid container spacing={3}>
        {pontos.map((ponto) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ponto.id}>
            <PontoCard
              ponto={ponto}
              onOpenDialog={onOpenDialog}
              onDelete={handleDeleteClick}
            />
          </Grid>
        ))}
      </Grid>

      <DeleteDialog
        open={deleteDialog.open}
        title={deleteDialog.ponto?.titulo || ""}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}
