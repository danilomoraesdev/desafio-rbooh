import { Box, Grid, Typography } from "@mui/material"
import { PontoCard } from "./PontoCard"
import type { PontoType } from "../types"

const pontos: PontoType[] = [
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

export function PontoList() {
  if (!pontos?.length)
    return (
      <Box
        sx={{
          py: 8,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Nenhum ponto cadastrado
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Clique em "NOVO PONTO" para começar a cadastrar pontos de mídia.
        </Typography>
      </Box>
    )

  return (
    <Grid container spacing={3}>
      {pontos.map((ponto) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ponto.id}>
          <PontoCard ponto={ponto} />
        </Grid>
      ))}
    </Grid>
  )
}
