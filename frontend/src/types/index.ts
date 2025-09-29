export type PontoType = {
  id: string
  titulo: string
  descricao: string
  dataInicio: Date
  dataFim: Date
  ativo: boolean
}

export type DialogState = {
  open: boolean
  ponto?: PontoType
}
