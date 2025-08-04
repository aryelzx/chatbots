# Chatbots App – Monorepo (Frontend + Backend + Banco)

Este projeto é um monorepo que agrupa **frontend**, **backend** e **banco de dados** com inicialização via **Docker Compose**.

---

## 🧠 Visão Geral

### ✨ Tecnologias Utilizadas

#### Frontend

- [React](https://react.dev/) com [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/) – Validação de esquemas
- [React Hook Form](https://react-hook-form.com/) – Gerenciamento de formulários
- [Axios](https://axios-http.com/) – Requisições HTTP

#### Backend

- [.NET 9](https://dotnet.microsoft.com/) com C#
- [Entity Framework Core](https://learn.microsoft.com/ef/core/) – ORM
- [Swagger](https://swagger.io/) – Documentação automática das rotas
- [JWT] – Autenticação do usuário
- Estrutura modular com exibição dinâmica de módulos com base na **role do usuário**

#### Banco de Dados

- [PostgreSQL](https://www.postgresql.org/)
- [Diagrama de entidade e relacionamento (DER)](https://whimsical.com/chatbot-der-NawkapeArxuCKFTb3ptdKw)
  ![print der](image.png)

---

## Variáveis de ambiente (.ENV)

1. **.env** (na raiz do projeto)
2. **/backend/api/.env** (a nível de API)

## 🚀 Passo a passo da aplicação

1. **Registrar novo usuário**
2. **Fazer login**
3. **Criar um chat**
4. **Enviar mensagens**

---

## 🐳 Como rodar o projeto com Docker Compose

Este projeto usa Docker Compose para subir os serviços:

- Banco de dados PostgreSQL
- Backend ASP.NET
- Frontend React (porta 5173)

---

## ⚙️ Requisitos

- Docker + Docker Compose instalados
- Sistemas suportados: Windows / WSL / Linux / macOS

---

## ▶️ Inicialização rápida

### Windows (Terminal ou PowerShell)

Use o script `start.bat`:

```bash
start.bat          # Build + start
start.bat down     # Para containers (sem apagar dados)
start.bat reset    # Para tudo e apaga volumes/dados
```

---

### Linux / WSL / macOS

Use o script `start.sh`:

```bash
chmod +x start.sh     # (Necessário uma vez)
./start.sh            # Build + start
./start.sh down       # Para containers
./start.sh reset      # Para tudo e apaga volumes/dados
```

---

## 📦 Instalação de dependências adicionais

Caso o TypeScript acuse erro de tipagem em `AxiosInstance`:

```bash
npm install --save-dev @types/axios
```

---

## 🛠️ Scripts SQL e Seeds

Os scripts de criação de tabelas e seeds estão em `/sql/init.sql`.

> ⚠️ Atenção: esses scripts **só são executados na primeira inicialização do volume**. Se o volume `chatbots_pgdata` já existir, os dados não serão sobrescritos. Use `start.sh reset` para limpar e reexecutar os seeds.

---

## 🧩 Backend – Pacotes utilizados

```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package DotNetEnv
```

---

## 📘 Documentação da API (Swagger)

Após subir a aplicação, acesse:

```
http://localhost:5000/swagger/index.html
```

---

## 💡 Observações

- A aplicação segue o padrão **modular** no backend.
- O frontend consome apenas a porta `5173`, que está **explicitamente habilitada no CORS da API**.
- Caso dê erro 500 no envio de mensagem é por quê o limite diário do modelo foi atingido, recomendo criar outro chat com outro modelo, ou alterar o modelo do chat.
- Os módulos disponíveis são exibidos conforme a **role do usuário autenticado**.
