# Plataforma de Mídia OOH - Backend

API REST para gerenciamento de pontos de mídia out-of-home (OOH).

## Endpoints

- `GET /` - Verifica o status da API
- `GET /pontos-midia` - Lista todos os pontos
- `POST /pontos-midia` - Cria um novo ponto
- `PUT /pontos-midia/:id` - Atualiza um ponto existente
- `DELETE /pontos-midia/:id` - Remove um ponto

## Stack

- **NestJS 11** + **TypeScript**
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados
- **Swagger** - Documentação da API
