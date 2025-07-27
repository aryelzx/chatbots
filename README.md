# Como rodar o projeto com Docker Compose

Este projeto usa Docker Compose para subir os serviços (banco, backend, frontend).

---

## Requisitos

- Docker instalado
- Windows ou WSL/Linux/macOS

---

## Scripts para facilitar o uso do Docker

### No Windows (Terminal ou PowerShell)

Existe um arquivo `start.bat` para facilitar o uso dos comandos Docker:

### Para subir o projeto (build e start):

```cmd
start.bat
```

### Para parar o projeto (sem apagar volumes/dados):

```
start.bat down
```

### Para parar o projeto e apagar volumes (resetar dados):

```cmd
start.bat reset
```
