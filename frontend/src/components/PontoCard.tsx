import {
  Box,
  Card,
  Chip,
  Typography,
  CardActions,
  CardContent,
} from "@mui/material"

import { IconButton } from "./IconButton"
import type { PontoType } from "../types"
import { Edit, Delete, CalendarToday } from "@mui/icons-material"
import { formatDate } from "../utils"

interface PontoCardProps {
  ponto: PontoType
  onOpenDialog: (ponto?: PontoType) => void
  onDelete: (id: string) => void
}

export function PontoCard({ ponto, onOpenDialog, onDelete }: PontoCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 600, lineHeight: 1.2 }}
          >
            {ponto.titulo}
          </Typography>
          <Chip
            label={ponto.ativo ? "Ativo" : "Inativo"}
            color={ponto.ativo ? "success" : "default"}
            size="small"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" mb={2}>
          {ponto.descricao}
        </Typography>

        <Typography variant="caption" color="text.secondary" mb={2}>
          Disponibilidade
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CalendarToday
              sx={{ fontSize: 16, color: "text.secondary", mr: 1 }}
            />
            <Typography variant="caption" color="text.secondary">
              {formatDate(ponto.dataInicio)}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            a
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(ponto.dataFim)}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
        <IconButton
          title="Editar"
          color="primary"
          icon={<Edit fontSize="small" />}
          onClick={() => onOpenDialog(ponto)}
        />
        <IconButton
          title="Excluir"
          color="error"
          icon={<Delete fontSize="small" />}
          onClick={() => onDelete(ponto.id)}
        />
      </CardActions>
    </Card>
  )
}
