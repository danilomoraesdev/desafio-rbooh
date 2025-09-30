# DESAFIO RBOOH

Aplicação Full Stack que permite a gestão de anúncios em uma plataforma de mídia OOH, simulando um pequeno sistema de exibição de dados de pontos de mídia, incluindo cadastro, listagem, edição e remoção.

Stack: **NestJS + Prisma**, **React + Vite + TypeScript**, **PostgreSQL** e **Docker**.

---

## Como Executar

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose

### Configuração Inicial

1. Clone o repositório e copie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

2. Ajuste as variáveis no arquivo `.env` se necessário (valores padrão já funcionam).

---

## Modo Desenvolvimento (Recomendado)

Neste modo, apenas o **PostgreSQL** roda no Docker. Backend e frontend rodam localmente para melhor experiência de desenvolvimento (hot-reload rápido).

### 1. Iniciar o banco de dados

```bash
docker-compose up -d
```

### 2. Backend (NestJS)

```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

O backend estará rodando em `http://localhost:5000`

### 3. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

### Parar o banco de dados

```bash
docker-compose down
```

---

## Modo Full Docker (Teste/Produção)

Neste modo, **toda a aplicação** (banco, backend e frontend) roda no Docker, simulando ambiente de produção.

### Subir toda a aplicação

```bash
docker-compose --profile full up --build
```

Acessos:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Documentação Swagger: `http://localhost:5000/doc`

### Parar toda a aplicação

```bash
docker-compose --profile full down
```

### Remover volumes (limpar dados)

```bash
docker-compose down -v
```

---

## Observações

- **Modo Dev**: Melhor para desenvolvimento, com hot-reload e debug facilitado
- **Modo Full**: Melhor para testar a aplicação completa antes de fazer deploy
- Os dados do PostgreSQL ficam persistidos no volume `rbooh-postgres-data`
- Para limpar completamente: `docker-compose down -v` (remove volumes)
