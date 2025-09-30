import {
  Box,
  Dialog,
  useTheme,
  DialogTitle,
  DialogContent,
  useMediaQuery,
} from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { IconButton } from "./IconButton"
import PontoForm from "./PontoForm"
import type { PontoType } from "../types"

interface PontoDialogProps {
  open: boolean
  onCloseDialog: () => void
  ponto?: PontoType
  fetchPontos: () => Promise<void>
}

export function PontoDialog({
  open,
  onCloseDialog,
  ponto,
  fetchPontos,
}: PontoDialogProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Dialog open={open} onClose={onCloseDialog} fullScreen={isMobile}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {isMobile && (
          <IconButton
            onClick={onCloseDialog}
            sx={{ mr: 1 }}
            aria-label="Voltar"
            icon={<ArrowBack />}
            title="Voltar"
          />
        )}
        <Box component="span">
          {ponto ? "Editar Ponto de Mídia" : "Novo Ponto de Mídia"}
        </Box>
      </DialogTitle>

      <DialogContent>
        <PontoForm
          ponto={ponto}
          onCloseDialog={onCloseDialog}
          fetchPontos={fetchPontos}
        />
      </DialogContent>
    </Dialog>
  )
}
