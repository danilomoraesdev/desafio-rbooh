import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material"

interface DeleteDialogProps {
  open: boolean
  title: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteDialog({
  open,
  title,
  onConfirm,
  onCancel,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Excluir ponto de mídia</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir o ponto "{title}"? Esta ação não pode
          ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Voltar</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}
