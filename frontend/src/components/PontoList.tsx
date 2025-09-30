import { Box, Grid, Typography, CircularProgress } from "@mui/material"
import { PontoCard } from "./PontoCard"
import { DeleteDialog } from "./DeleteDialog"
import { useState } from "react"
import type { PontoType } from "../types"
import { api } from "../utils/api"

interface PontoListProps {
  onOpenDialog: (ponto?: PontoType) => void
  pontos: PontoType[]
  fetchPontos: () => Promise<void>
  loading: boolean
  error: string | null
}

export function PontoList({
  onOpenDialog,
  pontos,
  fetchPontos,
  loading,
  error,
}: PontoListProps) {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    ponto?: PontoType
  }>({ open: false })

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
      await api.delete(`/pontos-midia/${id}`)
      await fetchPontos()
    } catch (error) {
      alert("Ocorreu um erro ao excluir o ponto")
      console.error("Erro ao excluir ponto:", error)
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
