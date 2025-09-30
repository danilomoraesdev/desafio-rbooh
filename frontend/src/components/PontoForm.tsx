import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Box,
  Grid,
  Switch,
  Button,
  TextField,
  FormControlLabel,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import type { PontoType } from "../types"
import { z } from "zod"
import { api } from "../utils/api"

const formSchema = z
  .object({
    titulo: z
      .string()
      .min(1, "Nome do ponto é obrigatório")
      .max(100, "Nome do ponto deve ter no máximo 100 caracteres"),
    descricao: z
      .string()
      .max(500, "Descrição do local deve ter no máximo 500 caracteres"),
    dataInicio: z.date(),
    dataFim: z.date(),
    ativo: z.boolean(),
  })
  .refine((data) => data.dataFim >= data.dataInicio, {
    message: "Data de fim deve ser posterior à data de início",
    path: ["dataFim"],
  })

type FormType = z.infer<typeof formSchema>

interface PontoFormProps {
  ponto?: PontoType
  onCloseDialog: () => void
}

export default function PontoForm({ ponto, onCloseDialog }: PontoFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: ponto?.titulo || "",
      descricao: ponto?.descricao || "",
      dataInicio: ponto?.dataInicio || new Date(),
      dataFim: ponto?.dataFim || new Date(),
      ativo: ponto?.ativo ?? true,
    },
  })

  const onSubmit = async (data: FormType) => {
    try {
      if (ponto) {
        await api.put(`/pontos-midia/${ponto?.id}`, data)
      } else {
        await api.post("/pontos-midia", data)
      }
    } catch (error) {
      alert("Ocorreu um erro ao salvar o formulário")
      console.error(error)
    } finally {
      onCloseDialog()
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="titulo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome do Ponto"
                  placeholder="Ex: Outdoor Av. Paulista 1200"
                  fullWidth
                  error={!!errors.titulo}
                  helperText={errors.titulo?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="descricao"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descrição"
                  placeholder="Ex: Painel publicitário localizado na Av. Paulista, com alta visibilidade..."
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.descricao}
                  helperText={errors.descricao?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="dataInicio"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Data de Início"
                  value={dayjs(field.value)}
                  onChange={(date) =>
                    field.onChange(date?.toDate() || new Date())
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.dataInicio,
                      helperText: errors.dataInicio?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="dataFim"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Data de Fim"
                  value={dayjs(field.value)}
                  onChange={(date) =>
                    field.onChange(date?.toDate() || new Date())
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.dataFim,
                      helperText: errors.dataFim?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="ativo"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch checked={field.value} onChange={field.onChange} />
                  }
                  label="Ativo"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={onCloseDialog}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" loading={isSubmitting}>
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}
